
import React from 'react';
import { X, Smartphone, Monitor } from 'lucide-react';

interface PWAManualInstallInstructionsProps {
  onClose: () => void;
  browserInstructions: {
    browser: string;
    instructions: string;
  };
}

const PWAManualInstallInstructions: React.FC<PWAManualInstallInstructionsProps> = ({
  onClose,
  browserInstructions,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">📱 Como Instalar o App</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-800">{browserInstructions.browser}</span>
            </div>
            <p className="text-sm text-red-700">{browserInstructions.instructions}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Instruções Gerais:
            </h4>
            
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-red-600 font-bold">1.</span>
                <span>Procure pelo ícone de "Instalar" na barra de endereços do navegador</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600 font-bold">2.</span>
                <span>Ou abra o menu do navegador (⋮ ou ⋯) e procure por "Instalar aplicativo"</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600 font-bold">3.</span>
                <span>No celular, procure por "Adicionar à tela inicial" no menu de compartilhamento</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3">
              ⚠️ Se as opções não aparecerem, seu navegador pode não suportar a instalação de PWAs ou o app já pode estar instalado.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAManualInstallInstructions;
