
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Star, Users, BookOpen, Globe, Linkedin, Twitter, Github } from 'lucide-react';

interface Instructor {
  id: string;
  name: string;
  bio: string;
  expertise: string[];
  avatar_url: string;
  social_links: any;
  featured: boolean;
}

const Instructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .order('featured', { ascending: false });

    if (!error && data) {
      setInstructors(data);
    }
    setLoading(false);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-white text-xl">Carregando docentes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden mt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Nossos <span className="text-blue-500">Docentes Convidados</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Aprenda com os melhores profissionais da área. Especialistas com vasta experiência 
            prática e acadêmica para acelerar seu aprendizado.
          </p>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {instructors.filter(instructor => instructor.featured).length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Docentes em Destaque</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {instructors.filter(instructor => instructor.featured).map((instructor) => (
                  <div key={instructor.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={instructor.avatar_url || '/placeholder.svg'}
                          alt={instructor.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-white">{instructor.name}</h3>
                          <div className="flex items-center text-yellow-400 text-sm">
                            <Star className="w-4 h-4 fill-current mr-1" />
                            <span>Destaque</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{instructor.bio}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Especialidades:</h4>
                        <div className="flex flex-wrap gap-2">
                          {instructor.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {instructor.social_links && (
                        <div className="flex space-x-3">
                          {Object.entries(instructor.social_links).map(([platform, url]) => (
                            <a
                              key={platform}
                              href={url as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              {getSocialIcon(platform)}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <h2 className="text-3xl font-bold text-white mb-8 text-center">Todos os Docentes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
                <div className="p-6">
                  <div className="text-center mb-4">
                    <img
                      src={instructor.avatar_url || '/placeholder.svg'}
                      alt={instructor.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                    />
                    <h3 className="text-lg font-bold text-white">{instructor.name}</h3>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{instructor.bio}</p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {instructor.expertise.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {instructor.expertise.length > 3 && (
                        <span className="text-gray-400 text-xs">+{instructor.expertise.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      <span>Cursos</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Alunos</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Instructors;
