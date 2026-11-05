import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Configuracoes() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>
      <Text style={styles.texto}>Aplicativo Minha Agenda</Text>
      <Text style={styles.texto}>Prática 06 - Navegação entre telas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F3F6FA", padding: 20 },
  titulo: { fontSize: 25, fontWeight: "bold", color: "#17365D", marginBottom: 12 },
  texto: { fontSize: 16, color: "#475467", marginBottom: 8 }
});
