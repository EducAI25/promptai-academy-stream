
import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, Share } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Detectar se já está instalado (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone === true ||
                      document.referrer.includes('android-app://');
    setIsStandalone(standalone);

    console.log('PWA Status:', { iOS, standalone });

    // Escutar evento beforeinstallprompt (Chrome/Edge/Samsung)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
      
      // Mostrar prompt após 5 segundos se não estiver instalado
      setTimeout(() => {
        if (!standalone) {
          setShowInstallPrompt(true);
        }
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Para iOS, mostrar instruções após 10 segundos
    if (iOS && !standalone) {
      setTimeout(() => {
        setCanInstall(true);
        setShowInstallPrompt(true);
      }, 10000);
    }

    // Para outros navegadores que suportam PWA mas não disparam o evento
    setTimeout(() => {
      if (!deferredPrompt && !iOS && !standalone && 'serviceWorker' in navigator) {
        setCanInstall(true);
        setShowInstallPrompt(true);
      }
    }, 15000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      console.log('Prompting for installation...');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log('User choice:', outcome);
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } else {
      // Fallback para navegadores que não suportam o prompt automático
      alert('Para instalar o app:\n\n1. Clique no menu do navegador (⋮)\n2. Selecione "Instalar app" ou "Adicionar à tela inicial"\n3. Confirme a instalação');
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Não mostrar novamente por 24 horas
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Verificar se foi dismissado recentemente
  const dismissedTime = localStorage.getItem('pwa-install-dismissed');
  const recentlyDismissed = dismissedTime && Date.now() - parseInt(dismissedTime) < 24 * 60 * 60 * 1000;

  // Não mostrar se já está instalado, foi dismissado recentemente ou não pode instalar
  if (isStandalone || recentlyDismissed || !showInstallPrompt || !canInstall) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 p-4 animate-slide-up">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-semibold">Instalar App</h3>
            <p className="text-gray-400 text-sm">PromptAI Academy</p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-300 text-sm mb-4">
        {isIOS 
          ? 'Adicione à tela inicial para acesso rápido e experiência nativa!'
          : 'Instale nosso app para acesso rápido, notificações e uso offline!'
        }
      </p>

      {isIOS ? (
        <div className="text-xs text-gray-400 space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <Share className="w-4 h-4" />
            <span>1. Toque no ícone de compartilhar</span>
          </div>
          <p className="ml-6">2. Selecione "Adicionar à Tela de Início"</p>
          <p className="ml-6">3. Toque em "Adicionar"</p>
        </div>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Instalar Agora
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm border border-gray-600 rounded-lg"
          >
            Depois
          </button>
        </div>
      )}
    </div>
  );
};

export default PWAInstallPrompt;
