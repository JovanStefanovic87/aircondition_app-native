import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
    isOpen?: boolean;
    children: ReactNode;
    marginTop?: number;
};

const CollapsibleTableBody: React.FC<Props> = ({ isOpen = true, children, marginTop = 0 }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: marginTop,
        },
    });

    return (
        <View style={styles.container}>
            <View
                style={{
                    height: isOpen ? '100%' : 0,
                    overflow: 'hidden',
                }}
            >
                {children}
            </View>
        </View>
    );
};

export default CollapsibleTableBody;
