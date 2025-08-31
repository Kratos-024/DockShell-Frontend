import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'build', // <-- make Vite build to "build" instead of "dist"
    chunkSizeWarningLimit: 2000, // optional: adjust warning
  },
});
