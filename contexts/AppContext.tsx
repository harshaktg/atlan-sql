import { createContext, useContext, useState } from "react";

const Context = createContext();

/**
 * Context to store all queries
 * @param param0
 * @returns
 */
export function AppProvider({ children }) {
  const [queries, setQueries] = useState([]);
  return (
    <Context.Provider value={{ queries, setQueries }}>
      {children}
    </Context.Provider>
  );
}

export function useAppContext() {
  return useContext(Context);
}
