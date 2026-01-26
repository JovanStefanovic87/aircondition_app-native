import React, { FC, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';
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

// 🔒 JEDINA MATEMATIKA
const MAX_PER_SCREEN = 6;
const ELEMENT_WIDTH = windowWidth / MAX_PER_SCREEN;

type Props = {
    inspectionDeviceElements: InspectionDeviceElement[];
    positionId: number;
};

const InspectionDeviceElements: FC<Props> = ({ inspectionDeviceElements, positionId }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const inspectionId = useInspectionStore((state) => state.inspectionId);

    const [filteredElements, setFilteredElements] = useState<InspectionDeviceElement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [focusedDeviceId, setFocusedDeviceId] = useState<string | null>(null);
    const [isTablet, setIsTablet] = useState(false);

    const setInspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.setInspectionDeviceElements,
    );

    const scrollViewPosition = useRef(0);

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setIsTablet(windowWidth >= tabletThreshold);
    }, []);

    useEffect(() => {
        const mapped = inspectionDeviceElements
            .map((e) => ({
                ...e,
                name: e.imageFileName.split('.')[0],
            }))
            .sort((a, b) => a.deviceOrder - b.deviceOrder);

        setFilteredElements(mapped);
    }, [inspectionDeviceElements]);

    const handleFocusChange = useCallback(
        (deviceId: string, focused: boolean) => {
            if (!focused) {
                setFocusedDeviceId(null);
                return;
            }

            const idx = filteredElements.findIndex((el) => el.id.toString() === deviceId);

            if (idx !== -1) {
                setFocusedDeviceId(deviceId);
                setCurrentIndex(idx);
            }
        },
        [filteredElements],
    );

    const handleDeleteElement = useCallback(
        (deletedId: string) => {
            try {
                const deleted = filteredElements.find((e) => e.id === deletedId);
                if (!deleted) return;

                const updated = filteredElements
                    .filter((e) => e.id !== deletedId)
                    .map((e) =>
                        e.deviceOrder > deleted.deviceOrder
                            ? { ...e, deviceOrder: e.deviceOrder - 1 }
                            : e,
                    );

                saveDeviceElementsSortOrder(
                    updated.map((e) => ({ id: e.id, deviceOrder: e.deviceOrder })),
                );

                setFilteredElements(updated);

                const newIndex = Math.max(0, Math.min(currentIndex, updated.length - 1));
                setCurrentIndex(newIndex);

                scrollViewRef.current?.scrollTo({
                    x: newIndex * ELEMENT_WIDTH,
                    animated: true,
                });
            } catch (error) {
                setErrorMessage(error.message);
                setErrorModalVisible(true);
            }
        },
        [filteredElements, currentIndex],
    );

    const handleMove = useCallback(
        async (element: InspectionDeviceElement, direction: 'left' | 'right') => {
            const index = filteredElements.findIndex((el) => el.id === element.id);
            if (index === -1) return;

            const targetIndex = direction === 'left' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex >= filteredElements.length) return;

            const target = filteredElements[targetIndex];

            try {
                saveDeviceElementsSortOrder([
                    { id: element.id, deviceOrder: target.deviceOrder },
                    { id: target.id, deviceOrder: element.deviceOrder },
                ]);

                const updated = [...filteredElements];
                updated[index] = { ...target, deviceOrder: element.deviceOrder };
                updated[targetIndex] = { ...element, deviceOrder: target.deviceOrder };
                setFilteredElements(updated);
                setCurrentIndex(targetIndex);

                const elementX = targetIndex * ELEMENT_WIDTH;
                const visibleStart = scrollViewPosition.current;
                const visibleEnd = visibleStart + windowWidth;

                if (elementX < visibleStart) {
                    scrollViewRef.current?.scrollTo({ x: elementX, animated: true });
                } else if (elementX + ELEMENT_WIDTH > visibleEnd) {
                    scrollViewRef.current?.scrollTo({
                        x: elementX + ELEMENT_WIDTH - windowWidth,
                        animated: true,
                    });
                }
            } catch (error) {
                setErrorMessage(error.message);
                setErrorModalVisible(true);
            }
        },
        [filteredElements],
    );

    const handleScroll = (event: any) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        scrollViewPosition.current = scrollX;
        setCurrentIndex(Math.round(scrollX / ELEMENT_WIDTH));
    };

    const handleScrollLeft = () => {
        if (currentIndex <= 0) return;
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        scrollViewRef.current?.scrollTo({
            x: newIndex * ELEMENT_WIDTH,
            animated: true,
        });
    };

    const handleScrollRight = () => {
        if (currentIndex >= filteredElements.length - 1) return;
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        scrollViewRef.current?.scrollTo({
            x: newIndex * ELEMENT_WIDTH,
            animated: true,
        });
    };

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
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {filteredElements.map((element, index) => (
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
                            index={index}
                            selectedElementsCount={filteredElements.length}
                        />
                    ))}
                </ScrollView>
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
