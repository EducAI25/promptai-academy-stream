import React from 'react';
import { Tv, Download, Globe, UserCheck } from 'lucide-react';

const ReasonCards = () => {
  const reasons = [
    {
      icon: Tv,
      title: "Aprenda em Qualquer Dispositivo",
      description: "Assista aos cursos na sua TV, tablet, laptop ou celular. Conte com a flexibilidade para estudar onde quiser."
    },
    {
      icon: Download,
      title: "Download de Conteúdo Offline",
      description: "Baixe suas aulas e materiais para assistir offline. Estude mesmo sem conexão com a internet."
    },
    {
      icon: Globe,
      title: "Assista em Qualquer Lugar",
      description: "Acesse sua conta em qualquer dispositivo, em qualquer lugar do mundo. Seus progressos sempre sincronizados."
    },
    {
      icon: UserCheck,
      title: "Perfis Personalizados",
      description: "Crie perfis personalizados para diferentes níveis de conhecimento e acompanhe o progresso individual."
    }
  ];

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-12 text-center">
          Mais Razões para se Juntar à PromptAI Academy
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="group bg-card/30 border border-border rounded-lg p-8 hover:bg-card/50 transition-all duration-300 hover:scale-105"
            >
              <div className="mb-6">
                <reason.icon className="w-12 h-12 text-primary" />
              </div>
              
              <h3 className="text-white text-xl font-bold mb-4">
                {reason.title}
              </h3>
              
              <p className="text-muted-foreground text-base leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReasonCards;