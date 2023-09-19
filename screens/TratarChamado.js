import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';




export default function TratarChamado({ route }) {
  const { dados } = route.params;
  const navigation = useNavigation();

  console.log('dados7', dados)

  const finalizar = () => {
    navigation.navigate('osFinalizadaQuestion', {dados})
  }

  const orcamento = () => {
    navigation.navigate('orcamento', { dados })
  }



  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>DADOS DO EQUIPAMENTO:</Text>
        <InfoPair label="Nome:" value={dados.equipamento ? dados.equipamento.equipamento_nome : ''} />
        <InfoPair label="Marca:" value={dados.equipamento ? dados.equipamento.marca_nome : ''} />
        <InfoPair label="Modelo:" value={dados.equipamento ? dados.equipamento.modelo_nome : ''} />
        <InfoPair label="Porta:" value={dados.equipamento ? dados.equipamento.equipamentos_porta : ''} />
        <InfoPair label="Paradas:" value={dados.equipamento ? dados.equipamento.equipamentos_paradas : ''} />


        <View style={{ height: 10 }} />

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => finalizar()}
        >
          <Text style={styles.startButtonText}>FINALIZAR</Text>
        </TouchableOpacity>

        <View style={{ height: 10 }} />

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => orcamento()}
        >
          <Text style={styles.startButtonText}>SOLICITAR ORÇAMENTO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const InfoPair = ({ label, value }) => (
  <View style={styles.infoPair}>
    <Text style={styles.infoLabel}>{label}</Text>
    {label === 'Solicitante:' ? (
      <Text style={[styles.infoValue]}>{value}</Text>
    ) : (
      <Text style={styles.infoValue}>{value}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  infoContainer: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#4E54C8"
  },
  infoPair: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: "grey"
  },
  infoSpacer: {
    marginRight: 5,
  },
  infoValue: {
    flex: 1,
    color: "grey"
  },
  startButton: {
    backgroundColor: '#4E54C8',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});