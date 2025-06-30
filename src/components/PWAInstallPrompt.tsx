
import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [manualDismissed, setManualDismissed] = useState(false);

  useEffect(() => {
    // Verificar se localStorage está disponível
    const checkLocalStorage = () => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return localStorage.getItem('pwa-manual-dismissed') === 'true';
        }
        return false;
      } catch (error) {
        console.log('PWA: localStorage não disponível');
        return false;
      }
    };

    setManualDismissed(checkLocalStorage());

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
      setShowPrompt(true);
    };

    // Verificar se já está instalado
    const isStandalone = typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = typeof window !== 'undefined' && (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      return;
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      }
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      setShowPrompt(false);
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('PWA: Erro na instalação:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('pwa-dismissed', Date.now().toString());
      }
    } catch (error) {
      console.log('PWA: Erro ao salvar dismissal');
    }
  };

  const handleManualInstall = async () => {
    if (!deferredPrompt) {
      alert('O prompt de instalação não está disponível neste momento.');
      return;
    }
    await handleInstall();
  };

  const handleManualDismiss = () => {
    setManualDismissed(true);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('pwa-manual-dismissed', 'true');
      }
    } catch (error) {
      console.log('PWA: Erro ao salvar manual dismissal');
    }
  };

  return (
    <>
      {!manualDismissed && (
        <div className="fixed bottom-4 left-4 z-50 flex gap-2">
          <button
            onClick={handleManualInstall}
            className="bg-red-600 text-white px-4 py-2 rounded shadow-lg hover:bg-red-700 transition-all"
          >
            Instalar App
          </button>
          <button
            onClick={handleManualDismiss}
            className="bg-gray-400 text-white px-4 py-2 rounded shadow-lg hover:bg-gray-500 transition-all"
          >
            Depois
          </button>
        </div>
      )}
      
      {(showPrompt && isInstallable) && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white rounded-lg shadow-xl p-4 max-w-sm z-50 animate-slide-up border border-red-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg">📱 Instalar App</h3>
            <button 
              onClick={handleDismiss} 
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm mb-4 text-white/90">
            Instale nossa plataforma para acesso rápido e offline!
          </p>
          <button
            onClick={handleInstall}
            className="w-full bg-white text-red-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-200 shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Instalar Agora
          </button>
        </div>
      )}
    </>
  );
};

export default PWAInstallPrompt;
