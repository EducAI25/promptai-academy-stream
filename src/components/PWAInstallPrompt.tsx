
import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Detectar se já está instalado (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Escutar evento beforeinstallprompt (Chrome/Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Mostrar prompt após 30 segundos
      setTimeout(() => {
        if (!standalone) {
          setShowInstallPrompt(true);
        }
      }, 30000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Para iOS, mostrar instruções após 30 segundos
    if (iOS && !standalone) {
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 30000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Não mostrar novamente por 24 horas
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Não mostrar se já está instalado ou se foi dismissado recentemente
  const dismissedTime = localStorage.getItem('pwa-install-dismissed');
  if (isStandalone || (dismissedTime && Date.now() - parseInt(dismissedTime) < 24 * 60 * 60 * 1000)) {
    return null;
  }

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Instalar App</h3>
            <p className="text-gray-400 text-sm">PromptAI Academy</p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-300 text-sm mb-4">
        {isIOS 
          ? 'Adicione à tela inicial para uma experiência melhor!'
          : 'Instale nosso app para acesso rápido e offline!'
        }
      </p>

      {isIOS ? (
        <div className="text-xs text-gray-400 space-y-2">
          <p>1. Toque no ícone de compartilhar</p>
          <p>2. Selecione "Adicionar à Tela de Início"</p>
          <p>3. Toque em "Adicionar"</p>
        </div>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Instalar
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            Agora não
          </button>
        </div>
      )}
    </div>
  );
};

export default PWAInstallPrompt;
