
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async () => {
  try {
    console.log('🔧 Iniciando configuração do usuário admin...');
    
    // Verificar se já existe uma sessão ativa
    const { data: currentSession } = await supabase.auth.getSession();
    if (currentSession.session?.user?.email === 'admin@promptai.com') {
      console.log('✅ Admin já está logado');
      return true;
    }

    const adminEmail = 'admin@promptai.com';
    const adminPassword = 'admin123456*';

    // Primeiro, tentar fazer login
    console.log('🔑 Tentando fazer login do admin...');
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword
    });

    if (loginData.user && !loginError) {
      console.log('✅ Admin logado com sucesso');
      
      // Garantir que o perfil seja admin
      await ensureAdminProfile(loginData.user.id);
      return true;
    }

    // Se o login falhou, verificar se é porque o usuário não existe
    if (loginError?.message?.includes('Invalid login credentials') || 
        loginError?.message?.includes('Email not confirmed')) {
      
      console.log('👤 Criando usuário admin...');
      
      // Criar o usuário admin
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
        options: {
          data: {
            full_name: 'Administrador',
            username: 'admin'
          }
        }
      });

      if (signUpData.user && !signUpError) {
        console.log('✅ Usuário admin criado');
        
        // Se o usuário foi criado mas precisa de confirmação de email
        if (!signUpData.session) {
          console.log('⚠️ Email precisa ser confirmado manualmente no Supabase');
          
          // Tentar confirmar automaticamente via admin API (não funciona no frontend)
          // O usuário precisará confirmar no painel do Supabase
        }
        
        // Criar o perfil admin
        await ensureAdminProfile(signUpData.user.id);
        
        // Tentar fazer login após criação
        const { data: newLoginData } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword
        });
        
        if (newLoginData.user) {
          console.log('✅ Admin criado e logado com sucesso');
          return true;
        }
      } else {
        console.error('❌ Erro ao criar usuário admin:', signUpError);
      }
    } else {
      console.error('❌ Erro no login do admin:', loginError);
    }

    return false;
  } catch (error) {
    console.error('❌ Erro na configuração admin:', error);
    return false;
  }
};

const ensureAdminProfile = async (userId: string) => {
  try {
    // Verificar se o perfil já existe
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (existingProfile) {
      // Atualizar para garantir que seja admin
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          role: 'admin',
          full_name: 'Administrador',
          username: 'admin'
        })
        .eq('id', userId);

      if (updateError) {
        console.error('❌ Erro ao atualizar perfil admin:', updateError);
      } else {
        console.log('✅ Perfil admin atualizado');
      }
    } else {
      // Criar novo perfil admin
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: 'Administrador',
          username: 'admin',
          role: 'admin'
        });

      if (insertError) {
        console.error('❌ Erro ao criar perfil admin:', insertError);
      } else {
        console.log('✅ Perfil admin criado');
      }
    }
  } catch (error) {
    console.error('❌ Erro ao gerenciar perfil admin:', error);
  }
};

// Função para verificar se o usuário atual é admin
export const isCurrentUserAdmin = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return false;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    return profile?.role === 'admin';
  } catch (error) {
    console.error('Erro ao verificar admin:', error);
    return false;
  }
};
