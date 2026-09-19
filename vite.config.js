import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => ({
  plugins: [vue()],

  base: command === 'build' ? '/Aurelia-Grand/' : '/',

  server: {
    port: 5173
  }
}))