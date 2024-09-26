import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// // vite.config.js
// export default {
//   server: {
//     host: '192.168.3.113',  // This allows the server to be accessible from external devices
//     port: 5173,       // The default port for Vite
//   }
// };

