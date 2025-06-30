
import React, { useEffect } from 'react';

const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Verificar se está no ambiente do navegador
    if (typeof window === 'undefined') return;

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          
          registration.addEventListener('updatefound', () => {
            console.log('SW: Nova versão disponível');
          });
        } catch (error) {
          console.error('SW registration failed:', error);
        }
      };

      if (document.readyState === 'loading') {
        window.addEventListener('load', registerSW);
      } else {
        registerSW();
      }
    }

    // Detectar se é PWA instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      document.documentElement.classList.add('pwa-installed');
    }
  }, []);

  return <>{children}</>;
};

export default PWAProvider;
