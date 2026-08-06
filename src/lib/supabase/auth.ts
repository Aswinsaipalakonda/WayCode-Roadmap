import { createClient } from './client';

export async function signInWithGitHub() {
  const supabase = createClient();
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${origin}/callback`,
      scopes: 'repo read:user user:email',
    },
  });

  if (error) {
    console.error('Error signing in with GitHub:', error.message);
    throw error;
  }

  return data;
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
}
