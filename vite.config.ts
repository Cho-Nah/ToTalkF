import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'src/app'),

  plugins: [react()],

  esbuild: {
    legalComments: 'none',
  },

  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: path.resolve(__dirname, 'src/app/index.html')
    },
  }
})
