-- ============================================================
-- Applied — Supabase Schema
-- Run this in your Supabase SQL editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid references auth.users on delete cascade primary key,
  full_name     text,
  tagline       text default 'Open to new opportunities',
  location      text,
  skills        text[]  default '{}',
  preferred_salary text,
  job_type_pref text,
  open_to_work  boolean default true,
  avatar_url    text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────
-- JOBS
-- ─────────────────────────────────────────
create table if not exists public.jobs (
  id               uuid primary key default uuid_generate_v4(),
  platform         text not null,
  title            text not null,
  company          text not null,
  location         text not null,
  remote           boolean default false,
  job_type         text not null,
  experience_level text not null,
  salary           text,
  description      text not null,
  requirements     text[] default '{}',
  tags             text[] default '{}',
  url              text not null,
  logo             text default '💼',
  posted_at        timestamptz default now(),
  active           boolean default true
);

alter table public.jobs enable row level security;

-- Anyone authenticated can read jobs
create policy "Authenticated users can read jobs"
  on public.jobs for select using (auth.role() = 'authenticated');

-- ─────────────────────────────────────────
-- SAVED JOBS
-- ─────────────────────────────────────────
create table if not exists public.saved_jobs (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid references auth.users on delete cascade not null,
  job_id     uuid references public.jobs on delete cascade not null,
  saved_at   timestamptz default now(),
  unique(user_id, job_id)
);

alter table public.saved_jobs enable row level security;

create policy "Users manage own saved jobs"
  on public.saved_jobs for all using (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- APPLIED JOBS
-- ─────────────────────────────────────────
create table if not exists public.applied_jobs (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users on delete cascade not null,
  job_id      uuid references public.jobs on delete cascade not null,
  applied_at  timestamptz default now(),
  status      text default 'applied',  -- applied | interview | offer | rejected
  notes       text,
  unique(user_id, job_id)
);

alter table public.applied_jobs enable row level security;

create policy "Users manage own applied jobs"
  on public.applied_jobs for all using (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- SUBSCRIPTIONS  (Stripe manages payment — we only store status)
-- ─────────────────────────────────────────
create table if not exists public.subscriptions (
  id                   uuid primary key default uuid_generate_v4(),
  user_id              uuid references auth.users on delete cascade unique not null,
  stripe_customer_id   text unique,
  stripe_subscription_id text unique,
  plan                 text default 'free',       -- free | pro | premium
  status               text default 'inactive',   -- active | inactive | past_due | canceled
  current_period_end   timestamptz,
  created_at           timestamptz default now(),
  updated_at           timestamptz default now()
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscription"
  on public.subscriptions for select using (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- SEED JOBS
-- ─────────────────────────────────────────
insert into public.jobs (platform, title, company, location, remote, job_type, experience_level, salary, description, requirements, tags, url, logo) values
('Indeed',      'Senior React Native Developer', 'TechCorp',           'Cape Town, SA',     false, 'Full-time',  'Senior', 'R65k – R85k/month', 'Build cross-platform mobile apps using React Native and Expo for millions of users.', ARRAY['3+ years React Native','TypeScript','REST APIs','Git'], ARRAY['React Native','Expo','TypeScript'], 'https://indeed.com/jobs', '💼'),
('LinkedIn',    'Mobile App Developer',          'StartupHub',          'Remote',            true,  'Remote',     'Mid',    'R45k – R60k/month', 'Join our growing fintech team building next-gen mobile experiences for African markets.', ARRAY['React Native','Node.js','PostgreSQL'], ARRAY['Mobile','Fintech','Remote'], 'https://linkedin.com/jobs', '🔗'),
('Google Jobs', 'UX/UI Designer',               'Design Studio',       'Johannesburg, SA',  false, 'Full-time',  'Mid',    'R35k – R50k/month', 'Creative UX designer passionate about mobile-first product design with a strong portfolio.', ARRAY['Figma','3+ years UX','User Research','Prototyping'], ARRAY['Design','UX','Figma'], 'https://jobs.google.com', '🎨'),
('Twitter/X',  'Backend Engineer (Node.js)',    'TechRecruiterZA',    'Remote',            true,  'Contract',   'Mid',    'R500 – R700/hour',  'High-scale APIs processing 10M+ daily requests. Contract with perm option.', ARRAY['Node.js','AWS','Docker','MongoDB'], ARRAY['Node.js','Backend','API'], 'https://twitter.com', '⚡'),
('Reddit',      'WordPress Developer',           'Local Agency',        'Remote',            true,  'Freelance',  'Entry',  'R15,000 project',   'Rebuild company website and integrate WooCommerce. One-time project, ongoing potential.', ARRAY['WordPress','WooCommerce','PHP','CSS'], ARRAY['WordPress','WooCommerce','Freelance'], 'https://reddit.com/r/forhire', '🌐'),
('Glassdoor',   'Product Manager — EdTech',     'EduTech Africa',      'Pretoria, SA',      false, 'Full-time',  'Senior', 'R70k – R95k/month', 'Drive product vision for our e-learning platform reaching 500k+ students across Africa.', ARRAY['5+ years PM','Agile/Scrum','Data Analysis'], ARRAY['Product','EdTech','Strategy'], 'https://glassdoor.com/jobs', '📋'),
('Indeed',      'Data Analyst',                 'DataCo',              'Durban, SA',        false, 'Full-time',  'Entry',  'R20k – R30k/month', 'Analyse sales and marketing data to drive business decisions using Python and Tableau.', ARRAY['Python','SQL','Tableau','Excel'], ARRAY['Python','Tableau','Entry Level'], 'https://indeed.com/jobs', '📊'),
('LinkedIn',    'DevOps Engineer',              'CloudSystems',        'Remote',            true,  'Remote',     'Senior', 'R75k – R100k/month','Manage CI/CD pipelines, Kubernetes clusters, and AWS infrastructure.', ARRAY['AWS','Kubernetes','Terraform','CI/CD'], ARRAY['AWS','Kubernetes','DevOps'], 'https://linkedin.com/jobs', '☁️'),
('Website',     'Frontend Developer',           'FinServe',            'Sandton, SA',       false, 'Full-time',  'Mid',    'R50k – R70k/month', 'Build customer-facing web applications used by millions of South Africans.', ARRAY['React','TypeScript','CSS','Testing'], ARRAY['React','Fintech','Frontend'], 'https://example.com/careers', '💻'),
('Public Board','Graduate Internship Programme','SA Dept. of Labour',  'Nationwide, SA',    false, 'Internship', 'Entry',  'R6k – R8k/month',  'Government-funded 12-month internship for recent graduates across all disciplines.', ARRAY['Matric certificate','SA Citizen','Relevant Degree'], ARRAY['Government','Graduate','Internship'], 'https://dpsa.gov.za', '🏛️'),
('Google Jobs', 'Social Media Manager',         'BrandAgency',         'Cape Town, SA',     false, 'Full-time',  'Mid',    'R30k – R45k/month', 'Lead social media strategy for top South African consumer brands with 5M+ combined following.', ARRAY['Social Media Strategy','Content Creation','Analytics'], ARRAY['Marketing','Social Media','Content'], 'https://jobs.google.com', '📣'),
('Indeed',      'Cybersecurity Analyst',        'SecureNet',           'Johannesburg, SA',  true,  'Full-time',  'Mid',    'R55k – R75k/month', 'Protect critical infrastructure by monitoring and responding to security threats.', ARRAY['SIEM tools','Incident Response','CISSP','Networking'], ARRAY['Security','Cyber','InfoSec'], 'https://indeed.com/jobs', '🔐');
