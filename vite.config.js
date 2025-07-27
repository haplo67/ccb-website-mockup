// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Configuration SCSS
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/base/_variables.scss";`
      }
    }
  },
  
  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true,
    host: true, // Permet l'accès depuis le réseau local
    cors: true
  },
  
  // Configuration de la construction
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          // Séparer les dépendances tierces
          vendor: ['leaflet'],
          // Séparer les utilitaires
          utils: ['src/utils/api.js', 'src/utils/dateUtils.js', 'src/utils/domUtils.js']
        }
      }
    },
    // Optimisation
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Retirer les console.log en production
        drop_debugger: true
      }
    }
  },
  
  // Configuration des alias
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@data': resolve(__dirname, 'src/data')
    }
  },
  
  // Variables d'environnement
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  },
  
  // Configuration du préchargement
  optimizeDeps: {
    include: ['leaflet']
  },
  
  // Configuration pour GitHub Pages (si déployé là)
  base: process.env.NODE_ENV === 'production' ? '/ccb-website/' : '/'
})