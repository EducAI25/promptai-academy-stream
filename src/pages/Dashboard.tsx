import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  User, BookOpen, Trophy, Clock, Target, TrendingUp, 
  Play, Calendar, Star, Award, Bell, Settings 
} from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      loadProfile(session.user.id);
    } else {
      navigate('/auth');
    }
  };

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-white text-xl">Carregando painel...</div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: TrendingUp },
    { id: 'courses', label: 'Meus Cursos', icon: BookOpen },
    { id: 'progress', label: 'Progresso', icon: Target },
    { id: 'certificates', label: 'Certificados', icon: Award },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Olá, {profile?.full_name || user?.email?.split('@')[0]}! 👋
                </h1>
                <p className="text-red-100">
                  Continue sua jornada de aprendizado. Você está indo muito bem!
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 bg-gray-900 p-2 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Stats Cards */}
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Cursos Ativos</h3>
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">3</div>
                  <p className="text-gray-400 text-sm">2 em progresso</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Horas Estudadas</h3>
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">24h</div>
                  <p className="text-gray-400 text-sm">Esta semana: 5h</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Certificados</h3>
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">2</div>
                  <p className="text-gray-400 text-sm">1 este mês</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Sequência</h3>
                    <Target className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">7 dias</div>
                  <p className="text-gray-400 text-sm">Recorde: 15 dias</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Atividade Recente</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm">Completou "Introdução ao Machine Learning"</p>
                      <p className="text-gray-400 text-xs">2 horas atrás</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm">Avaliou curso "React Avançado"</p>
                      <p className="text-gray-400 text-xs">1 dia atrás</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm">Recebeu certificado</p>
                      <p className="text-gray-400 text-xs">3 dias atrás</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder courses */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-red-600 to-red-700"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Curso de Exemplo {i}</h3>
                    <p className="text-gray-400 text-sm mb-4">Descrição do curso aqui...</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Progresso</span>
                        <span>{i * 25}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ width: `${i * 25}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors">
                      Continuar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-900 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Configurações do Perfil</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      value={profile?.full_name || ''}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome de usuário
                    </label>
                    <input
                      type="text"
                      value={profile?.username || ''}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content would go here */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
