"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Preloader } from "@/components/ui/Preloader";

interface LoadingContextValue {
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextValue>({ isLoading: true });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  // Stable callback reference — prevents Preloader useEffect from re-firing
  const handleComplete = useCallback(() => setIsLoading(false), []);

  // Safety net: force loading to finish after 5s no matter what
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      setIsLoading(false);
      // Also force-clear any stuck overflow locks
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, 5000);

    return () => clearTimeout(safetyTimeout);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      <Preloader onComplete={handleComplete} />
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  return ctx;
}
