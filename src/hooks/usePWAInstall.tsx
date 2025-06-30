
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallState {
  isInstallable: boolean;
  isInstalled: boolean;
  isSupported: boolean;
  deferredPrompt: BeforeInstallPromptEvent | null;
  canInstall: boolean;
  installError: string | null;
}

export const usePWAInstall = () => {
  const [state, setState] = useState<PWAInstallState>({
    isInstallable: false,
    isInstalled: false,
    isSupported: false,
    deferredPrompt: null,
    canInstall: false,
    installError: null,
  });

  useEffect(() => {
    // Verificar se está no ambiente do navegador
    if (typeof window === 'undefined') return;

    // Verificar se já está instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    const isInstalled = isStandalone || isInWebAppiOS;

    // Verificar suporte básico a PWA
    const isSupported = 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;

    setState(prev => ({
      ...prev,
      isInstalled,
      isSupported,
      canInstall: isSupported && !isInstalled,
    }));

    if (isInstalled) {
      console.log('PWA: App já está instalado');
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const event = e as BeforeInstallPromptEvent;
      
      console.log('PWA: Evento beforeinstallprompt recebido');
      
      setState(prev => ({
        ...prev,
        deferredPrompt: event,
        isInstallable: true,
        canInstall: true,
        installError: null,
      }));
    };

    const handleAppInstalled = () => {
      console.log('PWA: App foi instalado com sucesso');
      setState(prev => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
        deferredPrompt: null,
        canInstall: false,
      }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async (): Promise<boolean> => {
    if (!state.deferredPrompt) {
      console.log('PWA: Prompt de instalação não disponível');
      setState(prev => ({
        ...prev,
        installError: 'Prompt de instalação não disponível. Tente instalar manualmente através do menu do navegador.',
      }));
      return false;
    }

    try {
      console.log('PWA: Iniciando instalação...');
      await state.deferredPrompt.prompt();
      const { outcome } = await state.deferredPrompt.userChoice;
      
      console.log('PWA: Resultado da instalação:', outcome);
      
      if (outcome === 'accepted') {
        setState(prev => ({
          ...prev,
          isInstalled: true,
          isInstallable: false,
          deferredPrompt: null,
          canInstall: false,
          installError: null,
        }));
        return true;
      } else {
        setState(prev => ({
          ...prev,
          installError: 'Instalação cancelada pelo usuário.',
        }));
        return false;
      }
    } catch (error) {
      console.error('PWA: Erro durante instalação:', error);
      setState(prev => ({
        ...prev,
        installError: 'Erro durante a instalação. Tente novamente.',
      }));
      return false;
    }
  };

  const getBrowserInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
      return {
        browser: 'Chrome',
        instructions: 'No menu (⋮) → "Instalar aplicativo" ou "Adicionar à tela inicial"',
      };
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      return {
        browser: 'Safari',
        instructions: 'Toque no ícone de compartilhamento → "Adicionar à Tela de Início"',
      };
    } else if (userAgent.includes('firefox')) {
      return {
        browser: 'Firefox',
        instructions: 'No menu → "Instalar" ou "Adicionar à tela inicial"',
      };
    } else if (userAgent.includes('edg')) {
      return {
        browser: 'Edge',
        instructions: 'No menu (⋯) → "Aplicativos" → "Instalar este site como aplicativo"',
      };
    }
    
    return {
      browser: 'Navegador',
      instructions: 'Procure pela opção "Instalar aplicativo" ou "Adicionar à tela inicial" no menu do navegador',
    };
  };

  const clearError = () => {
    setState(prev => ({ ...prev, installError: null }));
  };

  return {
    ...state,
    install,
    getBrowserInstructions,
    clearError,
  };
};
