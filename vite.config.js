import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}

const alias = {
  '@': pathResolve('src')
}

export default ({ command }) => {
  return {
    base: './',
    resolve: {
      alias
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {}
        }
      }
    },
    plugins: [vue()]
  }
}
