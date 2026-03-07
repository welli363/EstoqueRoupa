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

  const handleLogin = () => {
    if (email === "/^\S+@\S+\.\S+$/" && senha.trim().length >= 6) {
      router.replace("/(tabs)")
  } else {
      alert("Email ou senha inválidos. Por favor, tente novamente.")
  }

}



  return (
    <View style={styles.container}>
        <View style={styles.borderIcon}>
          <MaterialCommunityIcons name="store-outline" size={40} color="white" style={styles.iconStore}/>
        </View>
        <View style={styles.containerText}>
            <Text style={styles.textTitle}>Bem-vindo</Text>
            <Text style={styles.textSubTitle}>Acesse para gerenciar seu estoque</Text>
        </View>
        <View style={[styles.containerInput,
          { borderColor: emailFocused ? "#8b58e4" : "#ccc" }
        ]}>
            <Fontisto name="email" size={20} color="gray" />
            <TextInput placeholder="lojista@exemple.com" 
              style={styles.input}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}

            />
        </View>

        <View style={[styles.containerInput,
          { borderColor: senhaFocused ? "#8b58e4" : "#ccc" }
        ]}>
            <Entypo name="lock" size={20} color="gray" />
            <TextInput placeholder="*****"
              style={styles.input}
                  onFocus={() => setSenhaFocused(true)}
                  onBlur={() => setSenhaFocused(false)}
            
            />
        </View>


        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.textButton}>Entrar na conta</Text>
            <AntDesign name="arrow-right" size={20} color="white" />
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
    backgroundColor: "#7C3AED",
    padding: 12,
    borderRadius: 15,
    height: 55,
    width: "90%",
    margin: 10
  },
  textButton:{
    color: "white",
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
    borderColor: "#7C3AED",
    backgroundColor: "#7C3AED",
    borderRadius: 22,
    transform: [{ rotate: '10deg' }]
  }
})
