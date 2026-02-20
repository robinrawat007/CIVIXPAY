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
          if (!id.includes('node_modules')) return

          if (
            id.includes('framer-motion') ||
            id.includes('motion-dom') ||
            id.includes('motion-utils')
          ) {
            return 'vendor-framer'
          }

          if (id.includes('lucide-react')) {
            return 'vendor-icons'
          }

          if (
            id.includes('react-router') ||
            id.includes('@remix-run') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules\\react-dom\\') ||
            id.includes('node_modules/react/') ||
            id.includes('node_modules\\react\\') ||
            id.includes('react/jsx-runtime') ||
            id.includes('react/jsx-dev-runtime') ||
            id.includes('scheduler')
          ) {
            return 'vendor-react'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    reportCompressedSize: false // Disable for faster builds
  }
})
