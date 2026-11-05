# Prática 08 - AsyncStorage e SQLite

## Instalação
```bash
npm install
npx expo install @react-native-async-storage/async-storage expo-sqlite
npx expo start
```

## O que foi implementado
- `SQLiteProvider` e `useSQLiteContext`.
- Criação automática da tabela `contatos`.
- SELECT, INSERT e DELETE no SQLite.
- Consultas parametrizadas com `?` e valores separados.
- AsyncStorage para guardar um objeto de preferência.
- `JSON.stringify()` ao salvar e `JSON.parse()` ao recuperar.

## Observação
Os contatos ficam salvos localmente no aparelho/emulador. Não são enviados para uma API.
