
import React, { useEffect } from 'react';

const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Verificar se está no ambiente do navegador
    if (typeof window === 'undefined') return;

    console.log('PWA: Inicializando PWA Provider');

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          console.log('PWA: Registrando Service Worker...');
          const registration = await navigator.serviceWorker.register('/sw.js');
          
          console.log('PWA: Service Worker registrado com sucesso:', registration);
          
          // Verificar se há atualizações
          registration.addEventListener('updatefound', () => {
            console.log('SW: Nova versão disponível');
            const newWorker = registration.installing;
            
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('SW: Nova versão instalada, aguardando ativação');
                }
              });
            }
          });

          // Verificar se o SW está controlando a página
          if (registration.active) {
            console.log('PWA: Service Worker está ativo');
          }

          // Listener para quando o SW assumir controle
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('PWA: Service Worker assumiu controle');
          });

        } catch (error) {
          console.error('PWA: Falha no registro do Service Worker:', error);
        }
      };

      if (document.readyState === 'loading') {
        window.addEventListener('load', registerSW);
      } else {
        registerSW();
      }
    } else {
      console.warn('PWA: Service Workers não são suportados neste navegador');
    }

    // Detectar se é PWA instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      console.log('PWA: App está rodando como PWA instalado');
      document.documentElement.classList.add('pwa-installed');
    } else {
      console.log('PWA: App está rodando no navegador');
    }

    // Verificar critérios de PWA
    const checkPWACriteria = () => {
      const criteria = {
        manifest: document.querySelector('link[rel="manifest"]') !== null,
        serviceWorker: 'serviceWorker' in navigator,
        https: location.protocol === 'https:' || location.hostname === 'localhost',
        icons: true, // Assumindo que temos ícones no manifest
      };
      
      console.log('PWA: Critérios de PWA:', criteria);
      
      const allCriteriaMet = Object.values(criteria).every(Boolean);
      console.log('PWA: Todos os critérios atendidos:', allCriteriaMet);
    };

    checkPWACriteria();

    // Listener para mudanças no display mode
    const displayModeQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      console.log('PWA: Display mode mudou para:', e.matches ? 'standalone' : 'browser');
      if (e.matches) {
        document.documentElement.classList.add('pwa-installed');
      } else {
        document.documentElement.classList.remove('pwa-installed');
      }
    };

    displayModeQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      displayModeQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  return <>{children}</>;
};

export default PWAProvider;
