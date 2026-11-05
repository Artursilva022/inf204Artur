import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext(null);
const CHAVE_SESSAO = "@MinhaAgenda: sessao";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function recuperarSessao() {
      try {
        const sessaoSalva = await AsyncStorage.getItem(CHAVE_SESSAO);
        if (sessaoSalva) setUsuario(JSON.parse(sessaoSalva));
      } catch (erro) {
        console.error("Erro ao recuperar sessão:", erro);
      } finally {
        setCarregando(false);
      }
    }
    recuperarSessao();
  }, []);

  async function signIn(email, senha) {
    if (!email.trim() || !senha.trim()) {
      throw new Error("Informe e-mail e senha.");
    }
    // Login didático: não consulta servidor e não valida credenciais reais.
    const novoUsuario = { email: email.trim() };
    await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(novoUsuario));
    setUsuario(novoUsuario);
  }

  async function signOut() {
    await AsyncStorage.removeItem(CHAVE_SESSAO);
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, logado: !!usuario, carregando, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
