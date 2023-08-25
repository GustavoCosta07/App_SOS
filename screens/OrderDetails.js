import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const OrderDetails = ({ route }) => {
  const { orderNumber, description, openDate, directedDate, cliente, cliente_cep,
    cliente_logradouro,
    cliente_numero,
    cliente_complemento,
    cliente_bairro,
    cliente_cidade,
    cliente_estado,
    cliente_telefone,
    cliente_sindico,
    os_solicitante,
    os_consideracoes,
    chamado_observacoes,
    chamado_status
  } = route.params;

  const navigation = useNavigation();
  if (chamado_status == 2) {

    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>{cliente}</Text>

          <Text style={{ color: 'grey' }}>{montarEndereco(cliente_logradouro, cliente_numero, cliente_bairro,
            cliente_complemento, cliente_cep, cliente_cidade, cliente_estado)}</Text>
          <View style={{ height: 10 }} />
          <InfoPair label="Telefone:" value={cliente_telefone} />
          <InfoPair label="Síndico:" value={cliente_sindico} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Outras Informações</Text>
          <InfoPair label="Solicitante:" value={os_solicitante} />
          <View style={{ height: 10 }} />
          <Text style={styles.sectionTitle}>Informações Iniciais:</Text>
          <Text style={{ color: 'grey' }}>{os_consideracoes}</Text>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', marginVertical: 10 }} />
          <Text style={styles.sectionTitle}>Observações:</Text>
          <Text style={{ color: 'grey' }}>{chamado_observacoes}</Text>
        </View>


        <TouchableOpacity style={styles.startButton} onPress={() => alert('Iniciar Atendimento Pressionado')}>
          <Text style={styles.startButtonText}>Iniciar Atendimento</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (chamado_status == 7) {

    return (
      <View style={styles.container}>
      
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>TRATAR CHAMADO:</Text>
          <InfoPair label="Escolha o Equipamento:"/>
          <View style={{ height: 10 }} />
          <Text style={styles.sectionTitle}>Informações Iniciais:</Text>

        <TouchableOpacity style={styles.startButton} onPress={() => alert('Iniciar Atendimento Pressionado')}>
          <Text style={styles.startButtonText}>Iniciar Atendimento</Text>
        </TouchableOpacity>
        </View>


      </View>
    );
  }
};

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



function montarEndereco(cliente_logradouro, cliente_numero, cliente_bairro, cliente_complemento, cliente_cep, cliente_cidade, cliente_estado) {
  let endereco = '';

  endereco += cliente_logradouro + ', ' + cliente_numero;

  endereco += ', Cep: ' + cliente_cep;

  endereco += ', ' + cliente_bairro;

  if (cliente_complemento) {
    endereco += ' (' + cliente_complemento + ')';
  }

  endereco += ' - ' + cliente_cidade + ' - ' + cliente_estado;

  return endereco;
}
export default OrderDetails;
