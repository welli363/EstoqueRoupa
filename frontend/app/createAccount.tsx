import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import {useState} from "react";

export default function CreateAccount(){
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleCreateAccount = async () => {
    try{
      if (!nome || !email || !senha){
      alert("Preencha todos os campos")
      return;
    }
    const response = await fetch("http://192.168.0.180:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({nome, email, senha})
    });

    const data = await response.json();

    if(response.ok){
      alert("Conta criada com sucesso!")
    }else{
      alert(data.message)
    }
    }catch(error){
      alert("Erro ao conectar com o servidor")
    }
  }



    return (
        <View>
            <Text>Criar Conta</Text>
            <TextInput placeholder="Nome" 
            value={nome} 
            onChangeText={setNome}></TextInput>
            <TextInput placeholder="Email" 
            value={email} 
            onChangeText={setEmail}></TextInput>
            <TextInput placeholder="Senha" 
            value={senha} 
            onChangeText={setSenha} 
            secureTextEntry={true}></TextInput>

            <TouchableOpacity onPress={handleCreateAccount}>
                <Text>Criar Conta</Text>
            </TouchableOpacity>
        </View>
    )
}