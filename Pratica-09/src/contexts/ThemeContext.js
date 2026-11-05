import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro");
  function alternarTema() {
    setTema((atual) => atual === "claro" ? "escuro" : "claro");
  }
  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const contexto = useContext(ThemeContext);
  if (!contexto) throw new Error("useTheme deve ser usado dentro de ThemeProvider.");
  return contexto;
}
