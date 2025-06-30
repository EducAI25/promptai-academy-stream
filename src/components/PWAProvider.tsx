
import React, { useEffect } from 'react';

const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered successfully:', registration.scope);
            
            // Verificar se há atualizações
            registration.addEventListener('updatefound', () => {
              console.log('SW: Nova versão disponível');
            });
          })
          .catch((error) => {
            console.error('SW registration failed:', error);
          });
      });
    } else {
      console.log('Service Worker não suportado');
    }

    // Detectar se é PWA instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      console.log('Executando como PWA instalado');
      document.documentElement.classList.add('pwa-installed');
    }
  }, []);

  return <>{children}</>;
};

export default PWAProvider;
