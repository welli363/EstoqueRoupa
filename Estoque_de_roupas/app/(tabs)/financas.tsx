import { StyleSheet, Text, View, ScrollView } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function FinancasScreen() {
  // Dados de exemplo para o relatório financeiro
  const dados = {
    receita: 0,
    despesa: 0,
    lucro: 0,
    produtos: 0,
    valorEstoque: 0,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Relatório Financeiro</Text>
        <Text style={styles.headerSubtitle}>Período: Este Mês</Text>
      </View>

      <View style={styles.cardsContainer}>
        <View style={[styles.card, styles.cardReceita]}>
          <View style={styles.cardHeader}>
            <Feather name="arrow-down" size={24} color="#fff" />
            <Text style={styles.cardLabel}>Receita</Text>
          </View>
          <Text style={styles.cardValue}>R$ {dados.receita.toFixed(2)}</Text>
        </View>

        <View style={[styles.card, styles.cardDespesa]}>
          <View style={styles.cardHeader}>
            <Feather name="arrow-up" size={24} color="#fff" />
            <Text style={styles.cardLabel}>Despesa</Text>
          </View>
          <Text style={styles.cardValue}>R$ {dados.despesa.toFixed(2)}</Text>
        </View>

        <View style={[styles.card, styles.cardLucro]}>
          <View style={styles.cardHeader}>
            <Feather name="trending-up" size={24} color="#fff" />
            <Text style={styles.cardLabel}>Lucro</Text>
          </View>
          <Text style={styles.cardValue}>R$ {dados.lucro.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo do Estoque</Text>

        <View style={styles.resumoCard}>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Total de Produtos</Text>
            <Text style={styles.resumoValue}>{dados.produtos}</Text>
          </View>
          <View style={styles.resumoDivider} />
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Valor Total em Estoque</Text>
            <Text style={styles.resumoValue}>
              R$ {dados.valorEstoque.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dicas Financeiras</Text>

        <View style={styles.tipsCard}>
          <View style={styles.tip}>
            <View style={styles.tipIcon}>
              <Text style={styles.tipIconText}>💡</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Controle de Estoque</Text>
              <Text style={styles.tipText}>
                Mantenha um registro atualizado de todos os produtos para melhor
                controle financeiro
              </Text>
            </View>
          </View>

          <View style={styles.tip}>
            <View style={styles.tipIcon}>
              <Text style={styles.tipIconText}>📊</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Análise Regular</Text>
              <Text style={styles.tipText}>
                Revise seus relatórios semanalmente para identificar tendências
              </Text>
            </View>
          </View>

          <View style={styles.tip}>
            <View style={styles.tipIcon}>
              <Text style={styles.tipIconText}>🎯</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Metas de Vendas</Text>
              <Text style={styles.tipText}>
                Estabeleça metas realistas para aumentar sua rentabilidade
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#8b58e4",
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  cardsContainer: {
    padding: 16,
    gap: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardReceita: {
    backgroundColor: "#4CAF50",
  },
  cardDespesa: {
    backgroundColor: "#FF6B6B",
  },
  cardLucro: {
    backgroundColor: "#8b58e4",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  cardValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  resumoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  resumoItem: {
    paddingVertical: 12,
  },
  resumoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  resumoValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  resumoDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },
  tipsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tip: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  tipIconText: {
    fontSize: 20,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  tipText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
});
