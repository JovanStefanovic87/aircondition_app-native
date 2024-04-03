import React, { FC, useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import DeviceElementImg from './DeviceElementImg';
import { DeviceElement } from '../../../database/types';

const windowWidth = Dimensions.get('window').width;

type Props = {
    deviceElements: DeviceElement[];
    selectedTypeId: number | null;
};

const Carousel: FC<Props> = ({ deviceElements, selectedTypeId }) => {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredElements, setFilteredElements] = useState<DeviceElement[]>(deviceElements);

    useEffect(() => {
        const filtered = selectedTypeId
            ? deviceElements.filter((element) => element.deviceElementTypeId === selectedTypeId)
            : deviceElements;

        setFilteredElements(filtered);
        setCurrentIndex(0);
    }, [deviceElements, selectedTypeId, setCurrentIndex]);

    const renderItem = ({ item }: { item: DeviceElement }) => (
        <DeviceElementImg deviceElement={item} />
    );

    const itemWidth = windowWidth;

    const handleScrollRight = () => {
        if (flatListRef.current && currentIndex < filteredElements.length - 1) {
            setCurrentIndex(currentIndex + 1);
            flatListRef.current.scrollToIndex({ animated: true, index: currentIndex + 1 });
        }
    };

    const handleScrollLeft = () => {
        if (flatListRef.current && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            flatListRef.current.scrollToIndex({ animated: true, index: currentIndex - 1 });
        }
    };

    return (
        <View style={styles.container}>
            {filteredElements.length > 0 && (
                <FlatList
                    ref={flatListRef}
                    data={filteredElements}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={itemWidth}
                    snapToAlignment="center"
                    decelerationRate="normal"
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.x / itemWidth);
                        setCurrentIndex(index);
                    }}
                />
            )}
            {filteredElements.length > 0 && ( // Conditionally render arrow container
                <View style={styles.arrowContainer}>
                    <TouchableOpacity style={styles.arrowButton} onPress={handleScrollLeft}>
                        <Text style={styles.arrowText}>{'◀'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.arrowButton} onPress={handleScrollRight}>
                        <Text style={styles.arrowText}>{'▶'}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    arrowContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        bottom: 20,
        zIndex: 2,
    },
    arrowButton: {
        padding: 10,
    },
    arrowText: {
        fontSize: 24,
        color: 'blue',
    },
});
