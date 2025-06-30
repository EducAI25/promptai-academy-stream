
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async () => {
  try {
    console.log('Configurando usuário admin...');
    
    // Verificar se já existe uma sessão
    const { data: session } = await supabase.auth.getSession();
    if (session.session?.user?.email === 'admin@promptai.com') {
      console.log('Admin já logado');
      return true;
    }

    // Tentar login primeiro
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'admin@promptai.com',
      password: 'admin123456*'
    });

    if (loginData.user) {
      console.log('Admin logado com sucesso');
      
      // Garantir que o perfil seja admin
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: loginData.user.id,
          full_name: 'Administrador',
          username: 'admin',
          role: 'admin'
        });

      if (profileError) {
        console.log('Erro ao atualizar perfil:', profileError);
      }
      
      return true;
    }

    if (loginError?.message?.includes('Invalid login credentials')) {
      console.log('Criando usuário admin...');
      
      // Criar usuário admin
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'admin@promptai.com',
        password: 'admin123456*',
        options: {
          data: {
            full_name: 'Administrador',
            username: 'admin'
          }
        }
      });

      if (signUpData.user && !signUpError) {
        console.log('Usuário admin criado');
        
        // Criar perfil admin
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: signUpData.user.id,
            full_name: 'Administrador',
            username: 'admin',
            role: 'admin'
          });

        if (profileError) {
          console.log('Erro ao criar perfil:', profileError);
        }
        
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Erro na configuração admin:', error);
    return false;
  }
};
