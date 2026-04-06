import React, { FC, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useInspectionDeviceElementsStore } from '../../store/store';
import { DeviceElementCompletionState, InspectionDeviceElement } from '../../../database/types';
import InspectionDeviceElementImgMerged from './InspectionDeviceElementImgMerged';
import styles from '../../assets/styles/imageStyles';
import ErrorInformationModal from '../modals/ErrorInformationModal';
import TextTitle from '../text/TextTitle';

interface Props {
    selectedElementId: string;
    setSelectedElementId: React.Dispatch<React.SetStateAction<string>>;
    setSelectedDeviceElementId: React.Dispatch<React.SetStateAction<string>>;
    deviceElementCompleted: DeviceElementCompletionState[];
}

const windowWidth = Dimensions.get('window').width;
const tabletThreshold = 600;

const InspectionDeviceElementsMerged: FC<Props> = ({
    selectedElementId,
    setSelectedElementId,
    setSelectedDeviceElementId,
    deviceElementCompleted,
}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredElements, setFilteredElements] = useState<InspectionDeviceElement[]>([]);
    const [isTablet, setIsTablet] = useState(false);
    const [focusedDeviceId, setFocusedDeviceId] = useState<string | null>(null);
    const inspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.inspectionDeviceElements,
    );
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const mountedRef = useRef(false);

    useEffect(() => {
        setIsTablet(windowWidth >= tabletThreshold);
    }, []);

    useEffect(() => {
        if (inspectionDeviceElements.length === 0) return;

        const mappedDeviceElements = inspectionDeviceElements.map((element) => ({
            ...element,
            name: element.imageFileName.split('.')[0],
        }));

        const sortedElements = mappedDeviceElements.sort((a, b) => {
            const groupOrder = [2, 1, 3];

            const groupDiff =
                groupOrder.indexOf(a.elementPositionId) - groupOrder.indexOf(b.elementPositionId);

            if (groupDiff !== 0) return groupDiff;

            return a.deviceOrder - b.deviceOrder;
        });

        setFilteredElements(sortedElements);

        // Set selected element ID only on initial mount
        if (!mountedRef.current && sortedElements.length > 0) {
            setFocusedDeviceId(sortedElements[0].id);
            setSelectedElementId(sortedElements[0].id);
            setSelectedDeviceElementId(sortedElements[0].id);
            mountedRef.current = true; // Prevent further updates from this effect
        }
    }, [inspectionDeviceElements, selectedElementId]);

    useEffect(() => {
        if (mountedRef.current) {
            setCurrentIndex(currentIndex);
        } else {
            mountedRef.current = true;
        }
    }, [filteredElements]);

    const handleFocusChange = useCallback(
        (deviceId: string, focused: boolean, deviceElementId: string) => {
            setSelectedElementId(deviceElementId);
            setSelectedDeviceElementId(deviceId);
            if (focused) {
                const focusedIndex = filteredElements.findIndex(
                    (element) => element.id.toString() === deviceId,
                );
                if (focusedIndex !== -1) {
                    setCurrentIndex(focusedIndex);
                    setFocusedDeviceId(deviceId);
                }
            } else {
                setFocusedDeviceId(null);
            }
        },
        [filteredElements, setSelectedElementId],
    );

    const handleScrollRight = useCallback(() => {
        if (currentIndex < filteredElements.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            scrollViewRef.current?.scrollTo({
                x: newIndex * (isTablet ? windowWidth * 0.33 : windowWidth * 0.33),
                animated: true,
            });
        }
    }, [currentIndex, filteredElements.length, isTablet]);

    const handleScrollLeft = useCallback(() => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            scrollViewRef.current?.scrollTo({
                x: newIndex * (isTablet ? windowWidth * 0.33 : windowWidth * 0.33),
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

    return (
        <View>
            <View style={styles.Head}>
                <TextTitle text={'Anlage'} isTablet={isTablet} />
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
                        onScroll={(event) => {
                            const index = Math.round(
                                event.nativeEvent.contentOffset.x / (windowWidth * 0.33),
                            );
                            setCurrentIndex(index);
                        }}
                    >
                        {filteredElements.map((element, index) => (
                            <InspectionDeviceElementImgMerged
                                key={element.id}
                                deviceElement={element}
                                onFocusChange={handleFocusChange}
                                isFocused={element.id.toString() === focusedDeviceId}
                                isTablet={isTablet}
                                currentIndex={currentIndex}
                                index={filteredElements.indexOf(element)}
                                deviceElementCompleted={deviceElementCompleted}
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

export default InspectionDeviceElementsMerged;
