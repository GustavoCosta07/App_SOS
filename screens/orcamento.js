import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import CheckBox from '../components/CheckBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function TratarChamado({ route }) {
    const { dados } = route.params;

    const [databaseItems, setDatabaseItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [texto, setTexto] = useState('');

    useEffect(() => {
        const fetchDataFromDatabase = async () => {
            try {
                const requestBody = {
                    id: 8
                };

                const response = await fetch(
                    'https://grupofmv.app.br/api/v1/integracao/buscar_pecas',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                    }
                );
                const data = await response.json();
                setDatabaseItems(data.data);
            } catch (error) {
                console.error('Erro ao buscar dados do banco de dados:', error);
            }
        };

        fetchDataFromDatabase();
    }, []);

    const finalizar = () => {
        alert('Texto inserido: ' + texto);
    };

    const orcamento = () => {
        console.log(selectedItems);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const optionsMultiple = databaseItems.map((item) => ({
        text: item.produto_nome,
        id: item.produto_id,
    }));

    if (dados.equipamento) {

        return (
            <KeyboardAwareScrollView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

                >
                    <TouchableWithoutFeedback onPress={dismissKeyboard}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.sectionTitle}>
                                INFORME ITENS A SEREM ORÇADOS:
                            </Text>

                            <View style={{ height: 10 }} />

                            <CheckBox
                                options={optionsMultiple}
                                onChange={(op) => setSelectedItems(op)}
                                multiple
                            />

                            <View style={{ height: 15 }} />

                            <TextInput
                                style={styles.textInput}
                                placeholder="Digite as observações aqui..."
                                onChangeText={(text) => setTexto(text)}
                                value={texto}
                                multiline={true}
                                numberOfLines={4}
                            />

                            <View style={{ height: 10 }} />

                            <TouchableOpacity
                                style={styles.startButton}
                                onPress={() => orcamento()}
                            >
                                <Text style={styles.startButtonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </KeyboardAwareScrollView>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.sectionTitle}>INFORME ITENS A SEREM ORÇADOS:</Text>

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

                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => finalizar()}
                    >
                        <Text style={styles.startButtonText}>SALVAR</Text>
                    </TouchableOpacity>

                    <View style={{ height: 10 }} />


                </View>
            </View>
        );
    }

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
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4E54C8',
    },
    textInput: {
        height: 120,
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        borderRadius: 10,
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
