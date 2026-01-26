import React, { memo, FC, useRef, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import DeviceElementImg from './DeviceElementImg';
import { DeviceElement } from '../../../database/types';
import styles from '../../assets/styles/imageStyles';
import TextTitle from '../text/TextTitle';
import DropdownElements from '../input/DropdownElements';

const windowWidth = Dimensions.get('window').width;
const tabletThreshold = 600;

type Props = {
    deviceElements: DeviceElement[];
    setSelectedTypeId: (id: number | null) => void;
    selectedTypeId: number | null;
    deviceElementTypes: { id: number; name: string }[];
};

const ELEMENTS_PER_ROW = 4;

const calculateWidth = () => {
    return windowWidth / ELEMENTS_PER_ROW;
};

const DeviceElements: FC<Props> = ({
    deviceElements,
    selectedTypeId,
    setSelectedTypeId,
    deviceElementTypes,
}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredElements, setFilteredElements] = useState<DeviceElement[]>(deviceElements);
    const [isTablet, setIsTablet] = useState(false);
    const deviceElementsCount = filteredElements.length;

    useEffect(() => {
        const isTabletDevice = windowWidth >= tabletThreshold;
        setIsTablet(isTabletDevice);
    }, []);

    const renderItem = (item: DeviceElement) => {
        return (
            <View key={item.id} style={{ width: calculateWidth() }}>
                <DeviceElementImg
                    deviceElement={item}
                    options={[
                        { id: 1, value: 'Anlage' },
                        { id: 2, value: 'Zonen Davor' },
                        { id: 3, value: 'Zonen Danach' },
                    ]}
                    isTablet={isTablet}
                    selectedElementsCount={deviceElementsCount}
                />
            </View>
        );
    };

    useEffect(() => {
        const filtered = selectedTypeId
            ? deviceElements.filter((element) => element.deviceElementTypeId === selectedTypeId)
            : deviceElements;

        setFilteredElements(filtered);
        setCurrentIndex(0);
        setTimeout(() => {
            scrollViewRef.current?.scrollTo({ x: 0, animated: true });
        }, 50);
    }, [deviceElements, selectedTypeId]);

    const handleScrollRight = () => {
        if (currentIndex < filteredElements.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            scrollViewRef.current?.scrollTo({
                x: newIndex * calculateWidth(),
                animated: true,
            });
        }
    };

    const handleScrollLeft = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            scrollViewRef.current?.scrollTo({
                x: newIndex * calculateWidth(),
                animated: true,
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.Head}>
                <TextTitle text="Alle Geräteelemente" isTablet={isTablet} />
                <DropdownElements
                    selectedValue={selectedTypeId}
                    setSelectedValue={setSelectedTypeId}
                    items={deviceElementTypes.map((type) => ({
                        label: type.name,
                        value: type.id,
                    }))}
                />
                <View style={styles.arrowsContainer}>
                    <View style={styles.arrows}>
                        <TouchableOpacity style={styles.arrowButton} onPress={handleScrollLeft}>
                            <Text style={styles.arrowText}>{'◀'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrowButton} onPress={handleScrollRight}>
                            <Text style={styles.arrowText}>{'▶'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.containerImagesDouble}>
                {filteredElements.length > 0 && (
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => {
                            const index = Math.round(
                                event.nativeEvent.contentOffset.x / calculateWidth(),
                            );
                            setCurrentIndex(index);
                        }}
                        scrollEventThrottle={16}
                    >
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                {filteredElements
                                    .slice(0, Math.ceil(filteredElements.length / 2))
                                    .map((item, index) => (
                                        <React.Fragment key={index}>
                                            {renderItem(item)}
                                        </React.Fragment>
                                    ))}
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                {filteredElements
                                    .slice(Math.ceil(filteredElements.length / 2))
                                    .map((item, index) => (
                                        <React.Fragment key={index}>
                                            {renderItem(item)}
                                        </React.Fragment>
                                    ))}
                            </View>
                        </View>
                    </ScrollView>
                )}
            </View>
        </View>
    );
};

export default memo(DeviceElements);
