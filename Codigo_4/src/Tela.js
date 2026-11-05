import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function Pratica04({ onVoltar }) {
  const [votosA, setVotosA] = useState(0);
  const [votosB, setVotosB] = useState(0);
  const [votosC, setVotosC] = useState(0);
  const [nomeMesario, setNomeMesario] = useState("");

  const totalVotos = votosA + votosB + votosC;
  const porcentagem = (votos) => totalVotos === 0 ? "0,0" : ((votos / totalVotos) * 100).toFixed(1).replace(".", ",");
  const zerarUrna = () => { setVotosA(0); setVotosB(0); setVotosC(0); };

  const candidatos = [
    { nome: "Candidato A", votos: votosA, votar: () => setVotosA(prev => prev + 1), percentual: porcentagem(votosA) },
    { nome: "Candidato B", votos: votosB, votar: () => setVotosB(prev => prev + 1), percentual: porcentagem(votosB) },
    { nome: "Candidato C", votos: votosC, votar: () => setVotosC(prev => prev + 1), percentual: porcentagem(votosC) }
  ];

  return (
    <View style={styles.tela}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.mesario}>
          <Text style={styles.rotulo}>IDENTIFICAÇÃO DO MESÁRIO</Text>
          <TextInput style={styles.input} value={nomeMesario} onChangeText={setNomeMesario} placeholder="Digite o nome do mesário..." />
          <Text style={styles.mensagem}>Mesário atual: {nomeMesario.trim() || "Não informado"}</Text>
        </View>
        <Text style={styles.secao}>Painel de votação</Text>
        {candidatos.map(candidato => (
          <View key={candidato.nome} style={styles.candidato}>
            <Text style={styles.nome}>{candidato.nome}</Text>
            <Text style={styles.votos}>{candidato.votos} votos • {candidato.percentual}%</Text>
            <View style={styles.trilho}><View style={[styles.progresso, { width: `${Number(candidato.percentual.replace(",", "."))}%` }]} /></View>
            <TouchableOpacity style={styles.botao} onPress={candidato.votar}>
              <Text style={styles.botaoTexto}>Votar em {candidato.nome.slice(-1)}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.rodape}>
          <Text style={styles.total}>Total de votos: {totalVotos}</Text>
          <TouchableOpacity style={styles.zerar} onPress={zerarUrna}>
            <Text style={styles.botaoTexto}>Zerar urna</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.nota}>O percentual é calculado diretamente a partir do total, sem criar um estado duplicado. Quando não há votos, todos os percentuais permanecem em 0,0%.</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#F3F6FA" },
  conteudo: { padding: 20, paddingBottom: 35 },
  mesario: { backgroundColor: "#FFFFFF", padding: 16, borderRadius: 14, marginBottom: 18 },
  rotulo: { color: "#718096", fontSize: 10, fontWeight: "800", letterSpacing: 1, marginBottom: 9 },
  input: { borderWidth: 1, borderColor: "#D5DDE7", borderRadius: 9, padding: 12, color: "#183253" },
  mensagem: { color: "#0064A0", fontWeight: "700", marginTop: 10 },
  secao: { color: "#183253", fontSize: 18, fontWeight: "800", marginBottom: 10 },
  candidato: { backgroundColor: "#FFFFFF", borderRadius: 14, padding: 16, marginBottom: 12, elevation: 2 },
  nome: { color: "#183253", fontSize: 17, fontWeight: "800" },
  votos: { color: "#65738A", marginTop: 5, marginBottom: 10 },
  trilho: { height: 8, backgroundColor: "#E7EDF4", borderRadius: 5, overflow: "hidden", marginBottom: 12 },
  progresso: { height: 8, backgroundColor: "#1595C8", borderRadius: 5 },
  botao: { backgroundColor: "#0064A0", padding: 12, borderRadius: 9, alignItems: "center" },
  botaoTexto: { color: "#FFFFFF", fontWeight: "800" },
  rodape: { borderTopWidth: 1, borderColor: "#CFD8E3", paddingTop: 18, alignItems: "center", marginTop: 8 },
  total: { color: "#183253", fontSize: 21, fontWeight: "900", marginBottom: 12 },
  zerar: { backgroundColor: "#7B8794", padding: 13, borderRadius: 9, width: "100%", alignItems: "center" },
  nota: { color: "#52627A", fontSize: 13, lineHeight: 20, marginTop: 16 }
});