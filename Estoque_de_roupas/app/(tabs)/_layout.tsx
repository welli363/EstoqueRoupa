import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="house" size={24} color="#8b58e4" />
          ),
        }}
      />

      <Tabs.Screen
        name="estoque"
        options={{
          title: "Estoque",
          tabBarIcon: ({ color, size }) => (
           <FontAwesome5 name="box-open" size={24} color="#8b58e4" />
          ),
        }}
      />

      <Tabs.Screen
        name="financas"
        options={{
          title: "Finanças",
          tabBarIcon: ({ color, size }) => (
            <Feather name="dollar-sign" size={24} color="#8b58e4" />
          ),
        }}
      />
    </Tabs>
  );
}