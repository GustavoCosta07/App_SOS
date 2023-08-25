import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import WelcomeMessage from './WelcomeMessage';
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function RegisterEvent() {

    const events = [
        { id: '1', name: 'Deslocamento', icon: 'directions-car' },
        { id: '2', name: 'Descanso', icon: 'bedtime' },
    ];

    const { user } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState(null);

    const openModal = (event) => {
        setSelectedEvent(event);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setModalVisible(false);
    };

    const confirmEvent = () => {
        // chamar a função fetch para fazer a requisição
        // com os dados do evento selecionado
        console.log('Registrando o evento:', selectedEvent);

        // Feche o modal após a confirmação
        closeModal();
    };

    // Função para renderizar um cartão de evento
    const renderEventCard = ({ item }) => (
        <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.cardContainer}>
                <View style={styles.cardTop}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                </View>
                <View style={styles.cardBottom}>
                    <MaterialIcons name={item.icon} size={20} color="#4E54C8" />
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <WelcomeMessage username={user.user_nome} />
            <Text style={styles.message}>Qual evento deseja registrar?</Text>
            <FlatList
                data={events}
                renderItem={renderEventCard}
                keyExtractor={(item) => item.id}
                numColumns={2} // Dois cartões por linha
                contentContainerStyle={styles.container}
            />
            {/* Adicione o componente Modal aqui */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirmação</Text>
                        <Text style={styles.modalMessage}>Você deseja registrar o evento {selectedEvent?.name}?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={closeModal} style={[styles.modalButton, styles.cancelButton]}>
                                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={confirmEvent} style={[styles.modalButton, styles.confirmButton]}>
                                <Text style={[styles.modalButtonText, styles.confirmButtonText]}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    cardContainer: {
        flex: 1,
        margin: 8,
    },
    cardTop: {
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        padding: 16,
        elevation: 2,
        justifyContent: 'center', // Centralizar verticalmente
        alignItems: 'center', // Centralizar horizontalmente
        width: 160
    },
    cardBottom: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 16,
        elevation: 2,
        justifyContent: 'center', // Centralizar verticalmente
        alignItems: 'center', // Centralizar horizontalmente
        width: 160
        
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4E54C8',
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: -10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center', // Centralizar verticalmente
        alignItems: 'center', // Centralizar horizontalmente
        backgroundColor: 'rgba(0,0,0,0.5)', // Cor semi-transparente
    },
    modalContent: {
        width: '80%', // Largura do modal
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    modalButton: {
        width: '45%', // Largura do botão
        paddingVertical: 12,
        borderRadius: 8,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: '#ECECEC',
    },
    cancelButtonText: {
        color: '#4E54C8',
    },
    confirmButton: {
        backgroundColor: '#4E54C8',
    },
    confirmButtonText: {
        color: '#fff',
    },
});
