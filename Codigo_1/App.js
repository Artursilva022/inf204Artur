import React from "react";
import { View, StyleSheet } from "react-native";
import Tela from "./src/Tela";
export default function App() { return <View style={styles.container}><Tela /></View>; }
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: "#F3F6FA" } });