import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'


export default function TratarChamado({ route }) {
    const { dados } = route.params;
    console.log('coffe', dados)

    const finalizar = () => {
        alert('ola')
    }

    const orcamento = () => {
        alert('ola')
    }
    if (dados) {

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.sectionTitle}>INFORME ITENS A SEREM ORÇADOS:</Text>

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
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.sectionTitle}>INFORME ITENS A SEREM ORÇADOS:</Text>

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