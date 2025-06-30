
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

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('PWA: beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
      
      // Mostrar prompt após 2 segundos
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-dismissed');
        const recentlyDismissed = dismissed && Date.now() - parseInt(dismissed) < 24 * 60 * 60 * 1000;
        
        if (!recentlyDismissed) {
          setShowPrompt(true);
        }
      }, 2000);
    };

    // Verificar se já está instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      console.log('PWA: App já está instalado');
      return;
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    console.log('PWA: Tentando instalar...');
    
    if (!deferredPrompt) {
      console.log('PWA: Prompt não disponível');
      return;
    }
    
    try {
      // Instalar diretamente
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log('PWA: Resultado da instalação:', outcome);
      
      // Esconder o prompt
      setShowPrompt(false);
      setDeferredPrompt(null);
      setIsInstallable(false);
      
    } catch (error) {
      console.error('PWA: Erro na instalação:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-dismissed', Date.now().toString());
  };

  // Não mostrar se não for instalável ou se já foi dispensado
  if (!showPrompt || !isInstallable) {
    return null;
  }

  return (
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
  );
};

export default PWAInstallPrompt;
