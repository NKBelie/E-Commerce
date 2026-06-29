import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      '/products': {
        target: 'https://e-comus-api.vercel.app',
        changeOrigin: true,
      },
      '/categories': {
        target: 'https://e-comus-api.vercel.app',
        changeOrigin: true,
      },
      '/cart': {
        target: 'https://e-comus-api.vercel.app',
        changeOrigin: true,
      },
      '/orders': {
        target: 'https://e-comus-api.vercel.app',
        changeOrigin: true,
      }
    }
  }
})
