// Builds what older apps and the site read from the template folders, so a submission only adds `teams/<slug>/`:
//   catalog.json                     entries for template folders (marked with `main`); the older teams' entries stay as
//                                    written, plus the faces the gallery shows, read from their own files
//   packages/<slug>.md               BotMRR v1, marked as generated
//   teams/<slug>/team.mausteam.json  openmaus.team v1
//   teams/<slug>/README.md           only when the folder has none
// A folder that fails its checks is skipped here; scripts/validate.mjs reports why. Run on every push to main by
// .github/workflows/validate.yml, which commits the result.
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { catalogAvatars, catalogEntry, frontmatter, GENERATED_MARK, mainFile, manifestV1, packageV1, readFolder, readme } from "./teams-folder.mjs";

/** An older team's bots as its playbook (or else its manifest) lists them. */
function legacyAgents(root, entry) {
  try {
    const agents = entry.package ? frontmatter(readFileSync(join(root, entry.package), "utf8")).meta.agents : undefined;
    if (Array.isArray(agents)) return agents;
  } catch {}
  try {
    const members = JSON.parse(readFileSync(join(root, entry.manifest), "utf8")).team?.members;
    return Array.isArray(members) ? members : [];
  } catch {
    return [];
  }
}

export function buildCatalog(root) {
  const written = [];
  const write = (path, content) => {
    const target = join(root, path);
    if (existsSync(target) && readFileSync(target, "utf8") === content) return;
    writeFileSync(target, content);
    written.push(path);
  };
  const generatedPackage = (path) => existsSync(join(root, path)) && readFileSync(join(root, path), "utf8").includes(`\n${GENERATED_MARK}`);
  const catalog = JSON.parse(readFileSync(join(root, "catalog.json"), "utf8"));
  const legacy = catalog.teams.filter((entry) => entry.main === undefined)
    .map((entry) => ({ ...entry, avatars: catalogAvatars(entry.slug, legacyAgents(root, entry), null) }));
  const legacySlugs = new Set(legacy.map((entry) => entry.slug));
  const slugs = readdirSync(join(root, "teams"), { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  const entries = [], skipped = [];
  for (const slug of slugs) {
    if (!mainFile(root, slug)) continue;
    const { errors, folder } = readFolder(root, slug);
    const packagePath = `packages/${slug}.md`;
    // A template never takes an older team's slug or a hand-written playbook's file.
    if (!folder || legacySlugs.has(slug) || (existsSync(join(root, packagePath)) && !generatedPackage(packagePath))) {
      skipped.push(slug, ...errors);
      continue;
    }
    const markdown = packageV1(folder);
    if (markdown) write(packagePath, markdown);
    else if (generatedPackage(packagePath)) { rmSync(join(root, packagePath)); written.push(packagePath); }
    write(`teams/${slug}/team.mausteam.json`, `${JSON.stringify(manifestV1(folder), null, 2)}\n`);
    if (!folder.files.includes("README.md")) write(`teams/${slug}/README.md`, readme(folder));
    entries.push(catalogEntry(folder, Boolean(markdown)));
  }
  // Generated playbooks whose folder is gone go too.
  const kept = new Set(entries.map((entry) => entry.package).filter(Boolean));
  for (const name of readdirSync(join(root, "packages")).filter((file) => file.endsWith(".md"))) {
    const path = `packages/${name}`;
    if (!kept.has(path) && generatedPackage(path) && !mainFile(root, name.slice(0, -3))) { rmSync(join(root, path)); written.push(path); }
  }
  const next = { ...catalog, teams: [...legacy, ...entries] };
  // Unchanged content keeps the file as it is, formatting included.
  if (!isDeepStrictEqual(next, catalog)) write("catalog.json", `${JSON.stringify(next, null, 2)}\n`);
  return { written, entries: entries.length, skipped };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const { written, entries, skipped } = buildCatalog(root);
  console.log(`Built ${entries} template folder${entries === 1 ? "" : "s"}; ${written.length ? `wrote ${written.join(", ")}` : "nothing changed"}.`);
  if (skipped.length) console.log(`Skipped (scripts/validate.mjs says why): ${skipped.join("; ")}`);
}
