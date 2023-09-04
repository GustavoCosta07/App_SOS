import {
    View, Text, StyleSheet, TouchableOpacity, TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import CheckBox from '../components/CheckBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default function TratarChamado({ route }) {
    //   const { dados } = route.params;
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState([]);
    const [texto, setTexto] = useState('');

    const finalizar = () => {
        alert('ola')
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };


    const orcamento = () => {

        if (selectedItems == 1) {

            navigation.navigate('adicionarFotos')
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
        <KeyboardAwareScrollView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

            >
                <TouchableWithoutFeedback onPress={dismissKeyboard}>

                    <View style={styles.infoContainer}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.sectionTitle}>OS CONCLUÍDA POR COMPLETO</Text>
                            <Text style={styles.sectionTitle}>Observações Gerais</Text>

                            <View style={{ height: 10 }} />

                            <TextInput
                                style={styles.textInput}
                                placeholder="Digite as observações aqui..."
                                onChangeText={(text) => setTexto(text)}
                                value={texto}
                                multiline={true}
                                numberOfLines={4}
                            />
                            <View style={{ height: 10 }} />
                            <Text style={styles.sectionTitle}>Deseja Adicionar Fotos?</Text>
                            <CheckBox
                                options={optionsMultiple}
                                onChange={(op) => setSelectedItems(op)}
                                left={1}
                            />
                            <View style={{ height: 10 }} />

                            <TouchableOpacity
                                style={styles.startButton}
                                onPress={() => orcamento()}
                            >
                                <Text style={styles.startButtonText}>AVANÇAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </KeyboardAwareScrollView>
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
    textInput: {
        height: 120,
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        borderRadius: 10,
    }
});