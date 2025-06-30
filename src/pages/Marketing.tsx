
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseRow from '../components/CourseRow';
import { marketingCourses } from '../data/courses';
import { TrendingUp, Target, BarChart } from 'lucide-react';

const Marketing = () => {
  const featuredCourses = marketingCourses.slice(0, 3);
  const digitalCourses = marketingCourses.slice(0, 4);
  const analyticsCourses = marketingCourses.slice(2, 6);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden mt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Marketing <span className="text-blue-500">Digital</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estratégias e táticas para crescer seu negócio no mundo digital. 
            Aprenda com quem realmente faz acontecer.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Growth Marketing</h3>
              <p className="text-gray-400">Estratégias de crescimento acelerado</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ads & Performance</h3>
              <p className="text-gray-400">Google Ads, Facebook Ads e otimização</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
              <p className="text-gray-400">Métricas, conversão e análise de dados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Sections */}
      <div className="py-8 space-y-12">
        <CourseRow title="🚀 Em Alta" courses={featuredCourses} />
        <CourseRow title="📱 Marketing Digital" courses={digitalCourses} />
        <CourseRow title="📊 Analytics & Dados" courses={analyticsCourses} />
      </div>

      <Footer />
    </div>
  );
};

export default Marketing;
