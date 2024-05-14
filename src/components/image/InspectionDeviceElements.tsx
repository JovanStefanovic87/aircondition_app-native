import React, { FC, useRef, useState, useEffect, memo } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { InspectionDeviceElement } from '../../../database/types';
import { customColors } from '../../assets/styles/customStyles';
import InspectionDeviceElementImg from './InspectionDeviceElementImg';
import { saveDeviceElementsSortOrder } from '../../../database/dataAccess/Command/sqlCommands';
import { fetchInspectionDeviceElements } from '../../helpers/api';
import { useInspectionDeviceElementsStore } from '../../store/store';

const windowWidth = Dimensions.get('window').width;

type Props = {
    inspectionDeviceElements: InspectionDeviceElement[];
};

const InspectionDeviceElements: FC<Props> = ({ inspectionDeviceElements }) => {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [filteredElements, setFilteredElements] = useState<InspectionDeviceElement[]>([]);
    const [focusedDeviceId, setFocusedDeviceId] = useState<string | null>(null);
    const setInspectionDeviceElements = useInspectionDeviceElementsStore(
        (state) => state.setInspectionDeviceElements,
    );

    const handleFocusChange = (deviceId: string, focused: boolean) => {
        if (focused) {
            setFocusedDeviceId(deviceId);
        } else {
            setFocusedDeviceId(null);
        }
    };

    /*     console.log(filteredElements); */

    useEffect(() => {
        const mappedDeviceElements = inspectionDeviceElements.map((element) => ({
            id: element.id,
            inspectionId: element.inspectionId,
            deviceElementId: element.deviceElementId,
            deviceOrder: element.deviceOrder,
            imageFileName: element.imageFileName,
            imagePath: element.imagePath,
            name: element.imageFileName.split('.')[0],
            elementPositionId: element.elementPositionId,
        }));

        const sortedElements = mappedDeviceElements.sort((a, b) => a.deviceOrder - b.deviceOrder);

        setFilteredElements(sortedElements);
    }, [inspectionDeviceElements, focusedDeviceId]);

    const handleDeleteElement = async (deletedElementId: string) => {
        try {
            const deletedElement = filteredElements.find(
                (element) => element.id === deletedElementId,
            );
            if (!deletedElement) {
                console.error('Element to delete not found:', deletedElementId);
                return;
            }

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

            await saveDeviceElementsSortOrder(
                updatedElementsWithNewOrder.map((element) => ({
                    id: element.id,
                    deviceOrder: element.deviceOrder,
                })),
            );

            setFilteredElements(updatedElementsWithNewOrder);
        } catch (error) {
            console.error('Error deleting element:', error);
        }
    };

    const handleMoveLeft = async (element: InspectionDeviceElement) => {
        const currentIndex = element.deviceOrder;
        const prevSibling = filteredElements.find((el) => el.deviceOrder === currentIndex - 1);

        if (prevSibling) {
            try {
                saveDeviceElementsSortOrder([
                    { id: element.id, deviceOrder: currentIndex - 1 },
                    { id: prevSibling.id, deviceOrder: currentIndex },
                ]);
                handleScrollLeft();
                fetchUpdatedDeviceElements();
            } catch (error) {
                console.error('Error moving left:', error);
            }
        } else {
            console.log('No previous sibling found for:', element);
        }
    };

    const handleMoveRight = async (element: InspectionDeviceElement) => {
        const currentIndex = element.deviceOrder;
        const nextSibling = filteredElements.find((el) => el.deviceOrder === currentIndex + 1);

        if (nextSibling) {
            try {
                saveDeviceElementsSortOrder([
                    { id: element.id, deviceOrder: currentIndex + 1 },
                    { id: nextSibling.id, deviceOrder: currentIndex },
                ]);

                fetchUpdatedDeviceElements();
                handleScrollRight();
            } catch (error) {
                console.error('Error moving right:', error);
            }
        } else {
            console.log('No next sibling found for:', element);
        }
    };

    const fetchUpdatedDeviceElements = () => {
        fetchInspectionDeviceElements(
            '674bfb70-bc98-40c8-9b54-0156080648c5',
            setInspectionDeviceElements,
        );
    };

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

    const renderItem = ({ item }: { item: InspectionDeviceElement }) => {
        return (
            <InspectionDeviceElementImg
                deviceElement={item}
                onFocusChange={handleFocusChange}
                isFocused={item.id.toString() === focusedDeviceId}
                onDeleteElement={handleDeleteElement}
                moveLeft={handleMoveLeft}
                moveRight={handleMoveRight}
            />
        );
    };

    const totalItemsWidth = filteredElements.length * (windowWidth * 0.33);
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
                            const index = Math.round(
                                event.nativeEvent.contentOffset.x / (windowWidth * 0.33),
                            );
                            setCurrentIndex(index);
                        }}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={15}
                        updateCellsBatchingPeriod={15}
                        initialNumToRender={15}
                        windowSize={10}
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

export default memo(InspectionDeviceElements);

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
