#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = process.cwd();
const DEFAULT_CONFIG_PATH = path.join(PROJECT_ROOT, "skills-sync.config.json");

const PROVIDER_PATHS = {
  opencode: path.join(PROJECT_ROOT, ".opencode", "skills"),
  github: path.join(PROJECT_ROOT, ".github", "skills"),
  antigravit: path.join(PROJECT_ROOT, ".agents", "skills"),
  antigravity: path.join(PROJECT_ROOT, ".agents", "skills"),
  claude: path.join(PROJECT_ROOT, ".claude", "skills"),
};

function parseArgs(argv) {
  const args = {
    source: null,
    targets: null,
    apply: false,
    delete: false,
    confirmDelete: false,
    allowInvalid: false,
    configPath: DEFAULT_CONFIG_PATH,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === "--apply") {
      args.apply = true;
      continue;
    }

    if (token === "--delete") {
      args.delete = true;
      continue;
    }

    if (token === "--confirm-delete") {
      args.confirmDelete = true;
      continue;
    }

    if (token === "--allow-invalid") {
      args.allowInvalid = true;
      continue;
    }

    if (token.startsWith("--config=")) {
      args.configPath = path.resolve(PROJECT_ROOT, token.split("=")[1].trim());
      continue;
    }

    if (token === "--config") {
      args.configPath = path.resolve(
        PROJECT_ROOT,
        String(argv[i + 1] || "").trim(),
      );
      i += 1;
      continue;
    }

    if (token.startsWith("--source=")) {
      args.source = token.split("=")[1].trim();
      continue;
    }

    if (token === "--source") {
      args.source = String(argv[i + 1] || "").trim();
      i += 1;
      continue;
    }

    if (token.startsWith("--targets=")) {
      args.targets = token
        .split("=")[1]
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
      continue;
    }

    if (token === "--targets") {
      args.targets = String(argv[i + 1] || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
      i += 1;
    }
  }

  return args;
}

function loadConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    return {
      canonicalSource: "opencode",
      defaultTargets: ["github", "antigravit", "claude"],
    };
  }

  const raw = fs.readFileSync(configPath, "utf8");
  const parsed = JSON.parse(raw);

  return {
    canonicalSource: parsed.canonicalSource || "opencode",
    defaultTargets: Array.isArray(parsed.defaultTargets)
      ? parsed.defaultTargets
      : ["github", "antigravit", "claude"],
  };
}

function resolveProviderDir(provider) {
  const normalized = provider.toLowerCase();
  const mapped = PROVIDER_PATHS[normalized];
  if (!mapped) {
    throw new Error(`Proveedor no soportado: ${provider}`);
  }
  return mapped;
}

function ensureDirSync(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function listSkillDirs(skillsRoot) {
  if (!fs.existsSync(skillsRoot)) {
    return [];
  }

  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => fs.existsSync(path.join(skillsRoot, name, "SKILL.md")))
    .sort();
}

function parseFrontmatter(skillFilePath) {
  const text = fs.readFileSync(skillFilePath, "utf8");
  const lines = text.split(/\r?\n/);

  if (lines[0] !== "---") {
    return { data: null, errors: ["Falta frontmatter YAML inicial (---)."] };
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === "---") {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    return { data: null, errors: ["Frontmatter sin cierre (---)."] };
  }

  const data = {};
  for (let i = 1; i < endIndex; i += 1) {
    const line = lines[i].trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const sep = line.indexOf(":");
    if (sep <= 0) {
      continue;
    }

    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return { data, errors: [] };
}

function validateSourceSkills(sourceRoot) {
  const skills = listSkillDirs(sourceRoot);
  const report = [];

  for (const skillName of skills) {
    const skillFilePath = path.join(sourceRoot, skillName, "SKILL.md");
    const item = { skill: skillName, errors: [], warnings: [] };
    const parsed = parseFrontmatter(skillFilePath);

    item.errors.push(...parsed.errors);

    if (parsed.data) {
      const fmName = parsed.data.name || "";
      const fmDescription = parsed.data.description || "";

      if (!fmName) {
        item.errors.push("Frontmatter sin campo obligatorio 'name'.");
      }

      if (!fmDescription) {
        item.errors.push("Frontmatter sin campo obligatorio 'description'.");
      }

      if (fmName && !/^[a-z0-9-]{1,64}$/.test(fmName)) {
        item.errors.push(
          "El campo 'name' debe estar en kebab-case (a-z, 0-9, -) y maximo 64 caracteres.",
        );
      }

      if (!/^[a-z0-9-]{1,64}$/.test(skillName)) {
        item.errors.push(
          "El nombre de carpeta debe estar en kebab-case (a-z, 0-9, -) y maximo 64 caracteres.",
        );
      }

      if (fmName && fmName !== skillName) {
        item.warnings.push(
          `name (${fmName}) no coincide con la carpeta (${skillName}).`,
        );
      }
    }

    report.push(item);
  }

  return report;
}

function printValidationReport(report) {
  console.log("\nValidacion de skills (source):");
  let hasAnyIssue = false;

  for (const item of report) {
    if (item.errors.length === 0 && item.warnings.length === 0) {
      continue;
    }

    hasAnyIssue = true;
    console.log(`- ${item.skill}`);

    for (const err of item.errors) {
      console.log(`  [ERROR] ${err}`);
    }

    for (const warning of item.warnings) {
      console.log(`  [WARN] ${warning}`);
    }
  }

  if (!hasAnyIssue) {
    console.log("- OK: sin errores ni advertencias de frontmatter/naming.");
  }
}

function copyDirRecursive(src, dst) {
  ensureDirSync(dst);

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, dstPath);
      continue;
    }

    if (entry.isSymbolicLink()) {
      continue;
    }

    const sourceBuffer = fs.readFileSync(srcPath);
    const sameContent =
      fs.existsSync(dstPath) &&
      Buffer.compare(sourceBuffer, fs.readFileSync(dstPath)) === 0;

    if (!sameContent) {
      ensureDirSync(path.dirname(dstPath));
      fs.writeFileSync(dstPath, sourceBuffer);
    }
  }
}

function removeDirRecursive(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function syncToTarget({ sourceRoot, targetRoot, apply, deleteMissing }) {
  const sourceSkills = listSkillDirs(sourceRoot);
  const targetSkills = listSkillDirs(targetRoot);

  const toCreateOrUpdate = sourceSkills;
  const toDelete = deleteMissing
    ? targetSkills.filter((name) => !sourceSkills.includes(name))
    : [];

  for (const skillName of toCreateOrUpdate) {
    const srcDir = path.join(sourceRoot, skillName);
    const dstDir = path.join(targetRoot, skillName);
    if (apply) {
      copyDirRecursive(srcDir, dstDir);
    }
  }

  for (const skillName of toDelete) {
    const dstDir = path.join(targetRoot, skillName);
    if (apply) {
      removeDirRecursive(dstDir);
    }
  }

  return {
    sourceCount: sourceSkills.length,
    targetCount: targetSkills.length,
    toCreateOrUpdate,
    toDelete,
  };
}

function relativeFromRoot(p) {
  return path.relative(PROJECT_ROOT, p).replace(/\\/g, "/");
}

function main() {
  const options = parseArgs(process.argv);
  const config = loadConfig(options.configPath);

  if (!options.source) {
    options.source = config.canonicalSource;
  }

  if (!options.targets || options.targets.length === 0) {
    options.targets = config.defaultTargets;
  }

  if (options.delete && !options.confirmDelete) {
    throw new Error(
      "--delete requiere confirmacion explicita con --confirm-delete.",
    );
  }

  const sourceRoot = resolveProviderDir(options.source);
  if (!fs.existsSync(sourceRoot)) {
    throw new Error(
      `No existe la ruta source '${options.source}' (${relativeFromRoot(sourceRoot)}).`,
    );
  }

  const normalizedTargets = options.targets
    .map((t) => t.toLowerCase())
    .filter((t) => t !== options.source.toLowerCase());

  if (normalizedTargets.length === 0) {
    throw new Error("Debes indicar al menos un target distinto a source.");
  }

  const validationReport = validateSourceSkills(sourceRoot);
  printValidationReport(validationReport);

  const errorsCount = validationReport.reduce(
    (acc, item) => acc + item.errors.length,
    0,
  );

  if (errorsCount > 0 && !options.allowInvalid) {
    throw new Error(
      `Validacion fallida: ${errorsCount} errores. Corrige o usa --allow-invalid.`,
    );
  }

  console.log(
    `Modo: ${options.apply ? "APPLY" : "DRY-RUN"} | source=${options.source} | targets=${normalizedTargets.join(",")}`,
  );

  for (const target of normalizedTargets) {
    const targetRoot = resolveProviderDir(target);
    ensureDirSync(targetRoot);

    const report = syncToTarget({
      sourceRoot,
      targetRoot,
      apply: options.apply,
      deleteMissing: options.delete,
    });

    console.log(`\n[${options.source} -> ${target}]`);
    console.log(`- Source skills: ${report.sourceCount}`);
    console.log(`- Target skills: ${report.targetCount}`);
    console.log(`- Sync skill folders: ${report.toCreateOrUpdate.length}`);
    if (report.toCreateOrUpdate.length > 0) {
      for (const name of report.toCreateOrUpdate) {
        console.log(`  * ${name}`);
      }
    }

    if (options.delete) {
      console.log(`- Delete missing from target: ${report.toDelete.length}`);
      if (report.toDelete.length > 0) {
        for (const name of report.toDelete) {
          console.log(`  - ${name}`);
        }
      }
    }
  }

  if (!options.apply) {
    console.log(
      "\nSin cambios aplicados. Usa --apply para ejecutar la sincronizacion.",
    );
  }
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
