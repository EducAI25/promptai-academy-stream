
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Check, Star, Crown, Zap } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_months: number;
  features: string[];
  is_active: boolean;
}

const Subscribe = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPlans();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  };

  const loadPlans = async () => {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true });

    if (!error && data) {
      setPlans(data);
    }
    setLoading(false);
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para assinar um plano.",
        variant: "destructive",
      });
      return;
    }

    // Aqui você integraria com um sistema de pagamento como Stripe
    toast({
      title: "Em breve!",
      description: "O sistema de pagamentos será implementado em breve.",
    });
  };

  const getPlanIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Star className="w-8 h-8 text-blue-400" />;
      case 1:
        return <Zap className="w-8 h-8 text-purple-400" />;
      case 2:
        return <Crown className="w-8 h-8 text-yellow-400" />;
      default:
        return <Star className="w-8 h-8 text-gray-400" />;
    }
  };

  const getPlanColor = (index: number) => {
    switch (index) {
      case 0:
        return 'from-blue-600 to-blue-700';
      case 1:
        return 'from-purple-600 to-purple-700';
      case 2:
        return 'from-yellow-600 to-yellow-700';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-white text-xl">Carregando planos...</div>
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
            backgroundImage: `url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Escolha seu <span className="text-red-500">Plano</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Acelere seu aprendizado com acesso completo aos melhores cursos de IA, 
            programação e marketing digital.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={plan.id} 
                className={`bg-gray-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 ${
                  index === 1 ? 'ring-2 ring-red-500 relative' : ''
                }`}
              >
                {index === 1 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      {getPlanIcon(index)}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    <div className="text-4xl font-bold text-white mb-2">
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                      <span className="text-lg text-gray-400 font-normal">/mês</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full bg-gradient-to-r ${getPlanColor(index)} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-opacity`}
                  >
                    Assinar Agora
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Perguntas Frequentes</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Posso cancelar a qualquer momento?</h3>
                <p className="text-gray-300">Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Há garantia de satisfação?</h3>
                <p className="text-gray-300">Oferecemos 7 dias de garantia total. Se não ficar satisfeito, devolvemos seu dinheiro.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Os certificados são válidos?</h3>
                <p className="text-gray-300">Sim! Nossos certificados são reconhecidos e podem ser adicionados ao seu LinkedIn.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Tenho suporte técnico?</h3>
                <p className="text-gray-300">Todos os planos incluem suporte técnico por email e chat em horário comercial.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Subscribe;
