import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';

export default function ImagePickerExample() {
  const [images, setImages] = useState([]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Escolher imagens da galeria" onPress={pickImages} />
      {images.map((image, index) => (
        <Image key={index} source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
      ))}
    </View>
  );
}
