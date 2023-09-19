import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import CheckBox from '../components/CheckBox';



export default function TratarChamado({ route }) {
      const { dados } = route.params;
      console.log('dadosquestion', dados)
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState([]);

    const finalizar = () => {
        alert('ola')
    }

    const verifyOption = () => {

        if (selectedItems == 1) {
            navigation.navigate('osFinalizadaConfirm', {dados})
        }
        
        if (selectedItems == 2) {
            
            console.log('ola')
        }
    }

    const optionsMultiple = [
        {
            text: 'Sim',
            id: 1
        },
        {
            text: 'Não',
            id: 2
        }
    ]

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>A OS FOI FINALIZADA POR COMPLETO?</Text>



                <View style={{ height: 10 }} />

                <CheckBox
                    options={optionsMultiple}
                    onChange={(op) => setSelectedItems(op)}
                    left={1}
                />
                <View style={{ height: 10 }} />


                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => verifyOption()}
                >
                    <Text style={styles.startButtonText}>AVANÇAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



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
        fontSize: 15,
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