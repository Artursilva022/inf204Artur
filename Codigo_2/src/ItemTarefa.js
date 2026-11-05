import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ItemTarefa({ tarefa }) {
  return (
    <View style={styles.card}>
      <Text style={[styles.status, tarefa.concluida ? styles.ok : styles.pendente]}>
        {tarefa.concluida ? "CONCLUÍDA" : "PENDENTE"}
      </Text>
      <Text style={styles.descricao}>{tarefa.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFFFFF", padding: 14, borderRadius: 12, marginBottom: 9, borderWidth: 1, borderColor: "#E5EAF1" },
  status: { fontSize: 10, fontWeight: "800", marginBottom: 5 },
  ok: { color: "#16834A" },
  pendente: { color: "#C07816" },
  descricao: { color: "#26364F", fontSize: 15 }
});