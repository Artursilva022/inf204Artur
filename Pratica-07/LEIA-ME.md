# Prática 07 - Axios e API REST

## Instalação
```bash
npm install
npm install axios
npx expo start
```
O arquivo `.env` já está configurado com `https://jsonplaceholder.typicode.com`.
Depois de alterar `.env`, reinicie o Expo. Se necessário, use `npx expo start --clear`.

## O que foi implementado
- Instância Axios isolada em `src/services/api.js`.
- GET `/users` dentro de `useEffect`.
- `try/catch/finally` e `ActivityIndicator`.
- Pull-to-refresh na FlatList.
- Formulário com Nome e E-mail e envio via POST.
- Alertas de sucesso e erro.

## Observação
JSONPlaceholder é uma API de testes. O POST retorna uma resposta simulada e não grava o usuário permanentemente no servidor.
