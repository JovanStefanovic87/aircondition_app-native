import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
    isOpen?: boolean;
    children: ReactNode;
};

const DeviceStateColumnBody: React.FC<Props> = ({ isOpen = true, children }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
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

export default DeviceStateColumnBody;
