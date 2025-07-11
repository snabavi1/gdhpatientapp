
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { completeUnifiedSignup, UnifiedSignupData } from '../services/backendApi';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signUpWithUnifiedBackend: (signupData: UnifiedSignupData) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        }
      }
    });
    return { error };
  };

  const signUpWithUnifiedBackend = async (signupData: UnifiedSignupData) => {
    try {
      setLoading(true);
      
      // Step 1: Create user in all systems via backend
      const backendResult = await completeUnifiedSignup(signupData);
      
      // Step 2: Sign in the user to Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signupData.email,
        password: signupData.password
      });

      if (error) throw error;

      // Step 3: Set user in context
      setUser(data.user);
      setSession(data.session);
      
      return { ...backendResult, user: data.user };
      
    } catch (error) {
      console.error('Unified signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signUpWithUnifiedBackend,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
