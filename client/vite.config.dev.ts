import { defineConfig } from 'vite';
import { sharedConfig } from './vite.config';

export default defineConfig({
  ...sharedConfig,
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
