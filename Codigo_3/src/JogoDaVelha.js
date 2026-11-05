import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const linhasVitoria = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

export default function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [vez, setVez] = useState("X");

  const vencedor = linhasVitoria
    .map(([a,b,c]) => tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c] ? tabuleiro[a] : null)
    .find(Boolean);
  const empate = !vencedor && tabuleiro.every(Boolean);

  const jogar = (index) => {
    if (tabuleiro[index] || vencedor) return;
    const novo = [...tabuleiro];
    novo[index] = vez;
    setTabuleiro(novo);
    setVez(vez === "X" ? "O" : "X");
  };

  const reiniciar = () => { setTabuleiro(Array(9).fill(null)); setVez("X"); };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{vencedor ? `Vencedor: ${vencedor}` : empate ? "Empate!" : `Vez do jogador: ${vez}`}</Text>
      <View style={styles.grade}>
        {tabuleiro.map((valor, index) => (
          <TouchableOpacity key={index} style={styles.celula} onPress={() => jogar(index)}>
            <Text style={[styles.marca, valor === "X" ? styles.x : styles.o]}>{valor || ""}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.reiniciar} onPress={reiniciar}>
        <Text style={styles.reiniciarTexto}>Reiniciar jogo</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, alignItems: "center" },
  status: { color: "#183253", fontSize: 16, fontWeight: "800", marginBottom: 14 },
  grade: { width: 270, height: 270, flexDirection: "row", flexWrap: "wrap" },
  celula: { width: "33.333%", height: "33.333%", borderWidth: 1.5, borderColor: "#9CB0C8", alignItems: "center", justifyContent: "center" },
  marca: { fontSize: 48, fontWeight: "900" },
  x: { color: "#0064A0" },
  o: { color: "#E18B32" },
  reiniciar: { backgroundColor: "#14325A", paddingVertical: 11, paddingHorizontal: 22, borderRadius: 9, marginTop: 15 },
  reiniciarTexto: { color: "#FFFFFF", fontWeight: "800" }
});