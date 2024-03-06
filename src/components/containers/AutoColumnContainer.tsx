import React from 'react';
import { View, Dimensions, DimensionValue } from 'react-native';
import { calculateColumnWidth } from '../../helpers/universalFunctions';

interface Props {
    children: React.ReactNode;
    minColumnWidth?: number;
    gap?: number;
    marginBottom?: number;
}

const AutoColumnContainer: React.FC<Props> = ({
    children,
    minColumnWidth = Dimensions.get('window').width,
    gap = 0,
    marginBottom = 10,
}) => {
    const width = calculateColumnWidth(minColumnWidth);

    return <View style={{ width: width as DimensionValue, gap, marginBottom }}>{children}</View>;
};

export default AutoColumnContainer;
