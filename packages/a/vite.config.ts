import { defineConfig } from 'vite';
import { createSubPackageViteConfig } from '../shared/vite.config.ts';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(createSubPackageViteConfig('a', __dirname));
