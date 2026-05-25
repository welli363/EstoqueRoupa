import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Produto = {
  id: string;
  nome: string;
  tamanho: string;
  quantidade: string;
};

type Movimentacao = {
  id: string;
  tipo: 'entrada' | 'saida';
  descricao: string;
  valor: string;
};

export default function HomeScreen() {

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

  useEffect(() => {
    async function carregarDados() {
      const dadosProdutos = await AsyncStorage.getItem('produtos');
      const dadosMov = await AsyncStorage.getItem('movimentacoes');

      if (dadosProdutos) setProdutos(JSON.parse(dadosProdutos));
      if (dadosMov) setMovimentacoes(JSON.parse(dadosMov));
    }

    carregarDados();
  }, []);

  const saldo = movimentacoes.reduce((total, item) => {
    return item.tipo === 'entrada'
      ? total + Number(item.valor)
      : total - Number(item.valor);
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minha Loja</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>📦 Produtos</Text>
        <Text style={styles.cardValor}>{produtos.length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>💰 Saldo</Text>
        <Text style={styles.cardValor}>R$ {saldo.toFixed(2)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>📊 Movimentações</Text>
        <Text style={styles.cardValor}>{movimentacoes.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20
  },

  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  },

  cardTitulo: {
    fontSize: 16
  },

  cardValor: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5
  }
});