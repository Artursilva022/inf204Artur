import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function Pratica01({ onVoltar }) {
  const [contagem, setContagem] = useState(0);
  return (
    <View style={styles.tela}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.painel}>
          <Text style={styles.rotulo}>CONTAGEM ATUAL</Text>
          <Text style={styles.numero}>{contagem}</Text>
          <TouchableOpacity style={styles.botao} onPress={() => setContagem(prev => prev + 1)}>
            <Text style={styles.botaoTexto}>Incrementar +1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoSecundario} onPress={() => setContagem(prev => Math.max(0, prev - 1))}>
            <Text style={styles.botaoTexto}>Decrementar -1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoZerar} onPress={() => setContagem(0)}>
            <Text style={styles.botaoTexto}>Zerar contagem</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.nota}>Desafio extra implementado: decremento sem permitir números negativos, botão para zerar e botões personalizados com TouchableOpacity.</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#F3F6FA" },
  conteudo: { padding: 20 },
  painel: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 24, alignItems: "center", elevation: 3 },
  rotulo: { color: "#718096", fontWeight: "800", fontSize: 11, letterSpacing: 1.2 },
  numero: { color: "#14325A", fontSize: 64, fontWeight: "900", marginVertical: 15 },
  botao: { backgroundColor: "#0064A0", padding: 14, borderRadius: 10, width: "100%", alignItems: "center", marginBottom: 10 },
  botaoSecundario: { backgroundColor: "#52718F", padding: 14, borderRadius: 10, width: "100%", alignItems: "center", marginBottom: 10 },
  botaoZerar: { backgroundColor: "#26364F", padding: 14, borderRadius: 10, width: "100%", alignItems: "center" },
  botaoTexto: { color: "#FFFFFF", fontWeight: "800" },
  nota: { color: "#52627A", fontSize: 13, lineHeight: 20, marginTop: 18 }
});