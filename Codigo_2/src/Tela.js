import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import ItemTarefa from "./ItemTarefa";

const tarefasIniciais = [
  { id: 1, descricao: "Estudar ES6+", concluida: true },
  { id: 2, descricao: "Configurar ambiente Expo", concluida: true },
  { id: 3, descricao: "Entender o funcionamento do JSX", concluida: false },
  { id: 4, descricao: "Finalizar roteiro", concluida: false }
];

export default function Pratica02({ onVoltar }) {
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const [novaTarefa, setNovaTarefa] = useState("");
  const pendentes = tarefas.filter(tarefa => !tarefa.concluida);

  const adicionar = () => {
    const descricao = novaTarefa.trim();
    if (!descricao) return;
    setTarefas(prev => [...prev, { id: Date.now(), descricao, concluida: false }]);
    setNovaTarefa("");
  };

  const alternar = (id) => {
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
  };

  return (
    <View style={styles.tela}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.secao}>Adicionar tarefa</Text>
        <View style={styles.linha}>
          <TextInput style={styles.input} value={novaTarefa} onChangeText={setNovaTarefa} placeholder="Digite uma tarefa..." />
          <TouchableOpacity style={styles.adicionar} onPress={adicionar}><Text style={styles.adicionarTexto}>+</Text></TouchableOpacity>
        </View>
        <Text style={styles.secao}>Todas as tarefas ({tarefas.length})</Text>
        {tarefas.map(tarefa => (
          <TouchableOpacity key={tarefa.id} onPress={() => alternar(tarefa.id)} activeOpacity={0.75}>
            <ItemTarefa tarefa={tarefa} />
            <Text style={styles.acao}>{tarefa.concluida ? "Toque para marcar como pendente" : "Toque para concluir"}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.secao}>Somente pendentes ({pendentes.length})</Text>
        {pendentes.length ? pendentes.map(tarefa => <ItemTarefa key={`p-${tarefa.id}`} tarefa={tarefa} />) : <Text style={styles.vazio}>Nenhuma tarefa pendente.</Text>}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#F3F6FA" },
  conteudo: { padding: 20, paddingBottom: 35 },
  secao: { color: "#183253", fontSize: 17, fontWeight: "800", marginTop: 12, marginBottom: 10 },
  linha: { flexDirection: "row", marginBottom: 8 },
  input: { flex: 1, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D8E0EA", borderRadius: 10, paddingHorizontal: 13, height: 48 },
  adicionar: { width: 48, marginLeft: 8, backgroundColor: "#0064A0", borderRadius: 10, alignItems: "center", justifyContent: "center" },
  adicionarTexto: { color: "#FFFFFF", fontSize: 28, fontWeight: "500", marginTop: -3 },
  acao: { color: "#8190A5", fontSize: 10, marginTop: -5, marginBottom: 8, marginLeft: 4 },
  vazio: { color: "#718096", fontStyle: "italic", marginVertical: 8 }
});