
import React, { useState } from 'react';
import { Play, Info, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const HeroSection = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email capturado:', email);
    setEmail('');
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Updated to subtle code background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50"></div>
      </div>

      {/* Content - Reorganized layout */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Domine a
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Inteligência Artificial
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Os cursos mais completos e atualizados sobre IA, programação e tecnologia. 
            Aprenda com os melhores especialistas e transforme sua carreira.
          </p>

          {/* Email Capture Form - More integrated */}
          <div className="mb-8">
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Digite seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background/80 border-border text-white placeholder:text-muted-foreground h-14 text-base rounded-lg"
                required
              />
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 px-10 whitespace-nowrap rounded-lg"
              >
                Começar Agora
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </div>

          {/* Action Buttons - Repositioned */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
              <Play className="w-6 h-6 mr-3 fill-black" />
              Assistir Demo
            </button>
            
            <button className="flex items-center justify-center px-8 py-4 bg-card/50 text-white font-bold rounded-lg hover:bg-card/70 transition-all duration-300 backdrop-blur-sm border border-border">
              <Info className="w-6 h-6 mr-3" />
              Mais Informações
            </button>
          </div>

          {/* Gradient Effect Below Buttons */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-xl h-8 transform translate-y-2"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent blur-2xl h-12 transform translate-y-1"></div>
          </div>

          <p className="text-muted-foreground text-sm">
            Teste grátis por 7 dias. Cancele quando quiser.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
