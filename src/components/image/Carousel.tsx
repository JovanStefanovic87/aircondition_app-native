import React, { FC, useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import DeviceElementImg from './DeviceElementImg';
import { DeviceElement } from '../../../database/types';
import { customColors } from '../../assets/styles/customStyles';

const windowWidth = Dimensions.get('window').width;

type Props = {
    deviceElements: DeviceElement[];
    selectedTypeId: number | null;
};

const Carousel: FC<Props> = ({ deviceElements, selectedTypeId }) => {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredElements, setFilteredElements] = useState<DeviceElement[]>(deviceElements);

    const renderItem = ({ item }: { item: DeviceElement }) => (
        <DeviceElementImg deviceElement={item} />
    );

    useEffect(() => {
        const filtered = selectedTypeId
            ? deviceElements.filter((element) => element.deviceElementTypeId === selectedTypeId)
            : deviceElements;

        setFilteredElements(filtered);
        setCurrentIndex(0);
        setTimeout(() => {
            flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
        }, 50);
    }, [deviceElements, selectedTypeId]);

    console.log(currentIndex);

    const handleScrollRight = () => {
        if (currentIndex < filteredElements.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
        }
    };

    const handleScrollLeft = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerImages}>
                {filteredElements.length > 0 && (
                    <FlatList
                        ref={flatListRef}
                        data={filteredElements}
                        horizontal
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={windowWidth}
                        snapToAlignment="center"
                        decelerationRate="normal"
                        onMomentumScrollEnd={(event) => {
                            const index = Math.round(
                                event.nativeEvent.contentOffset.x / windowWidth,
                            );

                            setCurrentIndex(index);
                        }}
                        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    />
                )}
            </View>
            <View style={styles.arrowsContainer}>
                {filteredElements.length > 0 && (
                    <View style={styles.arrows}>
                        <TouchableOpacity style={styles.arrowButton} onPress={handleScrollLeft}>
                            <Text style={styles.arrowText}>{'◀'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrowButton} onPress={handleScrollRight}>
                            <Text style={styles.arrowText}>{'▶'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
    },
    containerImages: {
        paddingTop: 10,
        paddingHorizontal: 5,
        backgroundColor: customColors.blueLighter,
        minHeight: 300,
    },
    arrowsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        zIndex: 2,
    },
    arrows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        zIndex: 2,
        alignItems: 'center',
        borderTopWidth: 2,
        borderTopColor: customColors.blueDark,
    },
    arrowButton: {
        paddingHorizontal: 10,
    },
    arrowText: {
        fontSize: 44,
        color: 'blue',
    },
});
