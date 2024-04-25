// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['C:/Users/Virginia/OneDrive/Documentos/Proyecto Final/pinkpantherfront']
    }
  }
});
