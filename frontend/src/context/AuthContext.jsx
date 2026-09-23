import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId, baseUser) => {
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, role, phone, avatar')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUser({
        ...baseUser,
        name: data?.name || baseUser?.user_metadata?.name || null,
        role: data?.role || 'user',
        phone: data?.phone || null,
        avatar: data?.avatar || null,
      });
    } catch (err) {
      console.error('Ошибка загрузки профиля:', err.message);
      setUser({
        ...baseUser,
        name: baseUser?.user_metadata?.name || null,
        role: 'user',
        phone: null,
        avatar: null,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Получаем текущую сессию
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      if (session?.user) {
        // Пока профиль грузится — loading остаётся true
        setUser(session.user); // временно
        loadProfile(session.user.id, session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // Слушатель изменений авторизации
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      if (session?.user) {
        setLoading(true); // снова ждём профиль
        setUser(session.user);
        loadProfile(session.user.id, session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      setSession(data.session);
      setLoading(true);
      await loadProfile(data.user.id, data.user);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { name: name.trim() },
        },
      });

      if (error) throw error;

      if (data.user && data.session) {
        setSession(data.session);
        setLoading(true);
        await loadProfile(data.user.id, data.user);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updates) => {
    if (!user) return { success: false, error: 'Пользователь не авторизован' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setUser((current) => ({ ...current, ...updates }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setSession(null);
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Ошибка выхода:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    logout,
    updateProfile,
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'manager' || user?.role === 'admin',
    isEmployee: user?.role === 'employee' || user?.role === 'manager' || user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};