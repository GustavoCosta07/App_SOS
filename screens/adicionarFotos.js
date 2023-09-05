import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { Button, FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
    }
  };

  const sendImagesToServer = () => {
    // Aqui você pode escrever a lógica para enviar as imagens para o servidor
    // Pode ser uma chamada de API, um POST para uma URL, etc.
    // Certifique-se de implementar a lógica de envio do servidor aqui.
    console.log('Enviando imagens para o servidor:', images);
    // Limpar a lista de imagens após o envio, se necessário
    setImages([]);
  };

  return (
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
              <MaterialIcons name={"delete"} size={25} color="red" />
            </TouchableOpacity>
            <View style={{ width: 100, height: 100 }}>
              <Image source={{ uri: item.uri }} style={{ flex: 1, width: null, height: null }} />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: item.description ? 'blue' : 'yellow',
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
              width: 200,
              height: 100,
              marginTop: 10,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          />
          <Button title="Salvar" onPress={saveDescription} />
        </View>
      </Modal>
      <TouchableOpacity
        style={{
          backgroundColor: 'green',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          marginBottom: 20, // Adicione esta linha
          alignItems: 'center',
          width: 200,
        }}
        onPress={sendImagesToServer}
      >
        <Text style={{ color: 'white' }}>Salvar</Text>
      </TouchableOpacity>

    </View>
  );
}
