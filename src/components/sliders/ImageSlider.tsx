import React from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';
import Swiper from 'react-native-swiper';

const ImageSlider: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <View style={styles.wrapper}>
      <Swiper style={styles.swiper} showsButtons={true}>
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 250,
    zIndex: 0,
    elevation: 12,
    backgroundColor: '#000000',
  },
  swiper: {
    height: 250,
    backgroundColor: '#fff',
    zIndex: 1,
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
});

export default ImageSlider;
