import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { UserContext } from '../UserContext';
import { useContext } from 'react';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Por favor, informe o nome de usuário e a senha.');
      return;
    }

    try {
      const response = await fetch('https://grupofmv.app.br/api/v1/integracao/loginApp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (responseData.status === 1) {
        setUser(responseData.user);
        setUsername('');
        setPassword('');
        navigation.navigate('AppDrawers')
      } else if (responseData.status === 2) {
        alert('Nome de usuário ou senha incorretos.');
      } else if (responseData.status === 3) {
        alert('Erro desconhecido (Erro 3).');
      }
    } catch (error) {
      console.error('Erro ao efetuar o login:', error);
      alert('Ocorreu um erro ao efetuar o login. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../assets/LogoNova.png')} style={styles.logo} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4E54C8',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    fontFamily: 'Arial',
    backgroundColor: 'white',
  },
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#4E54C8',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
