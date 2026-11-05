import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../contexts/ThemeContext";

export default function Dashboard() {
  const { usuario, signOut } = useAuth();
  const { tema, alternarTema } = useTheme();
  const escuro = tema === "escuro";

  return (
    <View style={[styles.container, { backgroundColor: escuro ? "#101828" : "#F3F6FA" }]}>
      <Text style={[styles.titulo, { color: escuro ? "#FFF" : "#17365D" }]}>Painel da Agenda</Text>
      <Text style={[styles.texto, { color: escuro ? "#EAECF0" : "#475467" }]}>Login realizado com: {usuario?.email}</Text>
      <Text style={[styles.texto, { color: escuro ? "#EAECF0" : "#475467" }]}>Você está na área protegida do aplicativo.</Text>

      <TouchableOpacity style={styles.botao} onPress={alternarTema}>
        <Text style={styles.textoBotao}>Alternar tema ({tema})</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.botao, styles.sair]} onPress={signOut}>
        <Text style={styles.textoBotao}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  titulo: { fontSize: 27, fontWeight: "bold", marginBottom: 18, textAlign: "center" },
  texto: { fontSize: 16, textAlign: "center", marginBottom: 12 },
  botao: { backgroundColor: "#1769AA", padding: 15, borderRadius: 9, alignItems: "center", marginTop: 12 },
  sair: { backgroundColor: "#B42318" },
  textoBotao: { color: "#FFF", fontWeight: "bold" }
});
