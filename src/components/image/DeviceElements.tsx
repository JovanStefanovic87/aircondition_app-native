import React, { memo, FC, useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import DeviceElementImg from './DeviceElementImg';
import { DeviceElement } from '../../../database/types';
import { customColors } from '../../assets/styles/customStyles';

const windowWidth = Dimensions.get('window').width;

type Props = {
    deviceElements: DeviceElement[];
    selectedTypeId: number | null;
};

const DeviceElements: FC<Props> = ({ deviceElements, selectedTypeId }) => {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredElements, setFilteredElements] = useState<DeviceElement[]>(deviceElements);
    const [isTablet, setIsTablet] = useState(false);
    const tabletThreshold = 600;

    useEffect(() => {
        const isTabletDevice = windowWidth >= tabletThreshold;
        setIsTablet(isTabletDevice);
    }, []);

    const renderItem = ({ item }: { item: DeviceElement }) => {
        return (
            <DeviceElementImg
                deviceElement={item}
                options={['Zonen Davor', 'Anlage', 'Zonen Danach']}
            />
        );
    };

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

    const totalItemsWidth = filteredElements.length * (isTablet ? windowWidth * 0.33 : windowWidth);
    const remainingSpace = totalItemsWidth - windowWidth;
    const snapInterval = remainingSpace < filteredElements.length ? remainingSpace : windowWidth;
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
                        snapToInterval={snapInterval}
                        snapToAlignment="center"
                        decelerationRate="normal"
                        onScroll={(event) => {
                            const index = isTablet
                                ? Math.floor(
                                      event.nativeEvent.contentOffset.x / (windowWidth * 0.33),
                                  )
                                : Math.round(event.nativeEvent.contentOffset.x / windowWidth);
                            setCurrentIndex(index);
                        }}
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

export default memo(DeviceElements);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: customColors.blueLighter,
    },
    containerImages: {
        paddingTop: 10,
        backgroundColor: customColors.blueDarker,
        height: windowWidth * 0.55,
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
