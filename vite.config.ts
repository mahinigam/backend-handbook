/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    test: {
      environment: 'jsdom',
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify: file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('@google/genai')) return 'vendor-genai';
            if (id.includes('node_modules')) return 'vendor';
            if (id.includes('/src/data/volume1_python')) return 'data-volume-1-python';
            if (id.includes('/src/data/volume2_architecture')) return 'data-volume-2-architecture';
            if (id.includes('/src/data/volume3_fastapi')) return 'data-volume-3-fastapi';
            if (id.includes('/src/data/volume4_databases')) return 'data-volume-4-databases';
            if (id.includes('/src/data/volume5_devops')) return 'data-volume-5-devops';
            if (id.includes('/src/data/volume6_distributed')) return 'data-volume-6-distributed';
            if (id.includes('/src/data/volume7_projects')) return 'data-volume-7-projects';
            if (id.includes('/src/data/volume8_interviews')) return 'data-volume-8-interviews';
            if (id.includes('/src/data/volume9_roadmap')) return 'data-volume-9-roadmap';
            if (id.includes('/src/data/production_matrix')) return 'data-production-matrix';
          },
        },
      },
    },
  };
});
