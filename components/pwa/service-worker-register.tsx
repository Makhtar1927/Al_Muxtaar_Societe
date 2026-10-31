'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Al Muxtaar Service Worker enregistré avec succès:', registration.scope);
          })
          .catch((err) => {
            console.log('Échec enregistrement Service Worker:', err);
          });
      });
    }
  }, []);

  return null;
}

