import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, BookOpen, MessageSquare, BarChart3, Settings, 
  Plus, Edit, Trash2, Search, Filter, Eye 
} from 'lucide-react';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminUser();
  }, []);

  const checkAdminUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      // Verificar se é admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile?.role === 'admin') {
        setProfile(profile);
      } else {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para acessar esta área.",
          variant: "destructive",
        });
        navigate('/');
      }
    } else {
      navigate('/auth');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Verificando permissões...</div>
      </div>
    );
  }

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Acesso Negado</h1>
          <p className="text-gray-400">Você não tem permissão para acessar esta área.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'courses', label: 'Cursos', icon: BookOpen },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-8">Admin Panel</h1>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Dashboard</h2>
              
              {/* Stats Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Total de Usuários</h3>
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">1,234</div>
                  <p className="text-gray-400 text-sm">+12% este mês</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Cursos Ativos</h3>
                    <BookOpen className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">45</div>
                  <p className="text-gray-400 text-sm">3 novos este mês</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Mensagens</h3>
                    <MessageSquare className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">89</div>
                  <p className="text-gray-400 text-sm">23 não lidas</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Receita</h3>
                    <BarChart3 className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">R$ 45.2K</div>
                  <p className="text-gray-400 text-sm">+8% este mês</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Atividade Recente</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                      <p className="text-white">Novo usuário cadastrado</p>
                      <p className="text-gray-400 text-sm">joão@email.com</p>
                    </div>
                    <span className="text-gray-400 text-sm">2 min atrás</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                      <p className="text-white">Curso "IA Avançada" foi atualizado</p>
                      <p className="text-gray-400 text-sm">Por Maria Silva</p>
                    </div>
                    <span className="text-gray-400 text-sm">1 hora atrás</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-white">Nova mensagem de contato</p>
                      <p className="text-gray-400 text-sm">Suporte técnico</p>
                    </div>
                    <span className="text-gray-400 text-sm">3 horas atrás</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">Gerenciar Usuários</h2>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Usuário
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar usuários..."
                    className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                  />
                </div>
                <button className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 hover:bg-gray-700 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </button>
              </div>

              {/* Users Table */}
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="text-left py-4 px-6 text-gray-300">Nome</th>
                      <th className="text-left py-4 px-6 text-gray-300">Email</th>
                      <th className="text-left py-4 px-6 text-gray-300">Tipo</th>
                      <th className="text-left py-4 px-6 text-gray-300">Status</th>
                      <th className="text-left py-4 px-6 text-gray-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-6 text-white">João Silva</td>
                      <td className="py-4 px-6 text-gray-300">joao@email.com</td>
                      <td className="py-4 px-6">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">Aluno</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">Ativo</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-yellow-400 hover:text-yellow-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* More users would be mapped here */}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other tabs content would be implemented similarly */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
