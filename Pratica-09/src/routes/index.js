import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";

const Stack = createNativeStackNavigator();

export default function Rotas() {
  const { logado, carregando } = useAuth();

  if (carregando) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="large" color="#1769AA" /></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {logado ? (
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: "Minha Agenda" }} />
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
