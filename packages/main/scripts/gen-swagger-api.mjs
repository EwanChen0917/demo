import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { generateApi } from 'swagger-typescript-api';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_CONFIG_PATH = path.resolve(__dirname, '../swagger.config.mjs');

const NON_GENERATE_KEYS = new Set(['mass', 'retry', 'fetch', 'name']);

function parseArgv(argv) {
  const configFlagIndex = argv.indexOf('--config');
  if (configFlagIndex >= 0 && argv[configFlagIndex + 1]) {
    return {
      configPath: path.resolve(process.cwd(), argv[configFlagIndex + 1]),
    };
  }

  return {
    configPath: DEFAULT_CONFIG_PATH,
  };
}

function pickGenerateApiParams(source) {
  const target = {};
  for (const [key, value] of Object.entries(source ?? {})) {
    if (!NON_GENERATE_KEYS.has(key)) {
      target[key] = value;
    }
  }
  return target;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(task, retry, label) {
  const retries = Math.max(0, Number(retry?.retries ?? 0));
  const delayMs = Math.max(0, Number(retry?.delayMs ?? 500));

  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        console.warn(
          `[gen:api] ${label} failed at attempt ${attempt + 1}, retrying in ${delayMs}ms`,
        );
        await sleep(delayMs);
      }
    }
  }

  throw lastError;
}

async function loadConfig(configPath) {
  const configUrl = pathToFileURL(configPath).href;
  const loaded = await import(configUrl);
  const config = loaded.default ?? loaded.config;

  if (!config || typeof config !== 'object') {
    throw new Error(`[gen:api] Invalid config in ${configPath}`);
  }

  return config;
}

async function fetchSpec(url, headers = {}) {
  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`[gen:api] Request failed (${response.status}) for ${url}`);
  }

  return response.json();
}

function resolveMassItems(config) {
  if (Array.isArray(config.mass)) {
    return config.mass;
  }

  if (config.url || config.spec) {
    return [config];
  }

  return [];
}

async function collectGeneratedTsFiles(targetPath) {
  const stat = await fs.stat(targetPath);
  if (stat.isFile()) {
    return targetPath.endsWith('.ts') ? [targetPath] : [];
  }

  const entries = await fs.readdir(targetPath, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map((entry) => collectGeneratedTsFiles(path.join(targetPath, entry.name))),
  );

  return nestedFiles.flat();
}

async function normalizeGeneratedOutput(outputPath) {
  if (!outputPath) {
    return;
  }

  const tsFiles = await collectGeneratedTsFiles(outputPath);
  await Promise.all(
    tsFiles.map(async (filePath) => {
      const content = await fs.readFile(filePath, 'utf8');
      const tempPath = `${filePath}.tmp`;
      await fs.writeFile(tempPath, content, 'utf8');
      await fs.rename(tempPath, filePath);
    }),
  );
}

async function createGeneratedIndexFile(outputPath) {
  if (!outputPath) {
    return;
  }

  // wrapperApi 相对路径固定为 '../wrapperApi'（假设 outputPath 均位于 src/api/<ns> 层级）
  const indexPath = path.join(outputPath, 'index.ts');
  const indexContent = `export * from './Api';
export { Api as ApiRouteTypes } from './ApiRoute';
export * from './data-contracts';
export * from './http-client';

import { Api } from './Api';
import { wrapperApi } from '../wrapperApi';

export const api = wrapperApi<InstanceType<typeof Api>>(Api);
`;

  const tempPath = `${indexPath}.tmp`;
  await fs.writeFile(tempPath, indexContent, 'utf8');
  await fs.rename(tempPath, indexPath);
}

async function runOne(item, inheritedOptions, index) {
  const label = item?.name ?? item?.url ?? `item-${index + 1}`;
  const retry = item?.retry ?? inheritedOptions.retry;
  const headers = {
    ...(inheritedOptions.fetch?.headers ?? {}),
    ...(item?.fetch?.headers ?? {}),
  };

  const spec =
    item.spec ??
    (item.url ? await withRetry(() => fetchSpec(item.url, headers), retry, label) : null);

  if (!spec) {
    throw new Error(`[gen:api] ${label} missing both spec and url`);
  }

  const params = {
    ...pickGenerateApiParams(inheritedOptions),
    ...pickGenerateApiParams(item),
    spec,
  };

  await withRetry(() => generateApi(params), retry, label);
  await normalizeGeneratedOutput(params.output);
  await createGeneratedIndexFile(params.output);

  return {
    status: 'fulfilled',
    label,
  };
}

async function main() {
  const { configPath } = parseArgv(process.argv.slice(2));
  const config = await loadConfig(configPath);
  const items = resolveMassItems(config);
  if (items.length === 0) {
    console.warn('[gen:api] No task found. Configure `mass` or root `url/spec` first.');
    return;
  }

  console.log(`[gen:api] Using config: ${configPath}`);
  console.log(`[gen:api] Total tasks: ${items.length}`);

  const inheritedOptions = {
    ...config,
  };

  const results = await Promise.allSettled(
    items.map((item, index) => runOne(item, inheritedOptions, index)),
  );

  const summary = results.reduce(
    (acc, result) => {
      acc[result.status] += 1;
      return acc;
    },
    { fulfilled: 0, rejected: 0 },
  );

  console.log(`[gen:api] Summary: ${JSON.stringify(summary)}`);

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      const item = items[index] ?? {};
      const label = item.name ?? item.url ?? `item-${index + 1}`;
      console.error(`[gen:api] Failed: ${label}`);
      console.error(result.reason);
    }
  });

  if (summary.rejected > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('[gen:api] Unexpected error');
  console.error(error);
  process.exitCode = 1;
});
