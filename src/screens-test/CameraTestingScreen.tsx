import React, { useEffect, useState } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import { launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-storage';

// Initialize SQLite database
const db = SQLite.openDatabase(
    {
        name: 'ImageDB',
        location: 'default',
    },
    () => console.log('Database opened'),
    (error) => console.error('Error opening database:', error),
);

const PictureScreen: React.FC = () => {
    const [imagePath, setImagePath] = useState<string | null>(null);

    // Initialize table and fetch image path on mount
    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Images (id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT);',
                [],
                () => console.log('Table created'),
                (tx, error) => console.error('Error creating table:', error),
            );
        });
    }, []);

    const takePicture = () => {
        launchCamera(
            { mediaType: 'photo', saveToPhotos: true },
            (response: ImagePickerResponse) => {
                if (response.didCancel || response.errorCode) {
                    console.error(
                        'Camera operation cancelled or error occurred:',
                        response.errorMessage,
                    );
                    return;
                }

                const uri = response.assets?.[0]?.uri;
                if (uri) {
                    db.transaction((tx) => {
                        tx.executeSql(
                            'INSERT INTO Images (path) VALUES (?);',
                            [uri],
                            () => {
                                console.log('Image path saved to database');
                                setImagePath(uri);
                            },
                            (tx, error) => console.error('Error saving image path:', error),
                        );
                    });
                }
            },
        );
    };

    console.log('imagePath:', imagePath);

    return (
        <View style={styles.container}>
            {imagePath ? (
                <Image source={{ uri: imagePath }} style={styles.image} />
            ) : (
                <Text>No image available</Text>
            )}
            <Button title="Take Picture" onPress={takePicture} />
            <Button title="Clear image" onPress={() => setImagePath('')} />

            <Button
                title="Check saved image path"
                onPress={() =>
                    db.transaction((tx) => {
                        tx.executeSql(
                            'SELECT path FROM Images ORDER BY id DESC LIMIT 1;',
                            [],
                            (_, results) => {
                                if (results.rows.length > 0) {
                                    setImagePath(results.rows.item(0).path);
                                }
                            },
                            (tx, error) => console.error('Error fetching data:', error),
                        );
                    })
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
});

export default PictureScreen;
