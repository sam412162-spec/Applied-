import { createContext, useContext, useState, ReactNode } from 'react';

interface SavedContextType {
  savedIds: Set<string>;
  appliedIds: Set<string>;
  toggleSaved: (id: string) => void;
  markApplied: (id: string) => void;
  isSaved: (id: string) => boolean;
  isApplied: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  const toggleSaved = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const markApplied = (id: string) => {
    setAppliedIds(prev => new Set([...prev, id]));
  };

  return (
    <SavedContext.Provider value={{
      savedIds,
      appliedIds,
      toggleSaved,
      markApplied,
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
