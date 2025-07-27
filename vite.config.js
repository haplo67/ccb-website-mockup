// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true
  },
  
  // Configuration pour GitHub Pages
  base: '/ccb-website-mockup/',
  
  // Configuration de la construction
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})