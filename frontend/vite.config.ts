import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'icon.svg'],
        manifest: {
          id: '/',
          name: 'Lunara - Menstrual & Wellbeing Sanctuary',
          short_name: 'Lunara',
          description: 'An empathetic, scholarly, and private sanctuary for cycle literacy, hormonal tracking, and mindful emotional restoration.',
          theme_color: '#fff8f5',
          background_color: '#fff8f5',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: 'https://lh3.googleusercontent.com/aida/AEtjO1WKe2tkw0kiNIVjQpf5hpa_2ysend5CynTfkbOdgqfZSDNnyBD5iSGIBKTbyWQ4sa1zqXr3zhYJ8NRwofhW-FMwp1lhLDqOGi0TKL_FDpj_SrMfLMgy5hBDyDAdZF_IUs-mrKm-edVs44MI-lyIe3G2HEjrwtpRdYQi85aEzdR1KYAxm7IFfPRt-5wrHhZjPBV4rQxxprFCPw-2-NAUhWW0-4_QrFrxxrjjduzeOTq0bg1BFilh3k6zjbQ',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'https://lh3.googleusercontent.com/aida/AEtjO1WKe2tkw0kiNIVjQpf5hpa_2ysend5CynTfkbOdgqfZSDNnyBD5iSGIBKTbyWQ4sa1zqXr3zhYJ8NRwofhW-FMwp1lhLDqOGi0TKL_FDpj_SrMfLMgy5hBDyDAdZF_IUs-mrKm-edVs44MI-lyIe3G2HEjrwtpRdYQi85aEzdR1KYAxm7IFfPRt-5wrHhZjPBV4rQxxprFCPw-2-NAUhWW0-4_QrFrxxrjjduzeOTq0bg1BFilh3k6zjbQ',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
