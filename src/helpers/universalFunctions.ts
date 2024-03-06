import { Dimensions } from 'react-native';

export const calculateMinColumnWidth = (percentage: number) => {
    const containerWidth = Dimensions.get('window').width;
    return containerWidth * (percentage / 100);
};

export const calculateColumnWidth = (minColumnWidth: number): string => {
    const screenWidth = Dimensions.get('window').width;
    const numberOfColumns = screenWidth / minColumnWidth;
    const width = screenWidth < 600 ? '100%' : `${100 / numberOfColumns}%`;
    return width;
};
