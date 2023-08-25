import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import WelcomeMessage from '../screens/WelcomeMessage';
import CallInfo from '../screens/CallInfo';
import OrderCard from './OrderCard';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function Home() {

  const navigation = useNavigation();
  
  const [orders, setOrders] = useState([]);

  const { user } = useContext(UserContext);

  console.log('teste', user)
  useEffect(() => {
    // Função para fazer a solicitação à API e obter os dados das ordens
    const fetchOrders = async () => {
      try {
        
        const requestBody = {
          id: '1'
        };
  
        const response = await fetch('https://grupofmv.app.br/api/v1/integracao/chamados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        const data = await response.json();
        console.log('data',data)
        setOrders(data.data); // Atualiza o estado com os dados das ordens
      } catch (error) {
        console.error('Erro ao obter dados das ordens:', error);
      }
    };
  
    fetchOrders(); // Chama a função de solicitação à API ao carregar a tela
  }, []);
  
  return (
    <View>
      <WelcomeMessage username={user.user_nome} />
      <CallInfo callCount={orders.length} countFontSize={30} />
      <ScrollView style={styles.scrollView}>
        {orders.map(order => (
          <OrderCard
            key={order.idChamado} // Certifique-se de ter um identificador único para cada ordem
            orderNumber={order.idChamado}
            description={order.idChamado}
            openDate={converterDataHora(order.chamado_direcionado)}
            directedDate={converterDataHora(order.chamadoDataReferencia)}
            navigation={navigation}
            cliente={order.chamado_cliente}
            cliente_bairro={order.chamado_cliente_bairro}
            cliente_cep={order.chamado_cliente_cep}
            cliente_cidade={order.chamado_cliente_cidade}
            cliente_complemento={order.chamado_cliente_complemento}
            cliente_logradouro={order.chamado_cliente_logradouro}
            cliente_numero={order.chamado_cliente_numero}
            cliente_estado={order.chamado_cliente_estado}
            cliente_telefone={order.chamado_cliente_telefone}
            cliente_sindico={order.chamado_cliente_sindico}
            os_consideracoes={order.chamado_cliente_consideracoesOs}
            os_solicitante={order.chamado_cliente_solicitanteOs}
            chamado_observacoes={order.chamado_observacoes}
            os_status_nome={order.os_status_nome}
            chamado_status={order.chamado_status}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Arial',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#4E54C8',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

function converterDataHora(dataHoraStr) {
  var partes = dataHoraStr.split(' ');
  var dataStr = partes[0];
  var horaStr = partes[1];

  var dataPartes = dataStr.split('-');
  var ano = dataPartes[0];
  var mes = dataPartes[1];
  var dia = dataPartes[2];

  var dataFormatada = dia + '/' + mes + '/' + ano;

  var horaFormatada = horaStr;

  var dataHoraFormatada = dataFormatada + ' ' + horaFormatada;

  return dataHoraFormatada;
}