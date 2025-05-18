import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
const path = require('path');

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'src/app'),

  plugins: [react()],

  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: path.resolve(__dirname, 'src/app/index.html')
    },
  }
})
