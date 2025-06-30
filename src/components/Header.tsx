
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadCartItems(session.user.id);
      }
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadCartItems(session.user.id);
      } else {
        setCartItemsCount(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadCartItems = async (userId: string) => {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId);
    
    if (!error && data) {
      setCartItemsCount(data.length);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate('/');
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/">
              <img 
                src="/lovable-uploads/96a1b135-d793-440c-9f5f-bcace76b5cb1.png" 
                alt="PromptAI Academy" 
                className="h-8 w-auto"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <Link 
                to="/" 
                className={`transition-colors font-medium ${
                  isActive('/') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/cursos" 
                className={`transition-colors ${
                  isActive('/cursos') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Todos os Cursos
              </Link>
              <Link 
                to="/docentes" 
                className={`transition-colors ${
                  isActive('/docentes') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Docentes Convidados
              </Link>
              <Link 
                to="/assinar" 
                className={`transition-colors ${
                  isActive('/assinar') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Assinar
              </Link>
              <Link 
                to="/contato" 
                className={`transition-colors ${
                  isActive('/contato') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Contato
              </Link>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-10'}`}>
              {isSearchOpen ? (
                <div className="flex items-center w-full bg-black/50 border border-gray-600 rounded px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Buscar cursos..."
                    className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Cart */}
            <Link to="/carrinho" className="relative text-white hover:text-gray-300 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/painel"
                  className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Painel
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300 transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            ) : (
              <Link 
                to="/auth"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white lg:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 mt-4">
              <Link 
                to="/" 
                className={`transition-colors ${
                  isActive('/') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/cursos" 
                className={`transition-colors ${
                  isActive('/cursos') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Todos os Cursos
              </Link>
              <Link 
                to="/docentes" 
                className={`transition-colors ${
                  isActive('/docentes') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Docentes Convidados
              </Link>
              <Link 
                to="/assinar" 
                className={`transition-colors ${
                  isActive('/assinar') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Assinar
              </Link>
              <Link 
                to="/contato" 
                className={`transition-colors ${
                  isActive('/contato') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              {user && (
                <Link 
                  to="/painel"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Painel
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
