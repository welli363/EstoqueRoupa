import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Movimentacao = {
  id: string;
  tipo: 'entrada' | 'saida';
  descricao: string;
  valor: string;
};

export default function FinancasScreen() {

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'entrada' | 'saida'>('entrada');
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

  // 🔹 CARREGAR
  useEffect(() => {
    async function carregar() {
      const dados = await AsyncStorage.getItem('movimentacoes');
      if (dados) {
        setMovimentacoes(JSON.parse(dados));
      }
    }
    carregar();
  }, []);

  // 🔹 SALVAR
  async function salvarMovimentacoes(lista: Movimentacao[]) {
    await AsyncStorage.setItem('movimentacoes', JSON.stringify(lista));
  }

  // 🔹 SALDO
  const saldo = movimentacoes.reduce((total, item) => {
    return item.tipo === 'entrada'
      ? total + Number(item.valor)
      : total - Number(item.valor);
  }, 0);

  // 🔹 ADICIONAR
  function adicionarMovimentacao() {
    if (!descricao || !valor) return;

    const nova: Movimentacao = {
      id: Date.now().toString(),
      tipo,
      descricao,
      valor
    };

    const novaLista = [...movimentacoes, nova];

    setMovimentacoes(novaLista);
    salvarMovimentacoes(novaLista);

    setDescricao('');
    setValor('');
    setTipo('entrada');
  }

  // 🔹 REMOVER
  function remover(id: string) {
    const novaLista = movimentacoes.filter((item) => item.id !== id);

    setMovimentacoes(novaLista);
    salvarMovimentacoes(novaLista);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Finanças</Text>

      <Text style={styles.saldo}>
        Saldo: R$ {saldo.toFixed(2)}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <View style={styles.tipoContainer}>
        <TouchableOpacity
          onPress={() => setTipo('entrada')}
          style={[
            styles.tipoBotao,
            tipo === 'entrada' && { backgroundColor: '#12d404' }
          ]}
        >
          <Text style={styles.tipoTexto}>Entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTipo('saida')}
          style={[
            styles.tipoBotao,
            tipo === 'saida' && { backgroundColor: '#ee1f1f' }
          ]}
        >
          <Text style={styles.tipoTexto}>Saída</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={adicionarMovimentacao}
        style={styles.botaoAdicionar}
      >
        <Text style={styles.botaoTexto}>Adicionar</Text>
      </TouchableOpacity>

      <FlatList
        data={movimentacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitulo}>{item.descricao}</Text>

              <Text>
                {item.tipo === 'entrada' ? '🟢 Entrada' : '🔴 Saída'}
              </Text>

              <Text style={{
                color: item.tipo === 'entrada' ? 'green' : 'red'
              }}>
                R$ {item.valor}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => remover(item.id)}
            >
              <Text style={styles.textoRemover}>X</Text>
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

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },

  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },

  // BOTÕES ENTRADA / SAÍDA
  tipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },

  tipoBotao: {
    width: '48%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center'
  },

  tipoTexto: {
    fontWeight: 'bold'
  },

  // BOTÃO ADICIONAR
  botaoAdicionar: {
    backgroundColor: '#ffee00',
    borderWidth: 1,
    width: '70%',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: 'center'
  },

  botaoTexto: {
    textAlign: 'center',
    fontWeight: 'bold'
  },

  // SALDO
  saldo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15
  },

  // LISTA
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10
  },

  itemInfo: {
    flex: 1
  },

  itemTitulo: {
    fontWeight: 'bold'
  },

  // BOTÃO REMOVER
  botaoRemover: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5
  },

  textoRemover: {
    color: 'white',
    fontWeight: 'bold'
  }
});
 