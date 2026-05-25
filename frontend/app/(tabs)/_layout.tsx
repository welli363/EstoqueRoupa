import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useColorScheme } from "react-native";

const Colors = {
  light: {
    text: "#fff",
    background: "#fff",
    tint: "#ffee00",
    tabIconDefault: "#ccc",
    tabIconSelected: "#ffee00",
  },
  dark: {
    text: "#fff",
    background: "#fff",
    tint: "#ffee00",
    tabIconDefault: "#ccc",
    tabIconSelected: "#ffee00",
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: "#e0e0e0",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Bem-vindo",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="house" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="estoque"
        options={{
          title: "Estoque",
          headerTitle: "Gerenciar Estoque",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="box-open" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="financas"
        options={{
          title: "Finanças",
          headerTitle: "Relatório Financeiro",
          tabBarIcon: ({ color, size }) => (
            <Feather name="dollar-sign" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
