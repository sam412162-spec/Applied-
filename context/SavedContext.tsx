import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Linking } from 'react-native';
import {
  fetchSavedJobIds,
  fetchAppliedJobIds,
  saveJob,
  unsaveJob,
  markJobApplied,
} from '../lib/savedJobs';
import { useAuth } from './AuthContext';

interface SavedContextType {
  savedIds: Set<string>;
  appliedIds: Set<string>;
  toggleSaved: (jobId: string) => Promise<void>;
  applyToJob: (jobId: string, url: string) => Promise<void>;
  isSaved: (id: string) => boolean;
  isApplied: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) {
      setSavedIds(new Set());
      setAppliedIds(new Set());
      return;
    }
    fetchSavedJobIds(user.id).then(ids => setSavedIds(new Set(ids))).catch(() => {});
    fetchAppliedJobIds(user.id).then(ids => setAppliedIds(new Set(ids))).catch(() => {});
  }, [user]);

  const toggleSaved = async (jobId: string) => {
    if (!user) return;
    const isSavedNow = savedIds.has(jobId);
    setSavedIds(prev => {
      const next = new Set(prev);
      isSavedNow ? next.delete(jobId) : next.add(jobId);
      return next;
    });
    try {
      isSavedNow ? await unsaveJob(user.id, jobId) : await saveJob(user.id, jobId);
    } catch {
      setSavedIds(prev => {
        const next = new Set(prev);
        isSavedNow ? next.add(jobId) : next.delete(jobId);
        return next;
      });
    }
  };

  const applyToJob = async (jobId: string, url: string) => {
    if (!user) return;
    setAppliedIds(prev => new Set([...prev, jobId]));
    await markJobApplied(user.id, jobId).catch(() => {});
    Linking.openURL(url);
  };

  return (
    <SavedContext.Provider value={{
      savedIds,
      appliedIds,
      toggleSaved,
      applyToJob,
      isSaved: (id) => savedIds.has(id),
      isApplied: (id) => appliedIds.has(id),
    }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('useSaved must be used within SavedProvider');
  return ctx;
}
