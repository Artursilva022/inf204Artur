# Prática 06 - React Navigation

## Instalação
Dentro desta pasta:
```bash
npm install
npx expo install react-native-screens react-native-safe-area-context
npm start
```
Se o npm não instalar as bibliotecas de navegação automaticamente:
```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
```

## O que foi implementado
- Navegação Stack e Bottom Tabs.
- Telas Início, Ajustes e Detalhes.
- Envio do objeto `contato` por `route.params`.
- Retorno com `navigation.goBack()`.
- Cores de abas ativas e inativas.
- Ação para limpar a agenda.
