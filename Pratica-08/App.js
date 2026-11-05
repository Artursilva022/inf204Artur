import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet,
  Alert, ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

const CHAVE_PREFERENCIA = "@MinhaAgenda:usuario";

async function iniciarBanco(db) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS contatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT NOT NULL
    );
  `);
}

function Agenda() {
  const db = useSQLiteContext();
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [usuario, setUsuario] = useState({ nome: "Visitante", logado: true });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function inicializarTela() {
      try {
        const salvo = await AsyncStorage.getItem(CHAVE_PREFERENCIA);
        if (salvo) setUsuario(JSON.parse(salvo));
        await carregarContatos();
      } catch (erro) {
        console.error("Erro ao inicializar:", erro);
        Alert.alert("Erro", "Não foi possível carregar os dados locais.");
      } finally {
        setCarregando(false);
      }
    }
    inicializarTela();
  }, []);

  async function carregarContatos() {
    const resultado = await db.getAllAsync("SELECT * FROM contatos ORDER BY id DESC;");
    setContatos(resultado);
  }

  async function salvarPreferencia() {
    const novoUsuario = { nome: usuario.nome === "Visitante" ? "Estudante INF204" : usuario.nome, logado: true };
    try {
      await AsyncStorage.setItem(CHAVE_PREFERENCIA, JSON.stringify(novoUsuario));
      setUsuario(novoUsuario);
      Alert.alert("Preferência salva", `Nome salvo: ${novoUsuario.nome}`);
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível salvar a preferência.");
    }
  }

  async function adicionarContato() {
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert("Atenção", "Informe nome e telefone.");
      return;
    }
    try {
      // Os valores são enviados por bindings (?) para evitar injeção SQL.
      await db.runAsync("INSERT INTO contatos (nome, telefone) VALUES (?, ?);", [nome.trim(), telefone.trim()]);
      setNome("");
      setTelefone("");
      await carregarContatos();
    } catch (erro) {
      console.error("Erro ao inserir:", erro);
      Alert.alert("Erro", "Não foi possível adicionar o contato.");
    }
  }

  async function excluirContato(id) {
    try {
      await db.runAsync("DELETE FROM contatos WHERE id = ?;", [id]);
      await carregarContatos();
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível excluir o contato.");
    }
  }

  if (carregando) {
    return <View style={styles.centro}><ActivityIndicator size="large" color="#1769AA" /><Text>Carregando dados...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Agenda - SQLite</Text>
      <Text style={styles.subtitulo}>Olá, {usuario.nome}!</Text>
      <TouchableOpacity style={styles.botaoSecundario} onPress={salvarPreferencia}>
        <Text style={styles.textoBotao}>Salvar preferência de usuário</Text>
      </TouchableOpacity>

      <View style={styles.formulario}>
        <TextInput style={styles.input} placeholder="Nome do contato" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
        <TouchableOpacity style={styles.botao} onPress={adicionarContato}>
          <Text style={styles.textoBotao}>Adicionar contato</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.tituloLista}>Contatos salvos no banco local</Text>
      <FlatList
        data={contatos}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum contato salvo ainda.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nomeContato}>{item.nome}</Text>
              <Text style={styles.telefone}>{item.telefone}</Text>
            </View>
            <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluirContato(item.id)}>
              <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default function App() {
  return (
    <SQLiteProvider databaseName="minha-agenda.db" onInit={iniciarBanco}>
      <Agenda />
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F6FA", padding: 18, paddingTop: 55 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 25, fontWeight: "bold", color: "#17365D" },
  subtitulo: { fontSize: 16, color: "#475467", marginTop: 5, marginBottom: 10 },
  formulario: { backgroundColor: "#FFF", padding: 14, borderRadius: 12, marginTop: 12, marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#D0D5DD", borderRadius: 8, padding: 12, marginBottom: 9 },
  botao: { backgroundColor: "#1769AA", padding: 13, borderRadius: 9, alignItems: "center" },
  botaoSecundario: { backgroundColor: "#475467", padding: 11, borderRadius: 9, alignItems: "center" },
  textoBotao: { color: "#FFF", fontWeight: "bold" },
  tituloLista: { fontSize: 18, fontWeight: "bold", color: "#17365D", marginBottom: 8 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF", padding: 13, borderRadius: 10, marginBottom: 9 },
  nomeContato: { fontSize: 17, fontWeight: "bold", color: "#172B4D" },
  telefone: { color: "#667085", marginTop: 3 },
  botaoExcluir: { backgroundColor: "#B42318", padding: 10, borderRadius: 8 },
  vazio: { color: "#667085", textAlign: "center", marginTop: 20 }
});
