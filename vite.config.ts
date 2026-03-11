import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // CRITICAL: Only split node_modules — never touch app source files.
          // Splitting app components causes Rollup to alias default exports as
          // Component$1, Component$2 etc. which breaks runtime resolution.
          if (!id.includes('node_modules')) return undefined;

          if (
            id.includes('framer-motion') ||
            id.includes('motion-dom') ||
            id.includes('motion-utils')
          ) {
            return 'vendor-framer';
          }

          if (id.includes('lucide-react')) {
            return 'vendor-icons';
          }

          if (
            id.includes('react-router') ||
            id.includes('@remix-run') ||
            id.includes('react-dom') ||
            id.includes('/react/') ||
            id.includes('\\react\\') ||
            id.includes('scheduler')
          ) {
            return 'vendor-react';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    reportCompressedSize: false // Disable for faster builds
  }
})
