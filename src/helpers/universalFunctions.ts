import { Dimensions } from 'react-native';
import RNFS from 'react-native-fs';

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

export const deleteFile = async (filePath: string) => {
    try {
        const fileExists = await RNFS.exists(filePath);
        if (fileExists) {
            await RNFS.unlink(filePath);
            console.log('File deleted successfully');
        } else {
            console.log('File does not exist');
        }
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};
