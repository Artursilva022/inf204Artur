import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DetalhesUsuario({ route, navigation }) {
  const { contato } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do contato</Text>
      <View style={styles.card}>
        <Text style={styles.rotulo}>Nome</Text>
        <Text style={styles.valor}>{contato.nome}</Text>
        <Text style={styles.rotulo}>Telefone</Text>
        <Text style={styles.valor}>{contato.telefone}</Text>
      </View>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "#F3F6FA", padding: 22 },
  titulo: { fontSize: 25, fontWeight: "bold", color: "#17365D", marginBottom: 20, textAlign: "center" },
  card: { backgroundColor: "#FFF", padding: 22, borderRadius: 12, elevation: 2 },
  rotulo: { color: "#667085", marginTop: 8 },
  valor: { color: "#172B4D", fontSize: 19, fontWeight: "bold", marginBottom: 8 },
  botao: { backgroundColor: "#1769AA", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  textoBotao: { color: "#FFF", fontWeight: "bold" }
});
