import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useContext } from 'react';
import { UserContext } from '../UserContext';


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
    chamado_status,
    chamado_cliente_codigo,
    os_id,
    chamado_deslocamento
  } = route.params;

  const { user } = useContext(UserContext);
  console.log('testeee', chamado_deslocamento)

  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState('equipamento1');
  const [databaseItems, setDatabaseItems] = useState([]);

  const retornaView = (selectedOption) => {
    let objetoDesejado = null

    if (selectedOption != 'fixa') {
      objetoDesejado = databaseItems.find(item => item.equipamento_id === selectedOption);
    }
    if (objetoDesejado) {
      objetoDesejado.numero_os = os_id
      objetoDesejado.numero_chamado = orderNumber
    }

    const dados = { equipamento: objetoDesejado };
    navigation.navigate('TratarChamado', { dados });
  }

  const iniciarAtendimento = () => {

    const fetchInit = async () => {
      try {

        const requestBody = {
          id_chamado: orderNumber,
          id_os: os_id,
          status: chamado_status,
          user_id: user.user_id

        };

        const response = await fetch('https://grupofmv.app.br/api/v1/integracao/iniciar_atendimento', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (data.status == 1) {
          navigation.navigate('AppDrawers');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
      }
    };

    fetchInit();
  }

  const iniciarDeslocamento = () => {
    // 
    const fetchInit = async () => {
      try {

        const requestBody = {
          id_tecnico: user.user_id,
          id_chamado: orderNumber,
          tipo: 1
        };

        const response = await fetch('https://grupofmv.app.br/api/v1/integracao/iniciar_deslocamento_os', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (data.status == 1) {
          navigation.navigate('AppDrawers');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
      }
    };

    fetchInit();
  }

  const encerrarDeslocamento = () => {
    // 
    const fetchInit = async () => {
      try {

        const requestBody = {
          id_tecnico: user.user_id,
          id_chamado: orderNumber,
          tipo: 2
        };

        const response = await fetch('https://grupofmv.app.br/api/v1/integracao/iniciar_deslocamento_os', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (data.status == 1) {
          navigation.navigate('AppDrawers');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
      }
    };

    fetchInit();
  }

  useEffect(() => {

    const fetchDataFromDatabase = async () => {
      try {

        const requestBody = {
          id: chamado_cliente_codigo
        };

        const response = await fetch('https://grupofmv.app.br/api/v1/integracao/buscar_equipamentos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        setDatabaseItems(data.data);
      } catch (error) {
        console.error('Erro ao buscar dados do banco de dados:', error);
      }
    };

    fetchDataFromDatabase();
  }, []);


  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

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

        {/* Condição para exibir o botão "Iniciar Atendimento" */}
        {(chamado_deslocamento === 'N' || chamado_deslocamento === 'F') && (
          <TouchableOpacity style={styles.startButton} onPress={() => iniciarAtendimento()}>
            <Text style={styles.startButtonText}>Iniciar Atendimento</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 10 }} />

        {/* Condição para exibir o botão "Iniciar Deslocamento" */}
        {chamado_deslocamento === 'N' && (
          <TouchableOpacity style={styles.startButton} onPress={() => iniciarDeslocamento()}>
            <Text style={styles.startButtonText}>Iniciar Deslocamento</Text>
          </TouchableOpacity>
        )}

        {/* Condição para exibir o botão "Encerrar Deslocamento" */}
        {chamado_deslocamento === 'Y' && (
          <TouchableOpacity style={styles.startButton} onPress={() => encerrarDeslocamento()}>
            <Text style={styles.startButtonText}>Encerrar Deslocamento</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (chamado_status == 7) {

    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>TRATAR CHAMADO:</Text>
          <InfoPair label="Escolha o Equipamento:" />

          <Picker
            selectedValue={selectedOption}
            style={styles.picker}
            itemStyle={{ fontSize: 15 }}
            onValueChange={(itemValue) => handleOptionChange(itemValue)}
          >
            {/* Fixed option */}
            {/* <Picker.Item label="Não informar modelo" value="fixa" /> */}

            {databaseItems.map((item) => (
              <Picker.Item
                key={item.equipamento_id}
                label={
                  item.marca_nome +
                  ' - ' +
                  item.modelo_nome +
                  ' - ' +
                  item.equipamento_nome
                }
                value={item.equipamento_id}
              />
            ))}
          </Picker>

          <View style={{ height: 10 }} />

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => retornaView(selectedOption)}
          >
            <Text style={styles.startButtonText}>Avançar</Text>
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
