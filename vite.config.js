// vite.config.js
import { defineConfig } from 'vite';
import reactSWC from '@vitejs/plugin-react-swc'; // O el plugin de React que estés usando

export default defineConfig({
  plugins: [reactSWC()], // O tus otros plugins
  server: {
    host: '0.0.0.0', // Asegúrate de tener esto para el despliegue
    port: 3005,     // El puerto que estés usando
    allowedHosts: ['amore-mio.onrender.com'], // Añade tu dominio de Render aquí
  },
});