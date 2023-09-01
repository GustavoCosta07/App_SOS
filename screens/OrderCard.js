import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import OrderDetails from "./OrderDetails"
import {
    SimpleLineIcons,
    MaterialIcons,
    MaterialCommunityIcons,
    FontAwesome
} from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const OrderCard = ({
    orderNumber,
    description,
    openDate,
    directedDate,
    cliente,
    cliente_cep,
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
    os_status_nome,
    chamado_status,
    chamado_cliente_codigo,
    os_id,
    chamado_deslocamento
}) => {
    const navigation = useNavigation();

    return (

        <View style={styles.card}>
            <Text style={styles.orderNumber}><MaterialIcons name={"location-on"} size={20} color="#4E54C8" /> {cliente}</Text>
            <Text style={styles.subText}>
                <Text style={styles.boldText}>Aberto dia:</Text>{" "}
                <Text style={styles.lightText}>{openDate}</Text>
            </Text>
            <Text style={styles.subText}>
                <Text style={styles.boldText}>Direcionado dia:</Text>{" "}
                <Text style={styles.lightText}>{directedDate}</Text>
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.boldText}>Status:</Text>
                <View style={{
                    backgroundColor: chamado_status === '7' ? '#F2C2A1' : '#d9e4f1', // Altera a cor com base em chamado_status
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: chamado_status === '7' ? '#E4771F' : '#4E54C8', // Altera a cor da borda com base em chamado_status
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    marginLeft: 10,
                }}>
                    <Text style={[styles.lightText, { color: chamado_status === '7' ? '#A25E19' : '#4E54C8', fontWeight: 'Arial' }]}>
                        {os_status_nome}
                    </Text>
                </View>
            </View>



            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrderDetails',
                {
                    orderNumber, description, openDate, directedDate, cliente, cliente_cep,
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
                })}>
                <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20,
    },
    orderNumber: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 14,
        marginTop: 5,
    },
    boldText: {
        fontWeight: 'bold',
        color: 'grey',
    },
    lightText: {
        color: 'grey',
    },
    button: {
        backgroundColor: '#4E54C8',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default OrderCard;
