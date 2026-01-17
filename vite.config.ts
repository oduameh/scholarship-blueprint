import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync } from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'copy-ads-txt',
          closeBundle() {
            // Ensure ads.txt is in the dist folder after build
            const distDir = path.resolve(__dirname, 'dist');
            if (!existsSync(distDir)) {
              mkdirSync(distDir, { recursive: true });
            }
            // Copy from public folder
            const publicAds = path.resolve(__dirname, 'public', 'ads.txt');
            const distAds = path.resolve(distDir, 'ads.txt');
            if (existsSync(publicAds)) {
              copyFileSync(publicAds, distAds);
              console.log('✓ ads.txt copied to dist/');
            }
            // Copy robots.txt
            const publicRobots = path.resolve(__dirname, 'public', 'robots.txt');
            const distRobots = path.resolve(distDir, 'robots.txt');
            if (existsSync(publicRobots)) {
              copyFileSync(publicRobots, distRobots);
              console.log('✓ robots.txt copied to dist/');
            }
          }
        }
      ],
      publicDir: 'public',
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        copyPublicDir: true
      }
    };
});
