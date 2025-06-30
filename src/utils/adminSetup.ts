
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async () => {
  try {
    console.log('Iniciando configuração do usuário admin...');
    
    // Tentar fazer login primeiro para verificar se o usuário existe
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'admin@promptai.com',
      password: 'admin123456*'
    });

    if (loginError && loginError.message.includes('Invalid login credentials')) {
      console.log('Usuário admin não existe, criando...');
      
      // Criar o usuário admin
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

      if (signUpData.user) {
        console.log('Usuário admin criado:', signUpData.user.id);
        
        // Aguardar um pouco para garantir que o perfil foi criado
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Atualizar o perfil para admin
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', signUpData.user.id);

        if (updateError) {
          console.error('Erro ao atualizar perfil admin:', updateError);
          
          // Tentar inserir se não existir
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: signUpData.user.id,
              full_name: 'Administrador',
              username: 'admin',
              role: 'admin'
            });

          if (insertError) {
            console.error('Erro ao inserir perfil admin:', insertError);
            return false;
          }
        }

        console.log('Usuário admin configurado com sucesso!');
        return true;
      }
    } else if (loginData.user) {
      console.log('Usuário admin já existe, verificando permissões...');
      
      // Verificar se é admin
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', loginData.user.id)
        .single();

      if (profileError || !profile) {
        console.log('Perfil não encontrado, criando...');
        // Criar perfil admin se não existir
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: loginData.user.id,
            full_name: 'Administrador',
            username: 'admin',
            role: 'admin'
          });

        if (insertError) {
          console.error('Erro ao criar perfil admin:', insertError);
          return false;
        }
      } else if (profile.role !== 'admin') {
        console.log('Atualizando role para admin...');
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
