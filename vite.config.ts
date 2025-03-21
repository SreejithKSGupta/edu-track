import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()], // Use the Angular plugin for Vite
  server: {
    port: 4200, // Default Angular dev server port
    strictPort: true, // Ensure the port is strictly used
  },
  build: {
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true, // Clear the output directory before building
  },
});