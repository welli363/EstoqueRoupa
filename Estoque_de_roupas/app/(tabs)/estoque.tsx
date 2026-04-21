import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Produto = {
  id: string;
  nome: string;
  tamanho: string;
  quantidade: string;
};

export default function Estoque() {

  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // 🔹 CARREGAR
  useEffect(() => {
    async function carregarProdutos() {
      const dados = await AsyncStorage.getItem('produtos');
      if (dados) {
        setProdutos(JSON.parse(dados));
      }
    }
    carregarProdutos();
  }, []);

  // 🔹 SALVAR
  async function salvarProdutos(lista: Produto[]) {
    await AsyncStorage.setItem('produtos', JSON.stringify(lista));
  }

  // 🔹 ADICIONAR
  function adicionar() {
    if (!nome || !tamanho || !quantidade) return;

    const novoProduto: Produto = {
      id: Date.now().toString(),
      nome,
      tamanho,
      quantidade
    };

    const novaLista = [...produtos, novoProduto];

    setProdutos(novaLista);
    salvarProdutos(novaLista);

    setNome('');
    setTamanho('');
    setQuantidade('');
  }

  // 🔹 REMOVER
  function remover(id: string) {
    const novaLista = produtos.filter((item) => item.id !== id);

    setProdutos(novaLista);
    salvarProdutos(novaLista);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Estoque</Text>

      <TextInput
        style={styles.inputs}
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.inputs}
        placeholder="Tamanho (P, M, G...)"
        value={tamanho}
        onChangeText={setTamanho}
      />

      <TextInput
        style={styles.inputs}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={adicionar} style={styles.button}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Adicionar
        </Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
              <Text>Tamanho: {item.tamanho}</Text>
              <Text>Qtd: {item.quantidade}</Text>
            </View>

            <TouchableOpacity
              onPress={() => remover(item.id)}
              style={styles.botaoRemover}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Remover
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20
      },
      titulo:{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
      },
      inputs: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      },
      button: {
        backgroundColor: '#ffee00',
        borderWidth: 1,
        width: '100%',
        padding: 12,
        borderRadius: 10,
        marginTop: 30
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginTop: 10
      },

      botaoRemover: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5
      }
      
});