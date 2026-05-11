import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Step 1: Import the path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Step 2: Define the '@' alias to point to the 'src' folder
      '@': path.resolve(__dirname, './src'),
    },
  },
});