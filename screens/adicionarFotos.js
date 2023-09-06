import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { Button, FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

export default function ImagePickerExample() {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedImageIndex !== null) {
      if (images[selectedImageIndex].description) {
        setDescription(images[selectedImageIndex].description);
      } else {
        setDescription('');
      }
      setModalVisible(true);
    }
  }, [selectedImageIndex, images]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => ({ uri: asset.uri, description: '' }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const prepareDataForApi = () => {
    // Mapeie o estado `images` para criar um array de objetos com as informações necessárias
    const dataToSend = images.map((item) => ({
      uri: item.uri,
      description: item.description || '', // Se não houver descrição, definimos como uma string vazia
    }));

    return dataToSend;
  };

  const updateDescription = (index, text) => {
    setImages((prevImages) =>
      prevImages.map((image, i) => (i === index ? { ...image, description: text } : image))
    );
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedImageIndex(null);
  };

  const openDescriptionModal = (index) => {
    setSelectedImageIndex(index);
  };

  const saveDescription = () => {
    if (selectedImageIndex !== null) {
      updateDescription(selectedImageIndex, description);
      setModalVisible(false);
      setSelectedImageIndex(null);
      Keyboard.dismiss();
    }
  };

  const cancelDescription = () => {
    setModalVisible(false);
    setSelectedImageIndex(null);
    setDescription('');
    Keyboard.dismiss();
  };

  // const uploadImages = async (images) => {
  //   // Cria um objeto FormData
  //   console.log('imagens', images)
  //   const formData = new FormData();
  //   images.forEach((image, index) => {
  //     formData.append(`image${index}`, {
  //       uri: image.uri,
  //       name: `image${index}.jpg`,
  //       type: 'image/jpeg',
  //     });
  //     formData.append(` ${index}`, image.description);
  //   });

  //   // Envia as imagens e descrições para o servidor
  //   try {
  //     const response = await fetch('https://grupofmv.app.br/api/v1/integracao/enviar_imagens', {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const uploadImages = async (images) => {
    // Cria um objeto FormData
    console.log('imagens', images);
    const formData = new FormData();
  
    images.forEach((image, index) => {
      formData.append(`image${index}`, {
        uri: image.uri,
        name: `imageteste${index}.jpg`,
        type: 'image/jpeg',
      });
      
      formData.append('textData', image.uri);
    });
  
  
    try {
      const response = await fetch('https://grupofmv.app.br/api/v1/integracao/enviar_imagens', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  
  

  const sendImagesToServer = () => {

    const dataToSend = prepareDataForApi();

    uploadImages(dataToSend)

    // console.log('Enviando imagens para o servidor:', dataToSend);
    setImages([]);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Escolher imagens da galeria" onPress={pickImages} />
        <FlatList
          data={images}
          keyExtractor={(_, index) => index.toString()}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View style={{ margin: 5 }}>
              <TouchableOpacity
                onPress={() => removeImage(index)}
                style={{
                  position: 'absolute',
                  top: 1,
                  right: -1,
                  zIndex: 1,
                }}
              >
                <MaterialIcons name={"delete"} size={25} color="#FF7F7F" />
              </TouchableOpacity>
              <View style={{ width: 100, height: 100 }}>
                <Image source={{ uri: item.uri }} style={{ flex: 1, width: null, height: null }} />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: item.description ? '#4E54C8' : '#4E54C8',
                  padding: 5,
                  marginTop: 5,
                  borderRadius: 5,
                  width: 100,
                  alignItems: 'center',
                }}
                onPress={() => openDescriptionModal(index)}
              >
                <Text style={{ color: 'white' }}>
                  {item.description ? 'Editar Descrição' : 'Adicionar Descrição'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Modal visible={modalVisible} animationType="slide">
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Adicionar/Editar Descrição:</Text>
              <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholder="Descrição"
                multiline={true}
                numberOfLines={4}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  width: 300,
                  height: 200,
                  marginTop: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}
              />

              <View style={{ height: 10 }} />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={[styles.modalButton, { marginRight: 10 }]} // Adicione esta linha
                  onPress={() => saveDescription()}
                >
                  <Text style={styles.modalButtonText}>SALVAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { marginLeft: 10 }]} // Adicione esta linha
                  onPress={() => cancelDescription()}
                >
                  <Text style={styles.modalButtonText}>CANCELAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <TouchableOpacity
          style={{
            backgroundColor: '#4E54C8',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            marginBottom: 20,
            alignItems: 'center',
            width: 200,
          }}
          onPress={sendImagesToServer}
        >
          <Text style={{ color: 'white' }}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalButton: {
    backgroundColor: '#4E54C8',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
