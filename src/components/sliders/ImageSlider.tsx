import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const ImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.shadow}>
        <Swiper style={styles.swiper} showsButtons={true}>
          {images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>
      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text style={styles.buttonText}>Aussuchen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
    zIndex: 0,
    alignItems: 'flex-end',
  },
  shadow: {
    height: 250,
    zIndex: 1,
    elevation: 12,
    backgroundColor: '#000000',
  },
  swiper: {
    height: 250,
    backgroundColor: '#fff',
    zIndex: 12,
    paddingVertical: 10,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    marginTop: 10,
    padding: 10,
    width: '50%',
    backgroundColor: '#1D8DBB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImageSlider;
