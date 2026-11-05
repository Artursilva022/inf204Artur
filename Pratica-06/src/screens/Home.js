import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { contatosIniciais } from "../data/contatos";

export default function Home({ navigation }) {
  const [contatos, setContatos] = useState(contatosIniciais);

  function limparAgenda() {
    Alert.alert("Limpar agenda", "Deseja remover todos os contatos?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Limpar", style: "destructive", onPress: () => setContatos([]) }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Agenda</Text>
      <Text style={styles.subtitulo}>Selecione um contato para ver os detalhes</Text>
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum contato cadastrado.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detalhes", { contato: item })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.telefone}>{item.telefone}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.botaoLimpar} onPress={limparAgenda}>
        <Text style={styles.textoBotao}>Limpar agenda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F6FA", padding: 20, paddingTop: 55 },
  titulo: { fontSize: 27, fontWeight: "bold", color: "#17365D" },
  subtitulo: { color: "#667085", marginTop: 6, marginBottom: 18 },
  card: { backgroundColor: "#FFF", padding: 17, borderRadius: 12, marginBottom: 12, elevation: 2 },
  nome: { fontSize: 18, fontWeight: "bold", color: "#172B4D" },
  telefone: { fontSize: 15, color: "#667085", marginTop: 5 },
  vazio: { textAlign: "center", marginTop: 35, color: "#667085" },
  botaoLimpar: { backgroundColor: "#B42318", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 10 },
  textoBotao: { color: "#FFF", fontWeight: "bold" }
});
