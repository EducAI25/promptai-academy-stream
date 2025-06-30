
import React, { useEffect } from 'react';

const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Configurar meta tags para PWA primeiro
    const setMetaTags = () => {
      // Theme color
      if (!document.querySelector('meta[name="theme-color"]')) {
        const themeColorMeta = document.createElement('meta');
        themeColorMeta.name = 'theme-color';
        themeColorMeta.content = '#dc2626';
        document.head.appendChild(themeColorMeta);
      }

      // Viewport
      if (!document.querySelector('meta[name="viewport"]')) {
        const viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewportMeta);
      }

      // Apple specific
      if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
        const appleCapableMeta = document.createElement('meta');
        appleCapableMeta.name = 'apple-mobile-web-app-capable';
        appleCapableMeta.content = 'yes';
        document.head.appendChild(appleCapableMeta);
      }

      if (!document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')) {
        const appleStatusMeta = document.createElement('meta');
        appleStatusMeta.name = 'apple-mobile-web-app-status-bar-style';
        appleStatusMeta.content = 'black-translucent';
        document.head.appendChild(appleStatusMeta);
      }

      if (!document.querySelector('meta[name="apple-mobile-web-app-title"]')) {
        const appleTitleMeta = document.createElement('meta');
        appleTitleMeta.name = 'apple-mobile-web-app-title';
        appleTitleMeta.content = 'PromptAI Academy';
        document.head.appendChild(appleTitleMeta);
      }

      // Apple touch icon
      if (!document.querySelector('link[rel="apple-touch-icon"]')) {
        const appleTouchIcon = document.createElement('link');
        appleTouchIcon.rel = 'apple-touch-icon';
        appleTouchIcon.href = '/apple-touch-icon.png';
        document.head.appendChild(appleTouchIcon);
      }

      // Manifest
      if (!document.querySelector('link[rel="manifest"]')) {
        const manifestLink = document.createElement('link');
        manifestLink.rel = 'manifest';
        manifestLink.href = '/manifest.json';
        document.head.appendChild(manifestLink);
      }

      // Favicon
      if (!document.querySelector('link[rel="icon"]')) {
        const faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.href = '/icon-192x192.png';
        faviconLink.type = 'image/png';
        document.head.appendChild(faviconLink);
      }
    };

    setMetaTags();

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered successfully:', registration.scope);
            
            // Verificar atualizações
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // Nova versão disponível
                    if (confirm('Nova versão disponível! Deseja atualizar?')) {
                      window.location.reload();
                    }
                  }
                });
              }
            });

            // Verificar se há updates
            registration.update();
          })
          .catch((registrationError) => {
            console.log('SW registration failed:', registrationError);
          });
      });
    }

    // Prevenir comportamentos padrão do mobile
    const preventDefault = (e: Event) => e.preventDefault();
    
    // Prevenir zoom em dispositivos móveis
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    let lastTouchEnd = 0;
    const preventDoubleTabZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Prevenir pull-to-refresh
    const preventPullToRefresh = (e: TouchEvent) => {
      const element = e.target as HTMLElement;
      if (window.scrollY === 0 && !element.closest('input, textarea, select')) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchend', preventDoubleTabZoom, { passive: false });
    document.addEventListener('touchmove', preventPullToRefresh, { passive: false });
    document.addEventListener('gesturestart', preventDefault, { passive: false });
    document.addEventListener('gesturechange', preventDefault, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchend', preventDoubleTabZoom);
      document.removeEventListener('touchmove', preventPullToRefresh);
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
    };
  }, []);

  return <>{children}</>;
};

export default PWAProvider;
