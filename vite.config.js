import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      'genesis.js': path.resolve(__dirname, 'src/index.js'),
    },
  },
  // Ensure the dev server can handle JS files in the root correctly
  server: {
    fs: {
      strict: false,
    },
  },
});
