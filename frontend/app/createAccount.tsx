import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function CreateAccount() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(true);

  const handleCreateAccount = async () => {
    try {
      if (!nome || !email || !senha) {
        alert("Preencha todos os campos");
        return;
      }

      const response = await fetch("http://192.168.0.180:3000/auth/usuarios", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const text = await response.text();
      console.log("RESPOSTA BRUTA:", text);

      if (response.ok) {
        alert("Conta criada com sucesso!");
      } else {
        alert(text);
      }
    } catch (error) {
        console.log("ERRO COMPLETO:", error);
        alert("Erro ao conectar");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Conta</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={mostrarSenha}
          style={styles.passwordInput}
        />

        <TouchableOpacity
          onPress={() => setMostrarSenha(!mostrarSenha)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={mostrarSenha ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
        <Text style={styles.textButton}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 60,
  },

  titulo: {
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 50,
    margin: 60,
  },

  input: {
    borderWidth: 2,
    backgroundColor: "#ebebeb",
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 50,
    margin: 15,
    width: "100%",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "#ebebeb",
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 50,
    margin: 15,
    width: "100%",
  },

  passwordInput: {
    flex: 1,
  },

  eyeButton: {
    padding: 5,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffee00",
    padding: 12,
    borderRadius: 15,
    height: 55,
    width: "90%",
    margin: 10,
  },

  textButton: {
    color: "black",
    fontWeight: "bold",
    marginRight: 8,
  },
});