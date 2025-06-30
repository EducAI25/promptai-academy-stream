
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async () => {
  try {
    // Tentar fazer login com o usuário admin
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'admin@promptai.com',
      password: 'admin123456*'
    });

    if (loginError && loginError.message.includes('Invalid login credentials')) {
      // Usuário não existe, criar o usuário admin
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'admin@promptai.com',
        password: 'admin123456*',
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: {
            full_name: 'Administrador',
            username: 'admin'
          }
        }
      });

      if (signUpError) {
        console.error('Erro ao criar usuário admin:', signUpError);
        return false;
      }

      // Aguardar um pouco para garantir que o perfil foi criado
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Atualizar o perfil para admin
      if (signUpData.user) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', signUpData.user.id);

        if (updateError) {
          console.error('Erro ao atualizar perfil admin:', updateError);
          return false;
        }
      }

      console.log('Usuário admin criado com sucesso!');
      return true;
    } else if (loginData.user) {
      // Usuário existe, verificar se é admin
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', loginData.user.id)
        .single();

      if (profileError) {
        console.error('Erro ao verificar perfil admin:', profileError);
        return false;
      }

      if (profile.role !== 'admin') {
        // Atualizar para admin
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', loginData.user.id);

        if (updateError) {
          console.error('Erro ao atualizar perfil admin:', updateError);
          return false;
        }
      }

      console.log('Usuário admin verificado com sucesso!');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Erro ao configurar usuário admin:', error);
    return false;
  }
};
