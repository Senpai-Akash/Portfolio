"use client";

import { createContext, useContext, useState } from "react";
import { Preloader } from "@/components/ui/Preloader";

interface LoadingContextValue {
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextValue>({ isLoading: true });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      <Preloader onComplete={() => setIsLoading(false)} />
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  return ctx;
}
