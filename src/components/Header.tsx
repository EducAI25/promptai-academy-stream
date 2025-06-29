
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/" 
                className={`transition-colors font-medium ${
                  isActive('/') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Início
              </Link>
              <Link 
                to="/cursos" 
                className={`transition-colors ${
                  isActive('/cursos') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Cursos
              </Link>
              <Link 
                to="/ia" 
                className={`transition-colors ${
                  isActive('/ia') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                IA
              </Link>
              <Link 
                to="/programacao" 
                className={`transition-colors ${
                  isActive('/programacao') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Programação
              </Link>
              <Link 
                to="/marketing" 
                className={`transition-colors ${
                  isActive('/marketing') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Marketing
              </Link>
              <Link 
                to="/meu-aprendizado" 
                className={`transition-colors ${
                  isActive('/meu-aprendizado') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Meu Aprendizado
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

            {/* Notifications */}
            <button className="text-white hover:text-gray-300 transition-colors hidden md:block">
              <Bell className="w-5 h-5" />
            </button>

            {/* Profile */}
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white md:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 mt-4">
              <Link 
                to="/" 
                className={`transition-colors ${
                  isActive('/') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/cursos" 
                className={`transition-colors ${
                  isActive('/cursos') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cursos
              </Link>
              <Link 
                to="/ia" 
                className={`transition-colors ${
                  isActive('/ia') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                IA
              </Link>
              <Link 
                to="/programacao" 
                className={`transition-colors ${
                  isActive('/programacao') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Programação
              </Link>
              <Link 
                to="/marketing" 
                className={`transition-colors ${
                  isActive('/marketing') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Marketing
              </Link>
              <Link 
                to="/meu-aprendizado" 
                className={`transition-colors ${
                  isActive('/meu-aprendizado') ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Meu Aprendizado
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
