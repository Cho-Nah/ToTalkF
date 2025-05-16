import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'src/app'),

  // Подключаем плагины (например, для React)
  plugins: [react()],

  // Настройка сборки
  build: {
    outDir: path.resolve(__dirname, 'dist'), // выходная папка
    rollupOptions: {
      input: path.resolve(__dirname, 'src/app/index.html'), // явно указываем входной HTML
    },
  }
})
