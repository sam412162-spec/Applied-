import { supabase } from './supabase';

async function getVerifiedUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Not authenticated');
  return user.id;
}

export async function fetchSavedJobIds(): Promise<string[]> {
  const userId = await getVerifiedUserId();
  const { data, error } = await supabase
    .from('saved_jobs')
    .select('job_id')
    .eq('user_id', userId);
  if (error) throw error;
  return (data ?? []).map(r => r.job_id);
}

export async function saveJob(jobId: string) {
  const userId = await getVerifiedUserId();
  const { error } = await supabase.from('saved_jobs').insert({ user_id: userId, job_id: jobId });
  if (error) throw error;
}

export async function unsaveJob(jobId: string) {
  const userId = await getVerifiedUserId();
  const { error } = await supabase
    .from('saved_jobs')
    .delete()
    .match({ user_id: userId, job_id: jobId });
  if (error) throw error;
}

export async function fetchAppliedJobIds(): Promise<string[]> {
  const userId = await getVerifiedUserId();
  const { data, error } = await supabase
    .from('applied_jobs')
    .select('job_id')
    .eq('user_id', userId);
  if (error) throw error;
  return (data ?? []).map(r => r.job_id);
}

export async function markJobApplied(jobId: string) {
  const userId = await getVerifiedUserId();
  const { error } = await supabase
    .from('applied_jobs')
    .upsert({ user_id: userId, job_id: jobId, status: 'applied' });
  if (error) throw error;
}
