import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {LinearGradient} from "expo-linear-gradient";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Olá, Lojista</Text>
        <Text>Visão Geral</Text>
        <View>
          <Text>Saldo Atual</Text>
          <Text>R$ 0,00</Text>
          <View>
            <Text>Entradas</Text>
            <Text>R$ 0,00</Text>
          </View>
          <View>
            <Text>Saídas</Text>
            <Text>R$ 0,00</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex: 1,

    },
    header:{
      borderWidth: 1,
      borderColor: "#000"
    }
});
