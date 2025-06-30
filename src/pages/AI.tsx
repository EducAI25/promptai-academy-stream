
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseRow from '../components/CourseRow';
import { aiCourses } from '../data/courses';
import { Brain, Cpu, Zap } from 'lucide-react';

const AI = () => {
  const featuredCourses = aiCourses.slice(0, 3);
  const beginnerCourses = aiCourses.slice(0, 4);
  const advancedCourses = aiCourses.slice(2, 6);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden mt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Inteligência <span className="text-blue-500">Artificial</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Domine as tecnologias que estão transformando o mundo. 
            Aprenda IA, Machine Learning e Deep Learning com os melhores especialistas.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Machine Learning</h3>
              <p className="text-gray-400">Algoritmos e técnicas para criar sistemas inteligentes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Deep Learning</h3>
              <p className="text-gray-400">Redes neurais profundas para problemas complexos</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">IA Aplicada</h3>
              <p className="text-gray-400">Projetos práticos para o mercado de trabalho</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Sections */}
      <div className="py-8 space-y-12">
        <CourseRow title="🔥 Cursos em Destaque" courses={featuredCourses} />
        <CourseRow title="🎯 Para Iniciantes" courses={beginnerCourses} />
        <CourseRow title="🚀 Nível Avançado" courses={advancedCourses} />
      </div>

      <Footer />
    </div>
  );
};

export default AI;
