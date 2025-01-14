import { StyleSheet, Dimensions } from 'react-native';
import { customColors } from './customStyles';

const windowWidth = Dimensions.get('window').width;
const tabletThreshold = 600;
const isTablet = windowWidth >= tabletThreshold;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: customColors.blueLighter,
    },
    containerImages: {
        backgroundColor: customColors.blueDarker,
        height: isTablet ? windowWidth * 0.25 : windowWidth * 0.3,
    },
    containerImagesDouble: {
        backgroundColor: customColors.blueDarker,
        height: windowWidth * 0.4,
    },
    Head: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
    arrowsContainer: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 2,
    },
    arrows: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 2,
        alignItems: 'center',
    },
    arrowButton: {
        paddingHorizontal: 10,
    },
    arrowText: {
        fontSize: isTablet ? 60 : 30,
        color: 'blue',
        lineHeight: isTablet ? 60 : 30,
    },
    elementContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: isTablet ? windowWidth * 0.2 : windowWidth * 0.2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderColor: customColors.blueDarker,
    },
    inspectionElementContainer: {
        position: 'relative',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
        height: isTablet ? windowWidth * 0.25 : windowWidth * 0.3,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderColor: customColors.blueDarker,
    },
    elementImageContainer: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    elementImage: {
        width: windowWidth * 0.1,
        height: windowWidth * 0.1,
        aspectRatio: 1,
    },
    name: {
        fontWeight: 'bold',
        color: 'black',
    },
    xContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
        padding: windowWidth * 0.018,
        borderRadius: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstOptionSeparator: {
        borderTopWidth: 2,
    },
    imageFocused: {
        backgroundColor: customColors.blueLightest,
        borderWidth: 2,
        borderColor: 'black',
    },
    arrowContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        bottom: 10,
    },
    elementArrowButton: {
        padding: windowWidth * 0.012,
        backgroundColor: customColors.blue,
        borderRadius: 50,
    },
    option: {
        padding: 10,
        borderBottomWidth: 2,
        borderColor: '#ccc',
        width: '100%',
        alignItems: 'center',
    },
});

export default styles;
