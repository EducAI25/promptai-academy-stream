
import React, { useState } from 'react';
import { X, Download, Settings } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import PWAManualInstallInstructions from './PWAManualInstallInstructions';
import { useToast } from '../hooks/use-toast';

const PWAInstallPrompt = () => {
  const [showManualInstructions, setShowManualInstructions] = useState(false);
  const [showAutoPrompt, setShowAutoPrompt] = useState(true);
  const [manualDismissed, setManualDismissed] = useState(() => {
    try {
      return localStorage.getItem('pwa-manual-dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const { toast } = useToast();
  const {
    isInstallable,
    isInstalled,
    isSupported,
    canInstall,
    installError,
    install,
    getBrowserInstructions,
    clearError,
  } = usePWAInstall();

  const handleInstall = async () => {
    const success = await install();
    
    if (success) {
      toast({
        title: "✅ App Instalado!",
        description: "O PromptAI Academy foi instalado com sucesso!",
      });
      setShowAutoPrompt(false);
    } else if (installError) {
      toast({
        title: "❌ Erro na Instalação",
        description: installError,
        variant: "destructive",
      });
      
      // Se o prompt automático não funcionou, mostrar instruções manuais
      if (installError.includes('não disponível')) {
        setShowManualInstructions(true);
      }
    }
  };

  const handleManualInstall = () => {
    if (isInstalled) {
      toast({
        title: "✅ App Já Instalado",
        description: "O PromptAI Academy já está instalado no seu dispositivo!",
      });
      return;
    }

    if (!isSupported) {
      toast({
        title: "❌ Não Suportado",
        description: "Seu navegador não suporta a instalação de PWAs.",
        variant: "destructive",
      });
      return;
    }

    if (isInstallable) {
      handleInstall();
    } else {
      setShowManualInstructions(true);
    }
  };

  const handleManualDismiss = () => {
    setManualDismissed(true);
    try {
      localStorage.setItem('pwa-manual-dismissed', 'true');
    } catch (error) {
      console.log('PWA: Erro ao salvar dismissal:', error);
    }
  };

  const handleDismissAutoPrompt = () => {
    setShowAutoPrompt(false);
    try {
      localStorage.setItem('pwa-dismissed', Date.now().toString());
    } catch (error) {
      console.log('PWA: Erro ao salvar dismissal:', error);
    }
  };

  // Clear error when component mounts
  React.useEffect(() => {
    if (installError) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [installError, clearError]);

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Botão fixo para instalação manual */}
      {!manualDismissed && canInstall && (
        <div className="fixed bottom-4 left-4 z-50 flex gap-2">
          <button
            onClick={handleManualInstall}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
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
      
      {/* Prompt automático quando o navegador permite */}
      {(showAutoPrompt && isInstallable) && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-lg shadow-xl p-4 max-w-sm z-50 animate-slide-up border border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg">📱 Instalar App</h3>
            <button 
              onClick={handleDismissAutoPrompt} 
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm mb-4 text-white/90">
            Instale nossa plataforma para acesso rápido e offline!
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="flex-1 bg-white text-blue-600 font-bold py-2 px-3 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-200 shadow-lg text-sm"
            >
              <Download className="w-4 h-4 mr-1" />
              Instalar
            </button>
            <button
              onClick={() => setShowManualInstructions(true)}
              className="bg-blue-700 text-white py-2 px-3 rounded-lg hover:bg-blue-800 transition-all duration-200 flex items-center justify-center"
              title="Instruções manuais"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal de instruções manuais */}
      {showManualInstructions && (
        <PWAManualInstallInstructions
          onClose={() => setShowManualInstructions(false)}
          browserInstructions={getBrowserInstructions()}
        />
      )}
    </>
  );
};

export default PWAInstallPrompt;
