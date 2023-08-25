import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CallInfo = ({ callCount, countFontSize }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Você tem <Text style={[styles.callCount, { fontSize: countFontSize || 20 }]}>{callCount}</Text> chamados</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
  },
  callCount: {
    fontWeight: 'bold',
    color: '#4E54C8',
    fontFamily: 'Arial'
  },
});

export default CallInfo;
