// Template folders: `teams/<slug>/team.md` (a department) or `bot.md` (one bot), `skills/<name>/SKILL.md`, optional
// `avatars/<key>.webp` and `README.md`. This module reads and checks one folder, and builds what older apps and the
// site read from it: the catalog entry, `packages/<slug>.md` (BotMRR v1) and `teams/<slug>/team.mausteam.json`.
// scripts/build-catalog.mjs writes those files; scripts/validate.mjs checks folders with the same reader.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

export const MAIN_FILES = ["team.md", "bot.md"];
/** Written by scripts/build-catalog.mjs; a submission never needs to send them. */
export const GENERATED_IN_FOLDER = ["team.mausteam.json"];
export const GENERATED_MARK = "# Generated from teams/";
export const COLORS = new Set(["green", "blue", "red", "orange", "purple", "cyan", "pink", "yellow", "teal", "coral"]);
const FOLDER_MAX_BYTES = 4 * 1024 * 1024, AVATAR_MAX_BYTES = 64 * 1024, V1_MAX_SKILLS = 20, V1_MAX_MARKDOWN = 1_000_000;
const KEY = /^[a-z0-9][a-z0-9_-]*$/;
const SKILL_NAME = /^[a-z0-9][a-z0-9-]{0,63}$/;
const SECRET = /(?:sk-(?:proj-|ant-)?[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|xox[abprs]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
const PICTURES = {
  webp: (bytes) => bytes.length > 12 && bytes.subarray(0, 4).toString("latin1") === "RIFF" && bytes.subarray(8, 12).toString("latin1") === "WEBP",
  png: (bytes) => bytes.length > 8 && bytes[0] === 0x89 && bytes.subarray(1, 4).toString("latin1") === "PNG",
  jpg: (bytes) => bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
};
const text = (value, max) => typeof value === "string" && value.trim().length > 0 && value.trim().length <= max;
const optional = (value, max) => value === undefined || value === null || (typeof value === "string" && value.length <= max);

/** A folder with team.md or bot.md is a template folder; the older ones hold only team.mausteam.json. */
export function mainFile(root, slug) {
  return MAIN_FILES.find((name) => existsSync(join(root, "teams", slug, name))) ?? null;
}

export function frontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error("missing YAML frontmatter");
  const value = parseYaml(match[1], { maxAliasCount: 0 });
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("frontmatter is not a set of fields");
  return { meta: value, body: markdown.slice(match[0].length) };
}

function listFiles(dir, prefix = "") {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) return [{ path, link: true }];
    return entry.isDirectory() ? listFiles(join(dir, entry.name), path) : [{ path }];
  });
}

function allowedPath(path) {
  if (MAIN_FILES.includes(path) || path === "README.md" || GENERATED_IN_FOLDER.includes(path)) return true;
  if (/^skills\/[a-z0-9][a-z0-9-]{0,63}\/SKILL\.md$/.test(path)) return true;
  return /^avatars\/[a-z0-9][a-z0-9_-]{0,63}\.(?:webp|png|jpg)$/.test(path);
}

/**
 * Reads `teams/<slug>/` and returns `{ errors, folder }`. The folder name is the template's slug: an `id` in the
 * frontmatter is ignored, so a renamed submission (`-2`) needs no edit.
 */
export function readFolder(root, slug) {
  const errors = [], at = `teams/${slug}`, dir = join(root, "teams", slug);
  const fail = (message) => { errors.push(`${at}: ${message}`); };
  if (!/^[a-z0-9][a-z0-9-]{0,62}$/.test(slug)) fail("the folder name must be a lowercase slug (letters, digits and -)");
  const main = mainFile(root, slug);
  if (!main) return { errors: [`${at}: needs team.md or bot.md`], folder: null };
  const files = listFiles(dir);
  if (files.filter((file) => MAIN_FILES.includes(file.path)).length > 1) fail("has both team.md and bot.md; keep one");
  let bytes = 0;
  for (const file of files) {
    if (file.link) { fail(`${file.path} is a link; send the file itself`); continue; }
    if (!allowedPath(file.path)) { fail(`${file.path} can't be in a template (team.md or bot.md, README.md, skills/<name>/SKILL.md, avatars/<name>.webp)`); continue; }
    const size = statSync(join(dir, file.path)).size;
    bytes += size;
    if (file.path.startsWith("avatars/")) {
      const picture = readFileSync(join(dir, file.path));
      if (size > AVATAR_MAX_BYTES) fail(`${file.path} is bigger than 64 KB`);
      else if (!PICTURES[file.path.slice(file.path.lastIndexOf(".") + 1)](picture)) fail(`${file.path} isn't the picture its name says`);
    } else if (file.path.endsWith(".md")) {
      const content = readFileSync(join(dir, file.path), "utf8");
      if (SECRET.test(content)) fail(`${file.path} looks like it holds a key or token`);
    }
  }
  if (bytes > FOLDER_MAX_BYTES) fail("is bigger than 4 MB");

  let meta, body;
  try { ({ meta, body } = frontmatter(readFileSync(join(dir, main), "utf8"))); }
  catch (error) { return { errors: [...errors, `${at}/${main}: ${error.message}`], folder: null }; }
  const where = `${at}/${main}`;
  const bad = (message) => errors.push(`${where}: ${message}`);
  if (meta.botmrr !== 2) bad("expected botmrr: 2");
  if (!text(meta.name, 100)) bad("name is required (up to 100 characters)");
  if (!text(meta.tagline, 160)) bad("tagline is required (up to 160 characters)");
  if (!optional(meta.summary, 2000)) bad("summary is at most 2000 characters");
  if (!optional(meta.category, 80)) bad("category is at most 80 characters");
  if (meta.release !== undefined && !/^\d+\.\d+\.\d+$/.test(String(meta.release))) bad("release must be semver, such as 1.0.0");
  if (meta.setupMinutes !== undefined && (!Number.isInteger(meta.setupMinutes) || meta.setupMinutes < 1 || meta.setupMinutes > 240)) bad("setupMinutes must be 1-240");
  if (meta.outcomes !== undefined && (!Array.isArray(meta.outcomes) || meta.outcomes.length > 12 || meta.outcomes.some((value) => !text(value, 240)))) bad("outcomes must be up to 12 lines");
  const agents = Array.isArray(meta.agents) ? meta.agents : [];
  if (agents.length === 0 || agents.length > 50) bad("agents must list 1-50 bots");
  if (main === "bot.md" && agents.length !== 1) bad("bot.md holds exactly one bot; use team.md for a department");
  const keys = new Set(), named = new Set();
  for (const [index, agent] of agents.entries()) {
    const who = `bot ${index + 1}`;
    if (!text(agent?.key, 64) || !KEY.test(agent.key)) bad(`${who} has an invalid key`);
    else if (keys.has(agent.key)) bad(`${who} repeats key ${agent.key}`);
    else keys.add(agent.key);
    if (!text(agent?.name, 100)) bad(`${who} needs a name`);
    if (!optional(agent?.title, 200) || !optional(agent?.description, 4000)) bad(`${who} has a title over 200 or a description over 4000 characters`);
    for (const skill of agent?.skills ?? []) {
      if (typeof skill !== "string" || !SKILL_NAME.test(skill)) bad(`${who} lists an invalid skill name`);
      else if (!existsSync(join(dir, "skills", skill, "SKILL.md"))) bad(`${who} uses skill ${skill}, but skills/${skill}/SKILL.md is missing`);
      else named.add(skill);
    }
    const avatar = agent?.appearance?.avatar;
    if (avatar !== undefined && (typeof avatar !== "string" || !allowedPath(avatar) || !avatar.startsWith("avatars/") || !existsSync(join(dir, avatar)))) bad(`${who} shows a picture that isn't in avatars/`);
  }
  const leader = meta.team?.leader ?? meta.chiefOfStaff;
  if (leader !== undefined && !keys.has(leader)) bad("team.leader names an unknown bot");
  for (const [index, routine] of (Array.isArray(meta.routines) ? meta.routines : []).entries()) {
    if (routine?.enabledAfterInstall === true) bad(`routine ${index + 1} must arrive paused (enabledAfterInstall: false)`);
    if (routine?.agent !== undefined && !keys.has(routine.agent)) bad(`routine ${index + 1} names an unknown bot`);
    const weekdays = routine?.schedule?.weekdays;
    if (weekdays !== undefined && (!Array.isArray(weekdays) || weekdays.some((day) => weekdayNumber(day) === null))) {
      bad(`routine ${index + 1} has weekdays that aren't 0-6 (0 is Sunday) or day names`);
    }
  }
  for (const app of meta.requirements?.apps ?? []) {
    if (!text(app?.label, 100) || !optional(app?.reason, 240)) bad("each app in requirements.apps needs a label (and a reason up to 240 characters)");
  }
  const skills = [];
  if (existsSync(join(dir, "skills"))) {
    for (const name of readdirSync(join(dir, "skills")).sort()) {
      const path = join(dir, "skills", name, "SKILL.md");
      if (!existsSync(path)) continue;
      const content = readFileSync(path, "utf8");
      try {
        const { meta: skill } = frontmatter(content);
        if (skill.name !== name) errors.push(`${at}/skills/${name}/SKILL.md: name must be ${name}`);
        if (!text(skill.description, 1024)) errors.push(`${at}/skills/${name}/SKILL.md: description is required`);
        skills.push({ name, description: String(skill.description ?? "").trim(), instructions: content });
      } catch (error) {
        errors.push(`${at}/skills/${name}/SKILL.md: ${error.message}`);
      }
    }
  }
  const files_ = files.filter((file) => !file.link).map((file) => file.path).sort();
  return { errors, folder: errors.length ? null : { slug, kind: main === "bot.md" ? "bot" : "department", main, meta, body, skills, named, files: files_ } };
}

// ---- What older apps and the site read ------------------------------------------------------------------------------

const color = (value) => (COLORS.has(value) ? value : "blue");
const defaults = (folder) => {
  const { meta } = folder;
  return {
    release: meta.release ? String(meta.release) : "1.0.0",
    summary: text(meta.summary, 2000) ? meta.summary.trim() : meta.tagline.trim(),
    category: text(meta.category, 80) ? meta.category.trim() : "Community",
    author: text(meta.author?.name, 100) ? { name: meta.author.name.trim(), ...(typeof meta.author.url === "string" && /^https:\/\//.test(meta.author.url) ? { url: meta.author.url } : {}) } : { name: "MausBot community" },
    license: text(meta.license, 80) ? meta.license.trim() : "MIT",
    outcomes: Array.isArray(meta.outcomes) && meta.outcomes.length ? meta.outcomes.map((value) => value.trim()) : [meta.tagline.trim()],
    setupMinutes: Number.isInteger(meta.setupMinutes) ? meta.setupMinutes : 5,
    apps: (meta.requirements?.apps ?? []).map((app) => ({
      slug: text(app.slug, 80) && KEY.test(app.slug) ? app.slug : app.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "app",
      label: app.label.trim(), reason: text(app.reason, 240) ? app.reason.trim() : `Connect ${app.label.trim()}.`, ...(app.optional === true ? { optional: true } : {}) })),
  };
};

const DAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
/** A weekday as the app counts it, 0-6 from Sunday: 7 (Sunday, as cron also writes it) is 0, and "mon" or "Monday"
 * is 1. Null when it is neither. */
function weekdayNumber(day) {
  if (Number.isInteger(day)) return day >= 0 && day <= 7 ? day % 7 : null;
  const name = typeof day === "string" ? day.trim().toLowerCase() : "";
  const index = DAY_NAMES.findIndex((full) => name === full || name === full.slice(0, 3));
  return index === -1 ? null : index;
}
const appWeekdays = (weekdays) => [...new Set(weekdays.map(weekdayNumber))].sort((a, b) => a - b);
const appSchedule = (schedule) => (schedule.type === "daily" ? { ...schedule, weekdays: appWeekdays(schedule.weekdays) } : schedule);

/** The BotMRR v1 package older apps install and the site lists. Routines older apps can't read, rooms' Auto and
 * pictures are left out; skills are inlined while there are at most 20. Null when it can't be made. */
export function packageV1(folder) {
  const { meta, slug } = folder, base = defaults(folder);
  const keys = new Set(meta.agents.map((agent) => agent.key));
  const leader = meta.team?.leader ?? meta.chiefOfStaff;
  const agents = meta.agents.map((agent) => ({
    key: agent.key, name: agent.name.trim(), title: text(agent.title, 200) ? agent.title.trim() : "Specialist",
    description: typeof agent.description === "string" ? agent.description.trim() : "",
    appearance: { color: color(agent.appearance?.color), ...(text(agent.appearance?.mascotExpression, 80) ? { mascotExpression: agent.appearance.mascotExpression } : {}),
      ...(text(agent.appearance?.mascotBody, 40) ? { mascotBody: agent.appearance.mascotBody } : {}) },
    ...(Array.isArray(agent.playbooks) && agent.playbooks.length ? { playbooks: agent.playbooks } : {}),
    ...(Array.isArray(agent.skills) && agent.skills.length ? { skills: agent.skills } : {}),
  }));
  const rooms = (Array.isArray(meta.rooms) ? meta.rooms : []).filter((room) => text(room?.key, 64) && text(room?.name, 100) && Array.isArray(room.members)
    && room.members.length && room.members.every((key) => keys.has(key))).map((room) => {
    const kind = room.defaultResponder?.kind;
    const defaultResponder = kind === "everyone" || kind === "mentions" ? { kind }
      : { kind: "agent", agent: keys.has(room.defaultResponder?.agent) && room.members.includes(room.defaultResponder.agent) ? room.defaultResponder.agent : room.members[0] };
    return { key: room.key, name: room.name, members: room.members, bulletin: typeof room.bulletin === "string" ? room.bulletin : "", defaultResponder };
  });
  const routines = (Array.isArray(meta.routines) ? meta.routines : []).filter((routine) => routine?.room === undefined && keys.has(routine?.agent)
    && text(routine.key, 64) && text(routine.name, 80) && text(routine.prompt, 20_000) && ["maus", "cloud"].includes(routine.runOn)
    && Number.isInteger(routine.durationMinutes) && routine.durationMinutes >= 5 && routine.durationMinutes <= 240
    && ((routine.schedule?.type === "daily" && /^([01]\d|2[0-3]):[0-5]\d$/.test(routine.schedule.time ?? "") && Array.isArray(routine.schedule.weekdays) && routine.schedule.weekdays.length)
      || (routine.schedule?.type === "once" && Number.isInteger(routine.schedule.at))))
    .map(({ key, name, agent, prompt, runOn, schedule, durationMinutes, overlap }) => ({ key, name, agent, prompt, runOn, schedule: appSchedule(schedule), durationMinutes,
      ...(overlap === "skip" || overlap === "queue" ? { overlap } : {}), enabledAfterInstall: false }));
  const playbooks = (Array.isArray(meta.playbooks) ? meta.playbooks : []).filter((playbook) => text(playbook?.key, 64) && text(playbook.name, 100)
    && text(playbook.summary, 300) && text(playbook.instructions, 24_000) && Array.isArray(playbook.triggers) && playbook.triggers.length);
  const playbookKeys = new Set(playbooks.map((playbook) => playbook.key));
  for (const agent of agents) if (agent.playbooks) agent.playbooks = agent.playbooks.filter((key) => playbookKeys.has(key));
  const referenced = folder.skills.filter((skill) => folder.named.has(skill.name));
  const withSkills = referenced.length > 0 && referenced.length <= V1_MAX_SKILLS && agents.every((agent) => (agent.skills?.length ?? 0) <= V1_MAX_SKILLS);
  const pkg = (inline) => ({
    id: slug, release: base.release, name: meta.name.trim(), tagline: meta.tagline.trim(), summary: base.summary, category: base.category,
    author: base.author, license: base.license,
    ...(Array.isArray(meta.tags) && meta.tags.every((tag) => text(tag, 80)) && meta.tags.length <= 30 ? { tags: meta.tags } : {}),
    outcomes: base.outcomes, setupMinutes: base.setupMinutes,
    requirements: { apps: base.apps, capabilities: Array.isArray(meta.requirements?.capabilities) ? meta.requirements.capabilities.filter((value) => text(value, 80)).slice(0, 20) : [] },
    agents: inline ? agents : agents.map(({ skills: _skills, ...agent }) => agent),
    ...(leader && keys.has(leader) ? { chiefOfStaff: leader } : {}),
    ...(rooms.length ? { rooms } : {}), ...(routines.length ? { routines } : {}), ...(playbooks.length ? { playbooks } : {}),
    ...(inline ? { skills: { version: 1, entries: referenced } } : {}),
    ...(Array.isArray(meta.examples) && meta.examples.length ? { examples: meta.examples.filter((example) => text(example?.title, 120) && text(example.input, 4000) && text(example.output, 8000)).slice(0, 12) } : {}),
  });
  for (const inline of withSkills ? [true, false] : [false]) {
    const markdown = renderPackage(folder, pkg(inline));
    if (Buffer.byteLength(markdown) <= V1_MAX_MARKDOWN) return markdown;
  }
  return null;
}

const REQUIRED_SECTIONS = ["Activation", "Mission", "Outcomes", "Connections", "Team", "Chief of Staff", "Completion rule"];

/** The folder's own body when it already has every BotMRR section, else the standard one any agent product can run. */
function renderPackage(folder, pkg) {
  const front = `---\n${GENERATED_MARK}${folder.slug}/${folder.main} by scripts/build-catalog.mjs. Edit that folder, not this file.\n${stringifyYaml({ botmrr: 1, ...pkg }, { lineWidth: 0 }).trim()}\n---\n`;
  if (REQUIRED_SECTIONS.every((heading) => new RegExp(`^## ${heading}\\s*$`, "m").test(folder.body))) return `${front}${folder.body.startsWith("\n") ? "" : "\n"}${folder.body}`;
  const list = (values) => values.map((value) => `- ${value}`).join("\n");
  const agents = pkg.agents.map((agent) => [`### ${agent.name} — ${agent.title}`, `**Role key:** \`${agent.key}\``,
    agent.playbooks?.length ? `**Use these playbooks:** ${agent.playbooks.map((key) => `\`${key}\``).join(", ")}` : "", agent.description].filter(Boolean).join("\n\n")).join("\n\n");
  const connections = pkg.requirements.apps.length ? pkg.requirements.apps.map((app) => `- **${app.label}${app.optional ? " (optional)" : ""}:** ${app.reason}`).join("\n")
    : "- No connected apps are required.";
  const rooms = (pkg.rooms ?? []).map((room) => [`### ${room.name}`, `**Members:** ${room.members.map((key) => `\`${key}\``).join(", ")}`, room.bulletin].filter(Boolean).join("\n\n")).join("\n\n");
  const routines = (pkg.routines ?? []).map((routine) => [`### ${routine.name}`, `**Owner:** \`${routine.agent}\`  `, "**Initial state:** paused — the user must enable it", "", routine.prompt].join("\n")).join("\n\n");
  const skills = (pkg.agents.some((agent) => agent.skills?.length) ? folder.skills.filter((skill) => folder.named.has(skill.name)) : []).map((skill) => `- **${skill.name}:** ${skill.description}`).join("\n");
  return `${front}\n# ${pkg.name}\n\n${pkg.tagline}\n\n> **Give this file to your Chief of Staff.** It is the complete team blueprint. Any agent system can run it; OpenMausBot can also install it directly.\n\n`
    + "## Activation\n\nYou are the Chief of Staff for this blueprint. Read the whole document before acting. Confirm the user's goal and any missing inputs, then create or delegate to the specialist roles below. Preserve their names, ownership, boundaries, shared-room rules, and playbooks. If your platform cannot literally spawn agents, perform the roles one at a time and keep their outputs clearly separated.\n\n"
    + "Never request pasted passwords or secret keys. Use the platform's normal connection flow. Do not send messages, publish content, spend money, delete data, or enable a schedule without the user's explicit approval. All routines start paused.\n\n"
    + `## Mission\n\n${pkg.summary}\n\n## Outcomes\n\n${list(pkg.outcomes)}\n\n## Connections\n\n${connections}\n\n## Team\n\n${agents}\n\n`
    + `## Chief of Staff\n\nThe Chief of Staff role is \`${pkg.chiefOfStaff ?? pkg.agents[0].key}\`. This role owns delegation, synthesis, conflict resolution, and the final answer to the user.\n`
    + (rooms ? `\n## Shared rooms\n\n${rooms}\n` : "") + (routines ? `\n## Suggested routines\n\n${routines}\n` : "") + (skills ? `\n## Skills\n\n${skills}\n` : "")
    + "\n## Completion rule\n\nReturn one clear result to the user, distinguish evidence from inference, cite source links when the work uses external material, and state what still needs human approval or a connected app.\n";
}

/** The openmaus.team v1 file older apps fall back to (the catalog's `manifest`). */
export function manifestV1(folder) {
  const { meta } = folder, base = defaults(folder);
  const keys = new Set(meta.agents.map((agent) => agent.key)), leader = meta.team?.leader ?? meta.chiefOfStaff;
  const room = Array.isArray(meta.rooms) ? meta.rooms.find((value) => text(value?.name, 100) && Array.isArray(value.members)) : undefined;
  const lead = keys.has(leader) ? leader : room?.defaultResponder?.kind === "agent" && keys.has(room.defaultResponder.agent) ? room.defaultResponder.agent : null;
  return {
    format: "openmaus.team", version: 1,
    team: {
      name: meta.name.trim(), description: base.summary,
      members: meta.agents.map((agent) => ({ key: agent.key, name: agent.name.trim(), title: text(agent.title, 200) ? agent.title.trim() : "Specialist",
        description: typeof agent.description === "string" ? agent.description.trim() : "",
        appearance: { color: color(agent.appearance?.color), ...(text(agent.appearance?.mascotExpression, 80) ? { mascotExpression: agent.appearance.mascotExpression } : {}) } })),
      room: { name: room ? room.name : `${meta.name.trim().slice(0, 94)} Room`, bulletin: typeof room?.bulletin === "string" ? room.bulletin : (typeof meta.team?.brief === "string" ? meta.team.brief.slice(0, 12_000) : ""),
        defaultResponder: lead ? { kind: "member", member: lead } : { kind: "mentions" } },
    },
  };
}

/** Credits that name nobody: what MausBot wrote before its "Published by" field, and the community's own. */
const NOBODY = new Set(["community", "mausbot community", "mausbot user", "openmausbot user", "a mausbot user", "community contributor", "openmausbot 用户"]);

/** The folder's "Published by" (`author.name`) for the gallery; none when it names nobody. */
export function catalogAuthor(folder) {
  const name = folder.meta.author?.name;
  if (!text(name, 100)) return undefined;
  const line = name.replace(/\s+/g, " ").trim();
  return NOBODY.has(line.toLowerCase()) ? undefined : line;
}

/**
 * Whether MausBot's folder reader takes the folder as it is. The app reads a folder strictly: the fields this repo
 * fills in for the generated files must be in the frontmatter itself. A folder that lacks one is still listed, and
 * apps add it from the generated playbook instead.
 */
export function appReadsFolder(folder) {
  const { meta } = folder;
  return text(meta.id, 80) && /^[a-z0-9][a-z0-9-]*$/.test(meta.id.trim()) && /^\d+\.\d+\.\d+$/.test(String(meta.release ?? ""))
    && text(meta.summary, 2000) && text(meta.category, 80) && text(meta.author?.name, 100) && text(meta.license, 80)
    && Array.isArray(meta.outcomes) && meta.outcomes.length > 0 && Number.isInteger(meta.setupMinutes)
    && (meta.team === undefined || meta.team === null || text(meta.team.name, 60))
    && (Array.isArray(meta.routines) ? meta.routines : []).every((routine) => !Array.isArray(routine?.schedule?.weekdays) || routine.schedule.weekdays.every((day) => Number.isInteger(day) && day >= 0 && day <= 6));
}

/** Every colour MausBot draws a bot in; the generated files keep to COLORS, which older apps also know. */
const APP_COLORS = [...COLORS, "silver", "chrome"];
const LOOK = /^[a-z0-9][a-z0-9-]{0,39}$/;

/** A colour from the slug, for a bot that names none, so a template's default mascot keeps the same colour. */
export function slugColor(slug) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.codePointAt(0)) >>> 0;
  const colors = [...COLORS];
  return colors[hash % colors.length];
}

/** The gallery's faces: each bot's colour, mascot and picture (a path in this repo), as its appearance says. */
export function catalogAvatars(slug, agents, pictureBase) {
  return agents.filter((agent) => text(agent?.key, 64) && text(agent?.name, 100)).map((agent) => {
    const look = agent.appearance ?? {};
    const picture = typeof look.avatar === "string" && /^avatars\/[a-z0-9][a-z0-9_-]{0,63}\.(?:webp|png|jpg)$/.test(look.avatar) && pictureBase
      ? `${pictureBase}/${look.avatar}` : undefined;
    return {
      key: agent.key, name: agent.name.trim(), color: APP_COLORS.includes(look.color) ? look.color : slugColor(slug),
      ...(typeof look.mascotBody === "string" && LOOK.test(look.mascotBody) ? { mascotBody: look.mascotBody } : {}),
      ...(typeof look.mascotExpression === "string" && LOOK.test(look.mascotExpression) ? { mascotExpression: look.mascotExpression } : {}),
      ...(picture ? { picture } : {}),
    };
  });
}

/** The folder's catalog entry. `main` marks it as generated; `folder` tells newer apps to read the folder itself, and
 * is left out when the app can't, so it adds the generated playbook. */
export function catalogEntry(folder, hasPackage) {
  const { meta, slug } = folder, base = defaults(folder);
  const author = catalogAuthor(folder);
  return {
    slug, name: meta.name.trim(), summary: meta.tagline.trim(), category: base.category, outcome: base.outcomes[0].slice(0, 300), setupMinutes: base.setupMinutes,
    ...(hasPackage ? { package: `packages/${slug}.md` } : {}),
    manifest: `teams/${slug}/team.mausteam.json`, readme: `teams/${slug}/README.md`,
    members: meta.agents.length,
    skills: folder.skills.map((skill) => `teams/${slug}/skills/${skill.name}/SKILL.md`),
    requires: { apps: base.apps.map((app) => app.label) },
    ...(hasPackage && !appReadsFolder(folder) ? {} : { folder: `teams/${slug}` }), kind: folder.kind, main: `teams/${slug}/${folder.main}`,
    ...(author ? { author } : {}),
    avatars: catalogAvatars(slug, meta.agents, `teams/${slug}`),
  };
}

/** A README for people browsing GitHub, when the folder has none. */
export function readme(folder) {
  const { meta } = folder;
  const bots = meta.agents.map((agent) => `- **${agent.name.trim()}${text(agent.title, 200) ? ` — ${agent.title.trim()}` : ""}**`).join("\n");
  const skills = folder.skills.map((skill) => `- **${skill.name}:** ${skill.description}`).join("\n");
  return `# ${meta.name.trim()}\n\n${meta.tagline.trim()}\n\n## ${folder.kind === "bot" ? "Bot" : "Bots"}\n\n${bots}\n${skills ? `\n## Skills\n\n${skills}\n` : ""}\nAdd it in MausBot with Import… and this folder's link. Routines arrive paused, and you connect your own apps.\n`;
}
