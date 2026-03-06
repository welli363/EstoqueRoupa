import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-screens";
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import React  from 'react';
import {useState} from "react";



export default function Index() {
  const [emailFocused, setEmailFocused] = useState(false);
   const [senhaFocused, setSenhaFocused] = useState(false);

  return (
    <View style={styles.container}>
        <Ionicons name="storefront-sharp" size={24} color="black" />
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


        <TouchableOpacity style={styles.button}>
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
    margin: 40,
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
    borderRadius: 8,
    height: 55,
    width: "90%",
    margin: 10
  },
  textButton:{
    color: "white",
    fontWeight:"bold",
    marginRight: 8
  }
})
