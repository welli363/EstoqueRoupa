import { StyleSheet, Text, View, TextInput, Button, FlatList} from "react-native";
import { useState } from "react";



type Produto = {
  id: string;
  nome: string;
  tamanho: string;
  quantidade: string;
};


export default function EStoque() {
    
  const [nome, setNome] = useState(''); 
  const [tamanho, setTamanho] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);

  function adicionar() {
    if(!nome || !tamanho || !quantidade) return;

    const novoProduto = {
      id: Date.now().toString(),
      nome,
      tamanho,
      quantidade
    };

    setProdutos([...produtos, novoProduto]);
    setNome('');
    setTamanho('');
    setQuantidade('');
  } 

  return (
    <View>
      <Text>ESTOQUE</Text>
      <TextInput
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Tamanho (P, M, G..."
        value={tamanho}
        onChangeText={setTamanho}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <Button title="Adicionar" onPress={adicionar}/>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem ={({item}) => (
          <Text>
            {item.nome} - {item.tamanho} - {item.quantidade}
          </Text>
        )}
      />
      

    </View>
  );
}

const styles = StyleSheet.create({

});