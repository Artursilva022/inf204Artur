import React, { useCallback, useEffect, useState } from "react";
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, RefreshControl, TextInput, Alert, KeyboardAvoidingView, Platform
} from "react-native";
import api from "./src/services/api";

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  const buscarUsuarios = useCallback(async (ehAtualizacao = false) => {
    if (ehAtualizacao) setAtualizando(true);
    else setCarregando(true);

    try {
      const resposta = await api.get("/users");
      setUsuarios(resposta.data);
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível carregar os usuários. Verifique sua conexão.");
      console.error("Erro ao buscar usuários:", erro.message);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  useEffect(() => {
    buscarUsuarios();
  }, [buscarUsuarios]);

  async function cadastrarUsuario() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert("Atenção", "Preencha nome e e-mail.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await api.post("/users", {
        name: nome.trim(),
        email: email.trim()
      });
      Alert.alert("Sucesso", `Usuário enviado. ID retornado: ${resposta.data.id}`);
      setNome("");
      setEmail("");
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível enviar o cadastro.");
      console.error("Erro no POST:", erro.message);
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1769AA" />
        <Text style={styles.ajuda}>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Text style={styles.titulo}>Agenda - API</Text>
      <Text style={styles.subtitulo}>Usuários recebidos do servidor</Text>

      <FlatList
        style={styles.lista}
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        refreshControl={<RefreshControl refreshing={atualizando} onRefresh={() => buscarUsuarios(true)} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nomeUsuario}>{item.name}</Text>
            <Text style={styles.emailUsuario}>{item.email}</Text>
            <Text style={styles.telefone}>{item.phone}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.ajuda}>Nenhum usuário encontrado.</Text>}
      />

      <View style={styles.formulario}>
        <Text style={styles.tituloForm}>Cadastrar usuário (POST)</Text>
        <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TouchableOpacity style={styles.botao} onPress={cadastrarUsuario} disabled={enviando}>
          {enviando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.textoBotao}>Enviar cadastro</Text>}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F6FA", paddingTop: 55, paddingHorizontal: 18 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 27, fontWeight: "bold", color: "#17365D" },
  subtitulo: { color: "#667085", marginTop: 5, marginBottom: 12 },
  lista: { flexGrow: 0, maxHeight: "43%" },
  card: { backgroundColor: "#FFF", padding: 14, borderRadius: 10, marginBottom: 9, elevation: 2 },
  nomeUsuario: { fontSize: 17, fontWeight: "bold", color: "#172B4D" },
  emailUsuario: { color: "#475467", marginTop: 4 },
  telefone: { color: "#667085", marginTop: 3 },
  ajuda: { color: "#667085", marginTop: 12 },
  formulario: { backgroundColor: "#FFF", padding: 15, borderRadius: 12, marginTop: 10, marginBottom: 18, elevation: 2 },
  tituloForm: { fontSize: 18, fontWeight: "bold", color: "#17365D", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#D0D5DD", borderRadius: 8, padding: 12, marginBottom: 9, backgroundColor: "#FFF" },
  botao: { backgroundColor: "#1769AA", padding: 14, borderRadius: 9, alignItems: "center" },
  textoBotao: { color: "#FFF", fontWeight: "bold" }
});
