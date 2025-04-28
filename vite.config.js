// vite.config.js
import { defineConfig } from 'vite';
import reactSWC from '@vitejs/plugin-react-swc';

export default defineConfig({
 plugins: [reactSWC()],
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces
    port: 3005,     // El puerto en el que tu aplicación está sirviendo (coincide con el log)
  },
});
