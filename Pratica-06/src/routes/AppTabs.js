import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Configuracoes from "../screens/Configuracoes";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1769AA",
        tabBarInactiveTintColor: "#98A2B3",
        headerStyle: { backgroundColor: "#17365D" },
        headerTintColor: "#FFF",
        tabBarStyle: { paddingBottom: 5, height: 60 }
      }}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Ajustes" component={Configuracoes} />
    </Tab.Navigator>
  );
}
