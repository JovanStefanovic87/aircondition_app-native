import React, { FC, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useInspectionStore, useInspectionDeviceElementsStore } from '../../store/store';
import { InspectionDeviceElement } from '../../../database/types';
import styles from '../../assets/styles/imageStyles';
import InspectionDeviceElementImg from './InspectionDeviceElementImg';
import { saveDeviceElementsSortOrder } from '../../../database/dataAccess/Command/sqlCommands';
import { fetchInspectionDeviceElements } from '../../helpers/api';
import ErrorInformationModal from '../modals/ErrorInformationModal';
import TextTitle from '../text/TextTitle';

const windowWidth = Dimensions.get('window').width;
const tabletThreshold = 600;

type Props = {
    inspectionDeviceElements: InspectionDeviceElement[];
    positionId: number;
};

const InspectionDeviceElements: FC<Props> = ({ inspectionDeviceElements, positionId }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredElements, setFilteredElements] = useState<InspectionDeviceElement[]>([]);
    const [isTablet, setIsTablet] = useState(false);
    const [focusedDeviceId, setFocusedDeviceId] = useState<string | null>(null);
    const setInspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.setInspectionDeviceElements,
    );
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [prevFilteredElementsLength, setPrevFilteredElementsLength] = useState(100);
    const mountedRef = useRef(false);
    const selectedElementsCount = filteredElements.length;
    const scrollViewPosition = useRef(0);

    useEffect(() => {
        setIsTablet(windowWidth >= tabletThreshold);
    }, []);

    useEffect(() => {
        const mappedDeviceElements = inspectionDeviceElements.map((element) => ({
            ...element,
            name: element.imageFileName.split('.')[0],
        }));

        const sortedElements = mappedDeviceElements.sort((a, b) => a.deviceOrder - b.deviceOrder);

        if (JSON.stringify(sortedElements) !== JSON.stringify(filteredElements)) {
            setFilteredElements(sortedElements);
        }
    }, [inspectionDeviceElements]);

    useEffect(() => {
        if (mountedRef.current) {
            if (filteredElements.length > prevFilteredElementsLength) {
                const lastIndex = filteredElements.length - 1;
                scrollViewRef.current?.scrollTo({
                    x: lastIndex * (isTablet ? windowWidth * 0.1 : windowWidth * 0.33),
                    animated: true,
                });
                setCurrentIndex(lastIndex);
            } else {
                setCurrentIndex(currentIndex);
            }
            setPrevFilteredElementsLength(filteredElements.length);
        } else {
            mountedRef.current = true;
        }
    }, [filteredElements]);

    const handleFocusChange = useCallback(
        (deviceId: string, focused: boolean) => {
            if (focused) {
                const focusedIndex = filteredElements.findIndex(
                    (element) => element.id.toString() === deviceId,
                );
                if (focusedIndex !== -1) {
                    setCurrentIndex(focusedIndex);
                }
                setFocusedDeviceId(deviceId);
            } else {
                setFocusedDeviceId(null);
            }
        },
        [filteredElements],
    );

    const handleDeleteElement = useCallback(
        (deletedElementId: string) => {
            try {
                const deletedElement = filteredElements.find(
                    (element) => element.id === deletedElementId,
                );
                if (!deletedElement) return;

                const deletedElementOrder = deletedElement.deviceOrder;
                const updatedElements = filteredElements.filter(
                    (element) => element.id !== deletedElementId,
                );

                const updatedElementsWithNewOrder = updatedElements.map((element) => {
                    if (element.deviceOrder > deletedElementOrder) {
                        return {
                            ...element,
                            deviceOrder: element.deviceOrder - 1,
                        };
                    } else if (element.deviceOrder === deletedElementOrder) {
                        return {
                            ...element,
                            deviceOrder: deletedElementOrder,
                        };
                    }
                    return element;
                });

                saveDeviceElementsSortOrder(
                    updatedElementsWithNewOrder.map((element) => ({
                        id: element.id,
                        deviceOrder: element.deviceOrder,
                    })),
                );

                setFilteredElements(updatedElementsWithNewOrder);

                let newIndex = currentIndex;
                if (currentIndex >= updatedElementsWithNewOrder.length) {
                    newIndex = currentIndex - 1;
                }

                if (newIndex >= 0 && newIndex < updatedElementsWithNewOrder.length) {
                    scrollViewRef.current?.scrollTo({
                        x: newIndex * (isTablet ? windowWidth * 0.25 : windowWidth),
                        animated: true,
                    });
                    setCurrentIndex(newIndex);
                }
            } catch (error) {
                setErrorMessage(error.message);
                setErrorModalVisible(true);
            }
        },
        [filteredElements, currentIndex, isTablet],
    );

    const handleMove = useCallback(
        async (element: InspectionDeviceElement, direction: 'left' | 'right') => {
            const currentIndex = filteredElements.findIndex((el) => el.id === element.id);
            if (currentIndex === -1) return;

            const siblingIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;

            if (siblingIndex < 0 || siblingIndex >= filteredElements.length) return;

            const sibling = filteredElements[siblingIndex];

            try {
                saveDeviceElementsSortOrder([
                    {
                        id: element.id,
                        deviceOrder: sibling.deviceOrder,
                    },
                    {
                        id: sibling.id,
                        deviceOrder: element.deviceOrder,
                    },
                ]);

                const updatedElements = [...filteredElements];
                updatedElements[currentIndex] = { ...sibling, deviceOrder: element.deviceOrder };
                updatedElements[siblingIndex] = { ...element, deviceOrder: sibling.deviceOrder };

                setFilteredElements(updatedElements);

                const elementWidth = isTablet ? windowWidth * 0.1 : windowWidth * 0.33;
                const elementPosition = siblingIndex * elementWidth;
                const currentScrollPosition = scrollViewPosition.current;
                const endOfVisibleArea = currentScrollPosition + windowWidth;

                // **Dodato**: Pomeranje ulevo ranije
                if (
                    (direction === 'left' && elementPosition < currentScrollPosition) ||
                    (direction === 'right' && elementPosition + elementWidth)
                ) {
                    scrollViewRef.current?.scrollTo({
                        x: elementPosition,
                        animated: true,
                    });
                }

                setCurrentIndex(siblingIndex);
            } catch (error) {
                setErrorMessage(error.message);
                setErrorModalVisible(true);
            }
        },
        [filteredElements, isTablet],
    );

    const handleScroll = (event: any) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        scrollViewPosition.current = scrollX;

        // Sinhronizuje samo indeks bez promene redosleda
        const newIndex = Math.round(scrollX / (windowWidth * 0.1));
        setCurrentIndex(newIndex);
    };

    const fetchUpdatedDeviceElements = useCallback(() => {
        fetchInspectionDeviceElements(inspectionId, setInspectionDeviceElements);
    }, [inspectionId]);

    const handleScrollRight = useCallback(() => {
        if (currentIndex < filteredElements.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            scrollViewRef.current?.scrollTo({
                x: newIndex * (isTablet ? windowWidth * 0.1 : windowWidth * 0.33),
                animated: true,
            });
        }
    }, [currentIndex, filteredElements.length, isTablet]);

    const handleScrollLeft = useCallback(() => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            scrollViewRef.current?.scrollTo({
                x: newIndex * (isTablet ? windowWidth * 0.1 : windowWidth * 0.33),
                animated: true,
            });
        }
    }, [currentIndex, isTablet]);

    const totalItemsWidth = useMemo(
        () =>
            isTablet
                ? filteredElements.length * (windowWidth * 0.25)
                : filteredElements.length * (windowWidth * 0.33),
        [filteredElements.length, isTablet],
    );

    const remainingSpace = useMemo(() => totalItemsWidth - windowWidth, [totalItemsWidth]);
    const snapInterval = useMemo(
        () => (remainingSpace < filteredElements.length ? remainingSpace : windowWidth),
        [remainingSpace, filteredElements.length],
    );

    const positionName = useMemo(() => {
        switch (positionId) {
            case 1:
                return 'Anlage';
            case 2:
                return 'Zonen Davor';
            case 3:
                return 'Zonen Danach';
            default:
                return '';
        }
    }, [positionId]);

    return (
        <View style={styles.container}>
            <View style={styles.Head}>
                <TextTitle text={positionName} isTablet={isTablet} />
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
            <View style={styles.containerImages}>
                {filteredElements.length > 0 && (
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={snapInterval}
                        snapToAlignment="center"
                        decelerationRate="normal"
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    >
                        {filteredElements.map((element) => (
                            <InspectionDeviceElementImg
                                key={element.id}
                                deviceElement={element}
                                onFocusChange={handleFocusChange}
                                isFocused={element.id.toString() === focusedDeviceId}
                                onDeleteElement={handleDeleteElement}
                                moveLeft={() => handleMove(element, 'left')}
                                moveRight={() => handleMove(element, 'right')}
                                isTablet={isTablet}
                                currentIndex={currentIndex}
                                index={filteredElements.indexOf(element)}
                                selectedElementsCount={selectedElementsCount}
                            />
                        ))}
                    </ScrollView>
                )}
            </View>

            <ErrorInformationModal
                visible={errorModalVisible}
                message={errorMessage}
                onClose={() => setErrorModalVisible(false)}
            />
        </View>
    );
};

export default InspectionDeviceElements;
