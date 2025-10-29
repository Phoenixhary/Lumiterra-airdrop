import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Important: Add base to handle relative paths correctly on Vercel
export default defineConfig({
  plugins: [react()],
  base: './',
});
