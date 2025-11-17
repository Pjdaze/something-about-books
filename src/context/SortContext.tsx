import { createContext, useContext, useState } from "react";
import type { SortKey, SortDirection } from "../types/Sort";

export interface SortContextValue {
  sortKey: SortKey;
  sortDirection: SortDirection;
  setSortKey: (key: SortKey) => void;
  setSortDirection: (dir: SortDirection) => void;
}

const SortContext = createContext<SortContextValue | undefined>(undefined);

export const SortProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  return (
    <SortContext.Provider
      value={{
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
      }}
    >
      {children}
    </SortContext.Provider>
  );
};

export function useSort(): SortContextValue {
  const ctx = useContext(SortContext);
  if (!ctx) throw new Error("useSort must be used within a SortProvider");
  return ctx;
}
