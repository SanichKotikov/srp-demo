import path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    solidPlugin(),
    checker({ typescript: true }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './src/client'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  css: {
    modules: {
      localsConvention: 'dashesOnly',
    },
  },
});
