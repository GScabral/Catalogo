// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces
    port: 3005,     // El puerto en el que tu aplicación está sirviendo (coincide con el log)
  },
});