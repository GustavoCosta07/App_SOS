import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WelcomeMessage = ({ username }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Bem-vindo, {username}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: -10,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E54C8'
  },
});

export default WelcomeMessage;
