import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";

interface Produto {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
}

export default function EstoqueScreen() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");

  const adicionarProduto = () => {
    if (nome.trim() && quantidade && preco) {
      const novoProduto: Produto = {
        id: Date.now().toString(),
        nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
      };
      setProdutos([...produtos, novoProduto]);
      setNome("");
      setQuantidade("");
      setPreco("");
      setShowForm(false);
    }
  };

  const removerProduto = (id: string) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  return (
    <View style={styles.container}>
      {produtos.length === 0 ? (
        <View style={styles.emptyState}>
          <FontAwesome5 name="box-open" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum produto cadastrado</Text>
          <Text style={styles.emptySubtext}>
            Clique no botão + para adicionar produtos
          </Text>
        </View>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.produtoCard}>
              <View style={styles.produtoInfo}>
                <Text style={styles.produtoNome}>{item.nome}</Text>
                <Text style={styles.produtoDetalhes}>
                  Qtd: {item.quantidade} | R$ {item.preco.toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => removerProduto(item.id)}
                style={styles.deleteBtn}
              >
                <Text style={styles.deleteBtnText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Adicionar Produto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            value={preco}
            onChangeText={setPreco}
            keyboardType="decimal-pad"
          />
          <View style={styles.formButtons}>
            <TouchableOpacity
              style={[styles.formBtn, styles.cancelBtn]}
              onPress={() => setShowForm(false)}
            >
              <Text style={styles.formBtnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.formBtn, styles.submitBtn]}
              onPress={adicionarProduto}
            >
              <Text style={styles.formBtnText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowForm(!showForm)}
      >
        <Text style={styles.fabText}>{showForm ? "✕" : "+"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 8,
  },
  produtoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  produtoDetalhes: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ff6b6b",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#8b58e4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  formContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  formButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  formBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#ddd",
  },
  submitBtn: {
    backgroundColor: "#8b58e4",
  },
  formBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
