
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Play, Clock, Users, Star, BookOpen, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { aiCourses, programmingCourses, marketingCourses, dataScienceCourses, designCourses } from '../data/courses';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const allCourses = [
    ...aiCourses,
    ...programmingCourses,
    ...marketingCourses,
    ...dataScienceCourses,
    ...designCourses
  ];

  const course = allCourses.find(c => c.id === parseInt(id || '0'));

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Curso não encontrado</h1>
          <button 
            onClick={() => navigate('/cursos')}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Voltar aos Cursos
          </button>
        </div>
      </div>
    );
  }

  const modules = [
    {
      id: 1,
      title: "Introdução à Inteligência Artificial",
      duration: "2h 30min",
      lessons: [
        "O que é IA e Machine Learning",
        "História e evolução da IA",
        "Aplicações práticas no mercado",
        "Ferramentas essenciais"
      ]
    },
    {
      id: 2,
      title: "Fundamentos de Machine Learning",
      duration: "3h 15min",
      lessons: [
        "Tipos de aprendizado",
        "Algoritmos básicos",
        "Preparação de dados",
        "Primeira aplicação prática"
      ]
    },
    {
      id: 3,
      title: "Deep Learning e Redes Neurais",
      duration: "4h 20min",
      lessons: [
        "Redes neurais artificiais",
        "TensorFlow e PyTorch",
        "Redes convolucionais",
        "Projeto prático completo"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded">{course.category}</span>
                  <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded">{course.level}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{course.title}</h1>
                <p className="text-xl text-gray-300 mb-6">{course.description}</p>
                
                <div className="flex items-center gap-6 text-white mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{course.students} alunos</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex items-center px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors">
                    <Play className="w-5 h-5 mr-2 fill-black" />
                    Começar Curso
                  </button>
                  <button className="flex items-center px-8 py-3 bg-gray-700 text-white font-bold rounded hover:bg-gray-600 transition-colors">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Preview Gratuito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex border-b border-gray-800 mb-8">
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'curriculum', label: 'Conteúdo do Curso' },
              { id: 'instructor', label: 'Instrutor' },
              { id: 'reviews', label: 'Avaliações' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-blue-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-4">O que você vai aprender</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    "Fundamentos de Inteligência Artificial",
                    "Machine Learning na prática",
                    "Deep Learning e Redes Neurais",
                    "Ferramentas e tecnologias modernas",
                    "Projetos práticos reais",
                    "Aplicação no mercado de trabalho"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <Award className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">Requisitos</h2>
                <ul className="text-gray-300 space-y-2 mb-8">
                  <li>• Conhecimento básico de programação (Python recomendado)</li>
                  <li>• Matemática básica e estatística</li>
                  <li>• Computador com acesso à internet</li>
                  <li>• Vontade de aprender e praticar</li>
                </ul>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg h-fit">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">R$ 297</div>
                  <div className="text-gray-400 line-through">R$ 497</div>
                  <div className="text-green-500 font-semibold">40% de desconto</div>
                </div>
                
                <button className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors mb-4">
                  Comprar Curso
                </button>
                
                <div className="text-center text-gray-400 text-sm mb-4">
                  30 dias de garantia
                </div>
                
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-3" />
                    <span>Acesso vitalício</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 mr-3" />
                    <span>Certificado de conclusão</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3" />
                    <span>Suporte da comunidade</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-white mb-6">Conteúdo do Curso</h2>
              <div className="space-y-4">
                {modules.map((module) => (
                  <div key={module.id} className="border border-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                      className="w-full p-4 bg-gray-900 text-left flex items-center justify-between hover:bg-gray-800 transition-colors"
                    >
                      <div>
                        <h3 className="text-white font-semibold">{module.title}</h3>
                        <p className="text-gray-400 text-sm">{module.lessons.length} aulas • {module.duration}</p>
                      </div>
                      {expandedModule === module.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedModule === module.id && (
                      <div className="p-4 bg-black">
                        <div className="space-y-3">
                          {module.lessons.map((lesson, index) => (
                            <div key={index} className="flex items-center text-gray-300">
                              <Play className="w-4 h-4 mr-3 text-gray-500" />
                              <span>{lesson}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="max-w-4xl">
              <div className="flex items-start gap-6 mb-8">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
                  alt="Instrutor"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Dr. Carlos Silva</h2>
                  <p className="text-blue-400 font-semibold mb-2">Especialista em IA e Machine Learning</p>
                  <p className="text-gray-300 mb-4">
                    PhD em Ciência da Computação com mais de 15 anos de experiência em IA. 
                    Trabalhou em grandes empresas tech e atualmente lidera pesquisas em Deep Learning.
                  </p>
                  <div className="flex gap-6 text-gray-300">
                    <div>
                      <div className="font-bold text-white">50K+</div>
                      <div className="text-sm">Alunos</div>
                    </div>
                    <div>
                      <div className="font-bold text-white">4.9</div>
                      <div className="text-sm">Avaliação</div>
                    </div>
                    <div>
                      <div className="font-bold text-white">25</div>
                      <div className="text-sm">Cursos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-4xl">
              <div className="flex items-center gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">{course.rating}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-gray-400">Baseado em 1,234 avaliações</div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    name: "Maria Santos",
                    rating: 5,
                    comment: "Curso excepcional! Aprendi muito sobre IA de forma prática e aplicada.",
                    date: "2 semanas atrás"
                  },
                  {
                    name: "João Silva",
                    rating: 5,
                    comment: "O melhor investimento que fiz para minha carreira. Recomendo!",
                    date: "1 mês atrás"
                  },
                  {
                    name: "Ana Costa",
                    rating: 4,
                    comment: "Muito bom! Poderia ter mais exemplos práticos, mas o conteúdo é sólido.",
                    date: "2 meses atrás"
                  }
                ].map((review, index) => (
                  <div key={index} className="border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{review.name}</div>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm">{review.date}</div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
