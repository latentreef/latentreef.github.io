import { defineConfig } from 'vite';

export default defineConfig({
  // Use './' so the build works on GitHub Pages / any sub-folder host.
  base: './',
  server: { port: 5173, open: true },
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});
