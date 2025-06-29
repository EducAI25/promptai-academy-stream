
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { aiCourses, programmingCourses, marketingCourses, dataScienceCourses, designCourses } from '../data/courses';

interface CartItem {
  id: string;
  course_id: string;
  added_at: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const allCourses = [
    ...aiCourses,
    ...programmingCourses,
    ...marketingCourses,
    ...dataScienceCourses,
    ...designCourses
  ];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
      loadCartItems(session.user.id);
    } else {
      navigate('/auth');
    }
  };

  const loadCartItems = async (userId: string) => {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .order('added_at', { ascending: false });

    if (!error && data) {
      setCartItems(data);
    }
    setLoading(false);
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      toast({
        title: "Erro ao remover item",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setCartItems(items => items.filter(item => item.id !== itemId));
      toast({
        title: "Item removido",
        description: "Curso removido do carrinho.",
      });
    }
  };

  const getCartCourses = () => {
    return cartItems.map(item => {
      const course = allCourses.find(c => c.id.toString() === item.course_id);
      return { ...item, course };
    }).filter(item => item.course);
  };

  const getTotalPrice = () => {
    // Para demo, vamos usar preços fixos
    return getCartCourses().length * 97; // R$ 97 por curso
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-white text-xl">Carregando carrinho...</div>
        </div>
      </div>
    );
  }

  const cartCourses = getCartCourses();

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <ShoppingBag className="w-8 h-8 text-red-500 mr-3" />
            <h1 className="text-4xl font-bold text-white">Meu Carrinho</h1>
            <span className="ml-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
            </span>
          </div>

          {cartCourses.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Seu carrinho está vazio</h2>
              <p className="text-gray-400 mb-8">Explore nossos cursos e adicione ao carrinho</p>
              <Link 
                to="/cursos"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center"
              >
                Ver Cursos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartCourses.map((item) => (
                  <div key={item.id} className="bg-gray-900 rounded-lg p-6 flex items-center space-x-4">
                    <img
                      src={item.course.image}
                      alt={item.course.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{item.course.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{item.course.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{item.course.duration}</span>
                        <span>•</span>
                        <span>{item.course.level}</span>
                        <span>•</span>
                        <span>⭐ {item.course.rating}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-2">R$ 97,00</div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-gray-900 rounded-lg p-6 h-fit">
                <h2 className="text-2xl font-bold text-white mb-6">Resumo do Pedido</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({cartCourses.length} {cartCourses.length === 1 ? 'curso' : 'cursos'})</span>
                    <span>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Desconto</span>
                    <span className="text-green-400">-R$ 0,00</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4">
                  Finalizar Compra
                </button>

                <div className="text-center text-sm text-gray-400">
                  <p>Acesso imediato após a compra</p>
                  <p>30 dias de garantia</p>
                </div>

                {/* Coupon Code */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="text-white font-semibold mb-3">Código de Desconto</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Inserir código"
                      className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors">
                      Aplicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
