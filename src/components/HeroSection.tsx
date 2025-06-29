
import React from 'react';
import { Play, Info } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Domine a
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              Inteligência Artificial
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Os cursos mais completos e atualizados sobre IA, programação e tecnologia. 
            Aprenda com os melhores especialistas e transforme sua carreira.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
              <Play className="w-6 h-6 mr-3 fill-black" />
              Começar Agora
            </button>
            
            <button className="flex items-center justify-center px-8 py-4 bg-gray-600/70 text-white font-bold rounded hover:bg-gray-600/90 transition-all duration-300 backdrop-blur-sm">
              <Info className="w-6 h-6 mr-3" />
              Mais Informações
            </button>
          </div>
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
