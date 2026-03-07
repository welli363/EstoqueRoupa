import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialCommunityIcons
          name="store-outline"
          size={48}
          color="#8b58e4"
        />
        <Text style={styles.title}>Bem-vindo ao Estoque Roupa</Text>
        <Text style={styles.subtitle}>
          Gerencie seu estoque de forma simples e eficiente
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Produtos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>R$ 0</Text>
          <Text style={styles.statLabel}>Valor Total</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Dicas Rápidas</Text>
        <Text style={styles.infoText}>
          • Acesse a aba "Estoque" para adicionar novos produtos
        </Text>
        <Text style={styles.infoText}>
          • Consulte "Finanças" para ver relatórios detalhados
        </Text>
        <Text style={styles.infoText}>
          • Mantenha seus dados sempre atualizados
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8b58e4",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
});
