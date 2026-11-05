# Prática 09 - Context API e autenticação

## Instalação
```bash
npm install
npx expo install react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage
npm install @react-navigation/native @react-navigation/native-stack
npx expo start
```

## O que foi implementado
- `AuthContext` com `AuthProvider`.
- Hook personalizado `useAuth`.
- Funções `signIn` e `signOut`.
- Rotas condicionais: Login ou Dashboard.
- Proteção da tela principal pelo estado global.
- Bônus: `ThemeContext` com alternância claro/escuro.
- Bônus: sessão persistida com AsyncStorage e JSON.

## Aviso importante
O login é apenas demonstrativo: qualquer e-mail e senha preenchidos são aceitos. Para um sistema real, é necessário autenticar em um servidor, validar credenciais e proteger senhas.
