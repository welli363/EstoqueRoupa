import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-screens";
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React  from 'react';
import {useRouter} from "expo-router";
import {useState} from "react";



export default function Index() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try{
      const response = await fetch("http://192.168.0.180:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, senha})
      });

      const data = await response.json();

      if(response.ok){
        router.replace("/(tabs)")
      }else{
        alert(data.erro || "Erro ao fazer login")
      }
    }catch (error){
      alert("Erro ao conectar com o servidor")
    }
  }



  return (
    <View style={styles.container}>
        <View style={styles.borderIcon}>
          <MaterialCommunityIcons name="store-outline" size={40} color="black" style={styles.iconStore}/>
        </View>
        <View style={styles.containerText}>
            <Text style={styles.textTitle}>Bem-vindo</Text>
            <Text style={styles.textSubTitle}>Acesse para gerenciar seu estoque</Text>
        </View>
        <View style={[styles.containerInput,
          { borderColor: emailFocused ? "#ffee00" : "#ccc" }
        ]}>
            <Fontisto name="email" size={20} color="gray" />
            <TextInput
              placeholder="lojista@exemple.com"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
        </View>

        <View style={[styles.containerInput,
          { borderColor: senhaFocused ? "#ffee00" : "#ccc" }
        ]}>
            <Entypo name="lock" size={20} color="gray" />
            <TextInput
              placeholder="*****"
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              onFocus={() => setSenhaFocused(true)}
              onBlur={() => setSenhaFocused(false)}
              secureTextEntry={true}
            />
        </View>


        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.textButton}>Entrar na conta</Text>
            <AntDesign name="arrow-right" size={20} color="black" />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: 'center',
    margin: 55,
  },
  textTitle:{
    fontFamily: 'Roboto',
    fontSize: 28,
    fontWeight: '800',
  },
  containerText:{
    alignItems: 'center',
    margin: 30,
    gap: 10
  },
  textSubTitle:{
    fontFamily: 'Roboto',
    fontSize: 15,
    color: 'gray'
  },
  containerInput:{
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "#ebebeb",
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 50,
    gap: 10,
    margin: 15,
  },
  input:{
    flex: 1,
  },
  button:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffee00",
    padding: 12,
    borderRadius: 15,
    height: 55,
    width: "90%",
    margin: 10
  },
  textButton:{
    color: "black",
    fontWeight:"bold",
    marginRight: 8
  },
  iconStore:{
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      transform: [{ rotate: '-10deg' }]
  },
  borderIcon:{
    borderWidth: 0.5,
    marginTop: 150,
    borderColor: "#ffee00",
    backgroundColor: "#ffee00",
    borderRadius: 22,
    transform: [{ rotate: '10deg' }]
  }
})
