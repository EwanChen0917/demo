import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createSubPackageViteConfig } from './vite.config.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default createSubPackageViteConfig('shared', __dirname, {
  generateDts: true,
});
