import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, normalize, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { GENERATED_MARK, mainFile, readFolder } from "./teams-folder.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const allowedColors = new Set([
  "green",
  "blue",
  "red",
  "orange",
  "purple",
  "cyan",
  "pink",
  "yellow",
  "teal",
  "coral",
]);

function fail(message) {
  errors.push(message);
}

function json(path) {
  try {
    return JSON.parse(readFileSync(join(root, path), "utf8"));
  } catch (error) {
    fail(`${path}: ${error.message}`);
    return null;
  }
}

function markdownPackage(path) {
  try {
    const markdown = readFileSync(join(root, path), "utf8");
    const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!frontmatter) throw new Error("missing YAML frontmatter");
    const metadata = parseYaml(frontmatter[1]);
    if (!metadata || metadata.botmrr !== 1) throw new Error("expected BotMRR Markdown v1");
    for (const heading of ["Activation", "Mission", "Outcomes", "Connections", "Team", "Chief of Staff", "Completion rule"]) {
      if (!markdown.includes(`## ${heading}`)) throw new Error(`missing readable ${heading} section`);
    }
    const { botmrr: _format, ...pkg } = metadata;
    return pkg;
  } catch (error) {
    fail(`${path}: ${error.message}`);
    return null;
  }
}

function safeFile(path, suffix) {
  if (typeof path !== "string" || !path.endsWith(suffix)) return false;
  const absolute = resolve(root, normalize(path));
  return absolute.startsWith(`${root}${sep}`) && existsSync(absolute);
}

function text(value, max) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= max;
}

function validateManifest(path, expectedMembers) {
  const manifest = json(path);
  if (!manifest) return;
  if (manifest.format !== "openmaus.team" || manifest.version !== 1) {
    fail(`${path}: expected openmaus.team version 1`);
    return;
  }
  const team = manifest.team;
  if (!team || !text(team.name, 100)) fail(`${path}: team.name is required`);
  if (!Array.isArray(team?.members) || team.members.length === 0 || team.members.length > 50) {
    fail(`${path}: team.members must contain 1-50 members`);
    return;
  }
  if (team.members.length !== expectedMembers) {
    fail(`${path}: catalog says ${expectedMembers} members but manifest has ${team.members.length}`);
  }
  const keys = new Set();
  for (const [index, member] of team.members.entries()) {
    const at = `${path}: member ${index + 1}`;
    if (!text(member?.key, 64) || !/^[a-z0-9][a-z0-9_-]*$/.test(member.key)) fail(`${at} has an invalid key`);
    else if (keys.has(member.key)) fail(`${at} duplicates key ${member.key}`);
    else keys.add(member.key);
    if (!text(member?.name, 100)) fail(`${at} needs a name`);
    if (typeof member?.title !== "string" || member.title.length > 200) fail(`${at} has an invalid title`);
    if (typeof member?.description !== "string" || member.description.length > 4000) fail(`${at} has an invalid description`);
    if (!allowedColors.has(member?.appearance?.color)) fail(`${at} has an unsupported color`);
  }
  const room = team.room;
  if (!room || !text(room.name, 100) || typeof room.bulletin !== "string") fail(`${path}: room is invalid`);
  const responder = room?.defaultResponder;
  if (!responder || !["member", "everyone", "mentions"].includes(responder.kind)) {
    fail(`${path}: room.defaultResponder is invalid`);
  } else if (responder.kind === "member" && !keys.has(responder.member)) {
    fail(`${path}: room.defaultResponder references an unknown member`);
  }
}

function list(value, max) {
  return Array.isArray(value) && value.length <= max;
}

function validatePackage(path, slug, expectedMembers) {
  const pkg = markdownPackage(path);
  if (!pkg) return;
  if (!pkg || pkg.id !== slug || !text(pkg.name, 100) || !text(pkg.tagline, 160) || !text(pkg.summary, 2000)) {
    fail(`${path}: package identity and listing metadata are invalid`);
    return;
  }
  if (!/^\d+\.\d+\.\d+$/.test(pkg.release ?? "")) fail(`${path}: package.release must be semver`);
  if (!text(pkg.category, 80) || !text(pkg.author?.name, 100) || !text(pkg.license, 80)) {
    fail(`${path}: category, author, and license are required`);
  }
  if (!list(pkg.outcomes, 12) || pkg.outcomes.length === 0 || pkg.outcomes.some((value) => !text(value, 240))) {
    fail(`${path}: package.outcomes must contain 1-12 outcomes`);
  }
  if (!Number.isInteger(pkg.setupMinutes) || pkg.setupMinutes < 1 || pkg.setupMinutes > 240) {
    fail(`${path}: package.setupMinutes must be 1-240`);
  }
  if (pkg.proof !== undefined) {
    const proof = pkg.proof;
    if (!text(proof?.amount, 20) || !/^\$[\d,.]+\s?[KkMm]?\+?$/.test(proof.amount.trim())) {
      fail(`${path}: proof.amount must be a dollar figure like "$4,200" or "$12K"`);
    }
    if (!["monthly", "weekly", "daily", "total"].includes(proof?.period)) {
      fail(`${path}: proof.period must be monthly, weekly, daily, or total`);
    }
    if (typeof proof?.source?.url !== "string" || !/^https:\/\/\S+$/.test(proof.source.url)) {
      fail(`${path}: proof.source.url must be an https link to the public claim`);
    }
    if (!text(proof?.source?.author, 80)) fail(`${path}: proof.source.author is required`);
    if (proof?.source?.quote !== undefined && !text(proof.source.quote, 500)) {
      fail(`${path}: proof.source.quote must be 1-500 characters`);
    }
    if (proof?.source?.date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(proof.source.date)) {
      fail(`${path}: proof.source.date must be YYYY-MM-DD`);
    }
    if (proof?.credibility !== undefined && !["receipts", "claimed"].includes(proof.credibility)) {
      fail(`${path}: proof.credibility must be receipts or claimed`);
    }
  }
  if (!list(pkg.requirements?.apps, 30) || !list(pkg.requirements?.capabilities, 20)) {
    fail(`${path}: package.requirements is invalid`);
  }
  for (const app of pkg.requirements?.apps ?? []) {
    if (!text(app?.slug, 80) || !/^[a-z0-9][a-z0-9_-]*$/.test(app.slug) || !text(app?.label, 100) || !text(app?.reason, 240)) {
      fail(`${path}: package requirement app is invalid`);
    }
  }
  if (!Array.isArray(pkg.agents) || pkg.agents.length === 0 || pkg.agents.length > 50) {
    fail(`${path}: package.agents must contain 1-50 agents`);
    return;
  }
  if (expectedMembers !== undefined && pkg.agents.length !== expectedMembers) {
    fail(`${path}: catalog says ${expectedMembers} members but package has ${pkg.agents.length}`);
  }

  const agentKeys = new Set();
  for (const [index, agent] of pkg.agents.entries()) {
    const at = `${path}: agent ${index + 1}`;
    if (!text(agent?.key, 64) || !/^[a-z0-9][a-z0-9_-]*$/.test(agent.key)) fail(`${at} has an invalid key`);
    else if (agentKeys.has(agent.key)) fail(`${at} duplicates key ${agent.key}`);
    else agentKeys.add(agent.key);
    if (!text(agent?.name, 100)) fail(`${at} needs a name`);
    if (typeof agent?.title !== "string" || agent.title.length > 200) fail(`${at} has an invalid title`);
    if (typeof agent?.description !== "string" || agent.description.length > 4000) fail(`${at} has an invalid description`);
    if (!allowedColors.has(agent?.appearance?.color)) fail(`${at} has an unsupported color`);
  }
  if (pkg.chiefOfStaff !== undefined && !agentKeys.has(pkg.chiefOfStaff)) {
    fail(`${path}: package.chiefOfStaff references an unknown agent`);
  }

  const playbookKeys = new Set();
  if (!list(pkg.playbooks ?? [], 80)) fail(`${path}: package.playbooks is invalid`);
  for (const [index, playbook] of (pkg.playbooks ?? []).entries()) {
    const at = `${path}: playbook ${index + 1}`;
    if (!text(playbook?.key, 64) || !/^[a-z0-9][a-z0-9_-]*$/.test(playbook.key)) fail(`${at} has an invalid key`);
    else if (playbookKeys.has(playbook.key)) fail(`${at} duplicates key ${playbook.key}`);
    else playbookKeys.add(playbook.key);
    if (!text(playbook?.name, 100) || !text(playbook?.summary, 300) || !text(playbook?.instructions, 24_000)) {
      fail(`${at} is missing its name, summary, or instructions`);
    }
    if (!list(playbook?.triggers, 30) || playbook.triggers.length === 0 || playbook.triggers.some((value) => !text(value, 100))) {
      fail(`${at} has invalid triggers`);
    }
  }
  for (const agent of pkg.agents) {
    for (const playbook of agent.playbooks ?? []) {
      if (!playbookKeys.has(playbook)) fail(`${path}: agent ${agent.key} references unknown playbook ${playbook}`);
    }
  }

  const roomKeys = new Set();
  if (!list(pkg.rooms ?? [], 30)) fail(`${path}: package.rooms is invalid`);
  for (const [index, room] of (pkg.rooms ?? []).entries()) {
    const at = `${path}: room ${index + 1}`;
    if (!text(room?.key, 64) || roomKeys.has(room.key)) fail(`${at} has an invalid or duplicate key`);
    else roomKeys.add(room.key);
    if (!text(room?.name, 100) || typeof room?.bulletin !== "string" || room.bulletin.length > 12_000) {
      fail(`${at} is invalid`);
    }
    if (!list(room?.members, 50) || room.members.length === 0 || room.members.some((key) => !agentKeys.has(key))) {
      fail(`${at} references an unknown agent`);
    }
    const responder = room?.defaultResponder;
    if (!responder || !["agent", "everyone", "mentions"].includes(responder.kind)) {
      fail(`${at} has an invalid default responder`);
    } else if (responder.kind === "agent" && !room.members.includes(responder.agent)) {
      fail(`${at} default responder must be a room member`);
    }
  }

  const routineKeys = new Set();
  if (!list(pkg.routines ?? [], 50)) fail(`${path}: package.routines is invalid`);
  for (const [index, routine] of (pkg.routines ?? []).entries()) {
    const at = `${path}: routine ${index + 1}`;
    if (!text(routine?.key, 64) || routineKeys.has(routine.key)) fail(`${at} has an invalid or duplicate key`);
    else routineKeys.add(routine.key);
    if (!text(routine?.name, 80) || !text(routine?.prompt, 20_000) || !agentKeys.has(routine?.agent)) {
      fail(`${at} is invalid`);
    }
    if (!['maus', 'cloud'].includes(routine?.runOn) || routine?.enabledAfterInstall !== false) {
      fail(`${at} must be disabled after install and use a supported runtime`);
    }
    const schedule = routine?.schedule;
    if (schedule?.type === "daily") {
      if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(schedule.time ?? "") || !list(schedule.weekdays, 7) || schedule.weekdays.length === 0) {
        fail(`${at} has an invalid daily schedule`);
      }
    } else if (schedule?.type !== "once" || !Number.isInteger(schedule.at)) {
      fail(`${at} has an invalid schedule`);
    }
  }
}

const catalog = json("catalog.json");
if (!catalog || catalog.format !== "openmaus.catalog" || catalog.version !== 1 || !Array.isArray(catalog.teams)) {
  fail("catalog.json: expected openmaus.catalog version 1");
} else {
  const slugs = new Set();
  // Older apps refuse a catalog of more than 100 teams outright.
  if (catalog.teams.length > 100) fail(`catalog.json: ${catalog.teams.length} teams; older apps read at most 100`);
  for (const team of catalog.teams) {
    const generated = team.folder !== undefined;
    if (generated && (team.folder !== `teams/${team.slug}` || !mainFile(root, team.slug))) {
      fail(`catalog.json: ${team.slug} is marked as a template folder, but teams/${team.slug} has no team.md or bot.md`);
      continue;
    }
    if (!text(team.slug, 80) || !/^[a-z0-9][a-z0-9-]*$/.test(team.slug)) fail("catalog.json: invalid team slug");
    else if (slugs.has(team.slug)) fail(`catalog.json: duplicate slug ${team.slug}`);
    else slugs.add(team.slug);
    if (!text(team.name, 100) || !text(team.summary, 300)) fail(`catalog.json: ${team.slug} needs a name and summary`);
    if (!safeFile(team.manifest, ".mausteam.json")) fail(`catalog.json: missing manifest for ${team.slug}`);
    else validateManifest(team.manifest, team.members);
    if (generated && team.package === undefined) {
      // Too big for a one-file playbook: older apps use the manifest.
    } else if (!safeFile(team.package, ".md")) fail(`catalog.json: missing Markdown playbook for ${team.slug}`);
    else if (!team.package.startsWith("packages/")) fail(`catalog.json: package must stay inside packages/`);
    else validatePackage(team.package, team.slug, team.members);
    if (!safeFile(team.readme, "README.md")) fail(`catalog.json: missing README for ${team.slug}`);
    if (!Array.isArray(team.skills) || (!generated && team.skills.length === 0)) fail(`catalog.json: ${team.slug} needs at least one skill`);
    for (const skill of team.skills ?? []) {
      if (!safeFile(skill, "SKILL.md")) fail(`catalog.json: missing skill ${String(skill)}`);
      else if (!skill.startsWith(`teams/${team.slug}/skills/`)) fail(`catalog.json: skill must stay inside ${team.slug}`);
    }
  }

  const folders = readdirSync(join(root, "teams"), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const legacySlugs = new Set(catalog.teams.filter((team) => team.folder === undefined).map((team) => team.slug));
  let templates = 0;
  for (const folder of folders) {
    if (mainFile(root, folder)) {
      // A template folder: checked the way scripts/build-catalog.mjs reads it, which makes its catalog entry.
      templates += 1;
      const { errors: folderErrors } = readFolder(root, folder);
      folderErrors.forEach(fail);
      if (legacySlugs.has(folder)) fail(`teams/${folder}: an older team already has this name; rename the folder`);
      const playbook = join(root, "packages", `${folder}.md`);
      if (existsSync(playbook) && !readFileSync(playbook, "utf8").includes(`\n${GENERATED_MARK}`)) fail(`teams/${folder}: packages/${folder}.md is a hand-written playbook; rename the folder`);
      if (!folderErrors.length && !slugs.has(folder)) fail(`teams/${folder}: run npm run catalog to add it to catalog.json`);
    } else if (!slugs.has(folder)) fail(`teams/${folder}: folder is missing from catalog.json`);
  }

  const listedPackages = new Set(catalog.teams.map((team) => team.package));
  const packageFiles = readdirSync(join(root, "packages"))
    .filter((name) => name.endsWith(".md"))
    .map((name) => `packages/${name}`);
  let standalone = 0;
  for (const packageFile of packageFiles) {
    if (listedPackages.has(packageFile)) continue;
    // Community playbooks may ship as standalone Markdown — fully validated,
    // just not part of the app's team-library catalog (which additionally
    // requires a manifest, README, and skills). The package id must still
    // match its filename so raw URLs and site routes agree.
    const slug = packageFile.slice("packages/".length, -".md".length);
    validatePackage(packageFile, slug, undefined);
    standalone += 1;
  }

  if (errors.length === 0) {
    console.log(`Validated ${catalog.teams.length} catalog teams (${templates} template folders) and ${standalone} standalone playbooks.`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
}
