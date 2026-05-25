import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";
import { useState, useEffect } from "react";

type Produto = {
  id: string;
  nome: string;
  tamanho: string;
  quantidade: string;
};

export default function Estoque() {

  const API_URL = 'http://192.168.0.180:3000';

  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // 🔹 CARREGAR
useEffect(() => {
  buscarProdutos();
}, []);


async function buscarProdutos() {
  try {
    const response = await fetch(`${API_URL}/produtos`);
    const data = await response.json();
    setProdutos(data);
  } catch (error) {
    console.log('Erro ao buscar:', error);
  }
}

  // 🔹 ADICIONAR
  async function adicionar() {
    if (!nome || !tamanho || !quantidade) return;

    const novoProduto: Produto = {
      id: Date.now().toString(),
      nome,
      tamanho,
      quantidade
    };

    try{
      await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, body: JSON.stringify(novoProduto)
      });

     await buscarProdutos();

      setNome('');
      setTamanho('');
      setQuantidade('');

    }catch (error){
      console.log('Erro ao adicionar:', error)
    }
  }

  // 🔹 REMOVER
async function remover(id: string) {
  try {
    await fetch(`${API_URL}/produtos/${id}`, {
      method: 'DELETE'
    });

    await buscarProdutos();

  } catch (error) {
    console.log('Erro ao remover:', error);
  }
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