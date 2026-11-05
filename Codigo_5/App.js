import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const contatosIniciais = [
  { id: "1", nome: "Alice Silva", telefone: "(31) 99999-1111" },
  { id: "2", nome: "Bruno Costa", telefone: "(31) 98888-2222" },
  { id: "3", nome: "Carlos Souza", telefone: "(31) 97777-3333" },
  { id: "4", nome: "Diana Rocha", telefone: "(31) 96666-4444" },
  { id: "5", nome: "Eduardo Lima", telefone: "(31) 95555-5555" },
  { id: "6", nome: "Fernanda Alves", telefone: "(31) 94444-6666" },
  { id: "7", nome: "Gabriel Mendes", telefone: "(31) 93333-7777" },
  { id: "8", nome: "Helena Martins", telefone: "(31) 92222-8888" },
  { id: "9", nome: "Igor Ferreira", telefone: "(31) 91111-9999" },
  { id: "10", nome: "Juliana Ribeiro", telefone: "(31) 90000-1010" },
  { id: "11", nome: "Lucas Almeida", telefone: "(31) 99999-2020" },
  { id: "12", nome: "Mariana Oliveira", telefone: "(31) 98888-3030" },
  { id: "13", nome: "Nicolas Santos", telefone: "(31) 97777-4040" },
  { id: "14", nome: "Patricia Gomes", telefone: "(31) 96666-5050" },
  { id: "15", nome: "Rafael Carvalho", telefone: "(31) 95555-6060" },
];

export default function App() {
  const [contatos, setContatos] = useState(contatosIniciais);
  const [carregando, setCarregando] = useState(false);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [proximoId, setProximoId] = useState(16);

  const atualizarAgenda = useCallback(() => {
    if (carregando) return;

    setCarregando(true);
    setTimeout(() => {
      setContatos(contatosIniciais);
      setProximoId(16);
      setCarregando(false);
    }, 2000);
  }, [carregando]);

  const carregarMaisContatos = useCallback(() => {
    if (carregandoMais || contatos.length === 0) return;

    setCarregandoMais(true);

    setTimeout(() => {
      const novosContatos = Array.from({ length: 3 }, (_, index) => {
        const id = proximoId + index;
        return {
          id: String(id),
          nome: `Contato ${id}`,
          telefone: `(31) 9${String(100000000 + id).slice(1, 10)}`,
        };
      });

      setContatos((listaAtual) => [...listaAtual, ...novosContatos]);
      setProximoId((idAtual) => idAtual + 3);
      setCarregandoMais(false);
    }, 800);
  }, [carregandoMais, contatos.length, proximoId]);

  const renderizarContato = ({ item }) => (
    <View style={styles.cardContato}>
      <View style={styles.avatar}>
        <Text style={styles.avatarTexto}>
          {item.nome.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.dadosContato}>
        <Text style={styles.nomeText}>{item.nome}</Text>
        <Text style={styles.telefoneText}>{item.telefone}</Text>
      </View>
    </View>
  );

  const renderizarSeparador = () => <View style={styles.separador} />;

  const renderizarVazio = () => (
    <View style={styles.containerVazio}>
      <Text style={styles.textoVazio}>Agenda Vazia.</Text>
      <Text style={styles.subtextoVazio}>
        Arraste a lista para baixo para carregar os contatos novamente.
      </Text>
    </View>
  );

  const renderizarRodape = () =>
    carregandoMais ? (
      <View style={styles.rodape}>
        <ActivityIndicator size="small" color="#14325A" />
        <Text style={styles.textoRodape}>Carregando contatos...</Text>
      </View>
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Minha Agenda</Text>
          <Text style={styles.subtitulo}>
            {contatos.length} contato(s) salvo(s)
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoLimpar}
          activeOpacity={0.8}
          onPress={() => {
            setContatos([]);
            setProximoId(16);
          }}
        >
          <Text style={styles.textoBotao}>Limpar Tudo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarContato}
        ItemSeparatorComponent={renderizarSeparador}
        ListEmptyComponent={renderizarVazio}
        ListFooterComponent={renderizarRodape}
        contentContainerStyle={
          contatos.length === 0 ? styles.listaVazia : styles.lista
        }
        refreshing={carregando}
        onRefresh={atualizarAgenda}
        onEndReached={carregarMaisContatos}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 12,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
    marginTop: 12,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
  },
  subtitulo: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
  },
  botaoLimpar: {
    backgroundColor: "#D32F2F",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
  },
  lista: {
    paddingBottom: 20,
  },
  listaVazia: {
    flexGrow: 1,
  },
  cardContato: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#DCE8F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },
  avatarTexto: {
    color: "#14325A",
    fontSize: 18,
    fontWeight: "bold",
  },
  dadosContato: {
    flex: 1,
  },
  nomeText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },
  telefoneText: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
  },
  separador: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginLeft: 73,
  },
  containerVazio: {
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 70,
  },
  textoVazio: {
    fontSize: 20,
    color: "#808080",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  subtextoVazio: {
    color: "#888",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },
  textoRodape: {
    color: "#14325A",
    marginLeft: 9,
  },
});
