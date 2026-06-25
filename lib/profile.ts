import { supabase } from './supabase';

export interface Profile {
  id: string;
  full_name?: string;
  tagline?: string;
  location?: string;
  skills: string[];
  preferred_salary?: string;
  job_type_pref?: string;
  open_to_work: boolean;
  avatar_url?: string;
}

export interface Subscription {
  plan: string;
  status: string;
  current_period_end?: string;
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId);
  if (error) throw error;
}

export async function fetchSubscription(userId: string): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('plan, status, current_period_end')
    .eq('user_id', userId)
    .single();
  if (error) return null;
  return data;
}
