
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseRow from '../components/CourseRow';
import { programmingCourses } from '../data/courses';
import { Code, Database, Globe } from 'lucide-react';

const Programming = () => {
  const featuredCourses = programmingCourses.slice(0, 3);
  const webCourses = programmingCourses.slice(0, 4);
  const backendCourses = programmingCourses.slice(2, 6);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden mt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Programação & <span className="text-red-500">Desenvolvimento</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Do básico ao avançado. Aprenda as linguagens e tecnologias mais 
            demandadas pelo mercado de trabalho.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Frontend</h3>
              <p className="text-gray-400">React, Vue, Angular e tecnologias modernas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Backend</h3>
              <p className="text-gray-400">APIs, bancos de dados e arquitetura</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Full Stack</h3>
              <p className="text-gray-400">Desenvolvimento completo de aplicações</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Sections */}
      <div className="py-8 space-y-12">
        <CourseRow title="⭐ Mais Populares" courses={featuredCourses} />
        <CourseRow title="🌐 Desenvolvimento Web" courses={webCourses} />
        <CourseRow title="⚙️ Backend & APIs" courses={backendCourses} />
      </div>

      <Footer />
    </div>
  );
};

export default Programming;
