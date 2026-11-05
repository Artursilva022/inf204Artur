import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function entrar() {
    try {
      setEnviando(true);
      await signIn(email, senha);
    } catch (erro) {
      Alert.alert("Não foi possível entrar", erro.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Agenda</Text>
      <Text style={styles.subtitulo}>Entre para acessar seus contatos</Text>
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <TouchableOpacity style={styles.botao} onPress={entrar} disabled={enviando}>
        {enviando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.textoBotao}>Entrar</Text>}
      </TouchableOpacity>
      <Text style={styles.aviso}>Demonstração acadêmica: qualquer e-mail e senha não vazios são aceitos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "#F3F6FA", padding: 24 },
  titulo: { fontSize: 29, fontWeight: "bold", color: "#17365D", textAlign: "center" },
  subtitulo: { color: "#667085", textAlign: "center", marginTop: 8, marginBottom: 25 },
  input: { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#D0D5DD", borderRadius: 9, padding: 14, marginBottom: 12 },
  botao: { backgroundColor: "#1769AA", padding: 15, borderRadius: 9, alignItems: "center" },
  textoBotao: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  aviso: { color: "#667085", fontSize: 12, textAlign: "center", marginTop: 18 }
});
