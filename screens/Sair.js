import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigation } from '@react-navigation/native';

export default function Sair() {

  const [modalVisible, setModalVisible] = useState(true);

  const { setUser } = useContext(UserContext);

  const navigation = useNavigation();

  const handleLogout = () => {

    setUser(null);
    navigation.navigate('Login');
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmação</Text>
            <Text style={styles.modalMessage}>Você tem certeza de que deseja sair?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={[styles.modalButton, styles.confirmButton]}>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
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
    width: '45%',
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
