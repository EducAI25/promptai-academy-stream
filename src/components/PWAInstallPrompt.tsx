
import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Mostrar prompt após 3 segundos
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    // Instalar diretamente sem perguntas
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    // Esconder o prompt independente do resultado
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Não mostrar novamente por 1 dia
    localStorage.setItem('pwa-dismissed', Date.now().toString());
  };

  // Verificar se foi dispensado recentemente
  const dismissed = localStorage.getItem('pwa-dismissed');
  const recentlyDismissed = dismissed && Date.now() - parseInt(dismissed) < 24 * 60 * 60 * 1000;

  if (!showPrompt || !deferredPrompt || recentlyDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white rounded-lg shadow-lg p-4 max-w-sm z-50 animate-slide-up">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Instalar App</h3>
        <button onClick={handleDismiss} className="text-white/80 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-sm mb-3 text-white/90">
        Instale nossa plataforma para acesso rápido!
      </p>
      
      <button
        onClick={handleInstall}
        className="w-full bg-white text-red-600 font-medium py-2 px-4 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        <Download className="w-4 h-4 mr-2" />
        Instalar Agora
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
