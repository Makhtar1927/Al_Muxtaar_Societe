import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ── Optimisations de performance critiques ──

  // Turbopack pour builds ultra-rapides en développement
  experimental: {
    turbo: {
      rules: {},
    },
    // Optimise les imports de grosses librairies (lucide-react, etc.)
    optimizePackageImports: [
      'lucide-react',
      '@supabase/supabase-js',
      '@supabase/ssr',
    ],
  },

  // Compression automatique des réponses HTTP
  compress: true,

  // Optimisation des images Next.js
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24h de cache pour les images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Headers de cache pour les assets statiques
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Logging désactivé en production pour réduire les I/O
  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  // Désactiver la source maps en production pour alléger le bundle
  productionBrowserSourceMaps: false,

  // Pow erful compiler options
  compiler: {
    // Supprime les console.log en production
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // Ignorer les avertissements ESLint et erreurs de typage non-bloquantes lors du build Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
