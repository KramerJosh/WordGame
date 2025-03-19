import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    //allowedHosts might be needed when I deploy.  commenting it out now, but this is what it looked like for an older project
    // allowedHosts: ["booksearch-r8i8.onrender.com"],
    host: "0.0.0.0",
    // this is my front end port
    port: 5173,
    open: true,
    // i only really have the one api call I need to access - so it's listed below
    proxy: {
      '/random-word': {
        target: 'http://localhost:5000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
