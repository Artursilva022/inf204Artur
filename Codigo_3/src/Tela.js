import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import JogoDaVelha from "./JogoDaVelha";

const perfis = [
  { nome: "João Vítor", profissao: "Engenheiro de Software", foto: "https://i.pravatar.cc/240?img=12" },
  { nome: "Maria Oliveira", profissao: "Desenvolvedora Mobile", foto: "https://i.pravatar.cc/240?img=47" },
  { nome: "Lucas Santos", profissao: "Designer de Interfaces", foto: "https://i.pravatar.cc/240?img=11" }
];

function CartaoPerfil({ perfil }) {
  const [nome, setNome] = useState(perfil.nome);
  const [seguindo, setSeguindo] = useState(false);
  return (
    <View style={styles.cartao}>
      <Image source={{ uri: perfil.foto }} style={styles.avatar} />
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.profissao}>{perfil.profissao}</Text>
      <TouchableOpacity style={[styles.botao, seguindo && styles.botaoDesativado]} onPress={() => setSeguindo(!seguindo)}>
        <Text style={styles.textoBotao}>{seguindo ? "Já seguindo" : "Seguir"}</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Alterar nome..." />
    </View>
  );
}

export default function Pratica03({ onVoltar }) {
  return (
    <View style={styles.tela}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.secao}>Cartões de perfil</Text>
        {perfis.map((perfil, index) => <CartaoPerfil key={index} perfil={perfil} />)}
        <Text style={styles.secao}>Jogo da velha</Text>
        <JogoDaVelha />
        <Text style={styles.nota}>Desafios extras implementados: botão muda de cor quando já está seguindo, três perfis em ScrollView e jogo da velha funcional para dois jogadores.</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#F3F6FA" },
  conteudo: { padding: 18, paddingBottom: 35 },
  secao: { color: "#183253", fontSize: 18, fontWeight: "800", marginTop: 14, marginBottom: 12 },
  cartao: { backgroundColor: "#FFFFFF", padding: 20, borderRadius: 16, alignItems: "center", marginBottom: 14, elevation: 2 },
  avatar: { width: 92, height: 92, borderRadius: 46, marginBottom: 10, backgroundColor: "#DDE7F0" },
  nome: { color: "#14325A", fontSize: 20, fontWeight: "800" },
  profissao: { color: "#64748B", marginTop: 4, marginBottom: 13 },
  botao: { backgroundColor: "#0064A0", paddingVertical: 10, paddingHorizontal: 28, borderRadius: 8, marginBottom: 12 },
  botaoDesativado: { backgroundColor: "#8A96A5" },
  textoBotao: { color: "#FFFFFF", fontWeight: "800" },
  input: { width: "100%", borderWidth: 1, borderColor: "#D5DDE7", borderRadius: 8, padding: 10, textAlign: "center" },
  nota: { color: "#52627A", fontSize: 13, lineHeight: 20, marginTop: 16 }
});