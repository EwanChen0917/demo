import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = ['a', 'b'];
const jsExtensions = new Set(['.js', '.mjs', '.cjs']);
const bundledSignatures = ['__epPropKey', 'Invalid prop: validation failed', 'ElButtonGroup'];

const collectJsFiles = (dir) => {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const result = [];
  const walk = (currentDir) => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (jsExtensions.has(path.extname(entry.name))) {
        result.push(fullPath);
      }
    }
  };

  walk(dir);
  return result;
};

const collectReachableFiles = (entryFile) => {
  const visited = new Set();
  const queue = [entryFile];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || visited.has(current) || !fs.existsSync(current)) {
      continue;
    }

    visited.add(current);

    const code = fs.readFileSync(current, 'utf8');
    const importMatches = code.matchAll(
      /from\s+['"](\.\/?[^'"]+)['"]|import\(['"](\.\/?[^'"]+)['"]\)/g,
    );

    for (const match of importMatches) {
      const specifier = match[1] ?? match[2];
      if (!specifier) {
        continue;
      }

      const resolved = path.resolve(path.dirname(current), specifier);
      const candidates = [resolved, `${resolved}.js`, `${resolved}.mjs`, `${resolved}.cjs`];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate) && jsExtensions.has(path.extname(candidate))) {
          queue.push(candidate);
          break;
        }
      }
    }
  }

  return Array.from(visited);
};

const violations = [];

for (const pkg of targets) {
  const distDir = path.join(root, 'dist', pkg);
  const entryFile = path.join(distDir, 'index.js');
  const files = fs.existsSync(entryFile)
    ? collectReachableFiles(entryFile)
    : collectJsFiles(distDir);

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matched = bundledSignatures.some((signature) => content.includes(signature));

    if (matched) {
      violations.push(path.relative(root, file));
    }
  }
}

if (violations.length > 0) {
  console.error('\n[externals-check] Found bundled Element Plus signatures in subpackage outputs:');
  for (const file of violations) {
    console.error(`- ${file}`);
  }
  console.error(
    '\nExpected: A/B outputs should keep Element Plus as external imports, not bundled code.',
  );
  process.exit(1);
}

console.log(
  '[externals-check] OK: No bundled Element Plus signatures found in dist/a and dist/b reachable chunks.',
);
