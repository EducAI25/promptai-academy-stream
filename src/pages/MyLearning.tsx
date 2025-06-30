
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Play, BookOpen, Award, Clock, CheckCircle, BarChart3 } from 'lucide-react';

const MyLearning = () => {
  const [activeTab, setActiveTab] = useState('progress');

  const enrolledCourses = [
    {
      id: 1,
      title: "IA Generativa com ChatGPT",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      lastWatched: "Prompts Avançados",
      timeSpent: "8h 30min"
    },
    {
      id: 2,
      title: "React Avançado",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      progress: 30,
      totalLessons: 18,
      completedLessons: 5,
      lastWatched: "Hooks Customizados",
      timeSpent: "4h 15min"
    },
    {
      id: 3,
      title: "Marketing com IA",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      progress: 90,
      totalLessons: 12,
      completedLessons: 11,
      lastWatched: "Automatização de Campanhas",
      timeSpent: "6h 45min"
    }
  ];

  const certificates = [
    {
      id: 1,
      title: "Fundamentos de IA",
      issueDate: "15 Nov 2024",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Python para Data Science",
      issueDate: "02 Nov 2024",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const stats = {
    totalCourses: 3,
    completedCourses: 2,
    totalHours: 19.5,
    certificates: 2
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Meu Aprendizado</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalCourses}</div>
              <div className="text-gray-400 text-sm">Cursos Ativos</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.completedCourses}</div>
              <div className="text-gray-400 text-sm">Concluídos</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.totalHours}h</div>
              <div className="text-gray-400 text-sm">Total Estudado</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stats.certificates}</div>
              <div className="text-gray-400 text-sm">Certificados</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800 mb-8">
            {[
              { id: 'progress', label: 'Em Progresso' },
              { id: 'completed', label: 'Concluídos' },
              { id: 'certificates', label: 'Certificados' }
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
          {activeTab === 'progress' && (
            <div className="space-y-6">
              {enrolledCourses.filter(course => course.progress < 100).map(course => (
                <div key={course.id} className="bg-gray-900 rounded-lg p-6 flex flex-col md:flex-row gap-6">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-gray-400 mb-4">Última aula: {course.lastWatched}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>{course.completedLessons}/{course.totalLessons} aulas</span>
                        <span>{course.progress}% concluído</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{course.timeSpent}</span>
                      </div>
                      <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        <Play className="w-4 h-4 mr-2" />
                        Continuar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="space-y-6">
              {enrolledCourses.filter(course => course.progress === 100).length === 0 ? (
                <div className="text-center py-16">
                  <CheckCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-xl">Nenhum curso concluído ainda.</p>
                  <p className="text-gray-500">Continue estudando para conquistar seu primeiro certificado!</p>
                </div>
              ) : (
                enrolledCourses.filter(course => course.progress === 100).map(course => (
                  <div key={course.id} className="bg-gray-900 rounded-lg p-6 flex flex-col md:flex-row gap-6">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                      <div className="flex items-center text-green-500 mb-4">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>Curso Concluído</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{course.timeSpent}</span>
                        </div>
                        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                          <Award className="w-4 h-4 mr-2" />
                          Ver Certificado
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map(cert => (
                <div key={cert.id} className="bg-gray-900 rounded-lg p-6 text-center">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">Emitido em {cert.issueDate}</p>
                  <button className="w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors">
                    <Award className="w-4 h-4 inline mr-2" />
                    Baixar Certificado
                  </button>
                </div>
              ))}
              
              {certificates.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-xl">Nenhum certificado ainda.</p>
                  <p className="text-gray-500">Complete seus cursos para ganhar certificados!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyLearning;
