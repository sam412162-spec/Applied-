import { supabase } from './supabase';

export async function fetchSavedJobIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('saved_jobs')
    .select('job_id')
    .eq('user_id', userId);
  if (error) throw error;
  return (data ?? []).map(r => r.job_id);
}

export async function saveJob(userId: string, jobId: string) {
  const { error } = await supabase.from('saved_jobs').insert({ user_id: userId, job_id: jobId });
  if (error) throw error;
}

export async function unsaveJob(userId: string, jobId: string) {
  const { error } = await supabase
    .from('saved_jobs')
    .delete()
    .match({ user_id: userId, job_id: jobId });
  if (error) throw error;
}

export async function fetchAppliedJobIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('applied_jobs')
    .select('job_id')
    .eq('user_id', userId);
  if (error) throw error;
  return (data ?? []).map(r => r.job_id);
}

export async function markJobApplied(userId: string, jobId: string) {
  const { error } = await supabase
    .from('applied_jobs')
    .upsert({ user_id: userId, job_id: jobId, status: 'applied' });
  if (error) throw error;
}
