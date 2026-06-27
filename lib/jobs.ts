import { supabase } from './supabase';

export interface DbJob {
  id: string;
  platform: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  job_type: string;
  experience_level: string;
  salary?: string;
  description: string;
  requirements: string[];
  tags: string[];
  url: string;
  logo: string;
  posted_at: string;
}

export async function fetchJobs(filters?: {
  platform?: string;
  jobType?: string;
  experienceLevel?: string;
  remote?: boolean;
  search?: string;
}): Promise<DbJob[]> {
  let query = supabase.from('jobs').select('*').eq('active', true).order('posted_at', { ascending: false });

  if (filters?.platform) query = query.eq('platform', filters.platform);
  if (filters?.jobType) query = query.eq('job_type', filters.jobType);
  if (filters?.experienceLevel) query = query.eq('experience_level', filters.experienceLevel);
  if (filters?.remote !== undefined) query = query.eq('remote', filters.remote);
  if (filters?.search) {
    // Strip PostgREST filter special chars and cap length to prevent filter injection
    const safe = filters.search.replace(/[(),%*]/g, '').slice(0, 100);
    query = query.or(`title.ilike.%${safe}%,company.ilike.%${safe}%,description.ilike.%${safe}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
