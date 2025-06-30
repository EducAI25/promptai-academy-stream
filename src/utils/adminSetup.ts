
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async () => {
  try {
    // Verificar se já existe uma sessão ativa
    const { data: currentSession } = await supabase.auth.getSession();
    if (currentSession.session?.user?.email === 'admin@promptai.com') {
      return true;
    }

    const adminEmail = 'admin@promptai.com';
    const adminPassword = 'admin123456*';

    // Tentar fazer login primeiro
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword
    });

    if (loginData.user && !loginError) {
      await ensureAdminProfile(loginData.user.id);
      return true;
    }

    // Se o login falhou, tentar criar o usuário
    if (loginError?.message?.includes('Invalid login credentials')) {
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
        await ensureAdminProfile(signUpData.user.id);
        
        // Tentar fazer login após criação
        const { data: newLoginData } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword
        });
        
        return !!newLoginData.user;
      }
    }

    return false;
  } catch (error) {
    console.error('Erro na configuração admin:', error);
    return false;
  }
};

const ensureAdminProfile = async (userId: string) => {
  try {
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (existingProfile) {
      await supabase
        .from('profiles')
        .update({ 
          role: 'admin',
          full_name: 'Administrador',
          username: 'admin'
        })
        .eq('id', userId);
    } else {
      await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: 'Administrador',
          username: 'admin',
          role: 'admin'
        });
    }
  } catch (error) {
    console.error('Erro ao gerenciar perfil admin:', error);
  }
};

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
