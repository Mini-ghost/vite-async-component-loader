import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AsyncComponentLoader from 'vite-async-component-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Vue(), AsyncComponentLoader()],
  build: {
    target: 'esnext',
  },
})
