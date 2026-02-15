import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { customColors } from '../assets/styles/customStyles';
import { useInspectionStore } from '../store/store';
import {
    getInspectionQuestions,
    getInspectionQuestionImages,
    getInspectionStatus,
    getInspectionType,
} from '../../database/dataAccess/Query/sqlQueries';
import {
    saveInspectionQuestion,
    saveQuestionImage,
    updateInspectionStatus,
} from '../../database/dataAccess/Command/sqlCommands';
import { ImageGallery, ImageTypesByDbTable, TypedQuestionGroupForUI } from '../../database/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PrimaryButton from '../components/buttons/PrimaryButton';
import GalleryModal from '../components/modals/GalleryModal';
import TakePicture from '../components/camera/TakePicture';
import { IMAGE_TYPES } from '../helpers/constants';
import { RenderTabs, RenderQuestionsByType } from '../components/questions_screen_content';

type NewInspectionScreenNavigationProp = NavigationProp<Record<string, object>, string>;

const QuestionsScreen = () => {
    const { setIsLoading, setLoadingText, setError } = useInspectionStore();
    const navigation = useNavigation<NewInspectionScreenNavigationProp>();
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [questionsData, setQuestionsData] = useState<TypedQuestionGroupForUI[]>([]);
    const [responses, setResponses] = useState<
        Record<number, { answerId: string | null; comment: string }>
    >({});
    const [allCompleted, setAllCompleted] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<number | null>(null);
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [imageSaveParams, setImageSaveParams] = useState<ImageDeviceStateSave | null>(null);
    const [isGalleryVisible, setGalleryVisible] = useState(false);
    const [galleryImages, setGalleryImages] = useState<ImageGallery[]>([]);
    const [galeryTitle, setGalleryTitle] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const onPressGallery = async (questionId: string) => {
        try {
            const images = await getInspectionQuestionImages(questionId);
            setGalleryImages(
                images.map((img) => ({
                    imageId: img.id,
                    imagePath: img.storagePath,
                    imageType: IMAGE_TYPES.Question_Image as ImageTypesByDbTable,
                })),
            );
            setGalleryTitle('Slike pitanja');
            setGalleryVisible(true);
        } catch (error) {
            console.error('Failed to load question images:', error);
            setError('Fehler beim Laden der Bilder.');
        }
    };

    const handleCloseGallery = () => {
        setGalleryVisible(false);
    };

    const handleCloseCamera = () => {
        setCameraVisible(false);
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                setLoadingText('Lade Fragen...');

                const data = await getInspectionQuestions(inspectionId);
                setQuestionsData(data);

                if (data.length > 0) {
                    setSelectedTab(data[0].inspectionTypeId);
                }

                const initialResponses: Record<
                    number,
                    { answerId: string | null; comment: string }
                > = {};

                data.forEach((type) => {
                    type.questionsByGroup.forEach((group) => {
                        group.questions.forEach((q) => {
                            initialResponses[q.inspectionQuestionId] = {
                                answerId:
                                    q.answerId !== null && q.answerId !== undefined
                                        ? Number(q.answerId)
                                        : null,
                                comment: q.comment ?? '',
                            };
                        });
                    });
                });

                setResponses(initialResponses);
            } catch (err) {
                setError('Fehler beim Abrufen der Fragen');
            } finally {
                setIsLoading(false);
                setLoadingText(null);
            }
        };

        fetchQuestions();
    }, [inspectionId]);

    const answerMapping: Record<string, number> = {
        Ja: 1,
        Nein: 2,
        'Nicht relevant': 3,
    };

    const handleResponse = (questionId: string, label: string) => {
        const answerId = answerMapping[label] ?? null;

        setResponses((prev) => {
            const updatedResponses = {
                ...prev,
                [questionId]: {
                    answerId,
                    comment: prev[questionId]?.comment || '',
                },
            };

            saveInspectionQuestion({
                id: questionId,
                answerId: answerId?.toString() || '',
                comment: updatedResponses[questionId].comment,
            });

            return updatedResponses;
        });
    };

    const handleCommentChange = (questionId: string, comment: string) => {
        setResponses((prev) => ({
            ...prev,
            [questionId]: { answerId: prev[questionId]?.answerId ?? '', comment },
        }));
    };

    const handleCommentBlur = (questionId: string) => {
        const { answerId, comment } = responses[questionId] || {};
        saveInspectionQuestion({
            id: questionId,
            answerId: answerId?.toString() || '',
            comment,
        });
    };

    const submit = async () => {
        const inspectionType = await getInspectionType(inspectionId);

        if ([1, 2, 6].includes(inspectionType)) {
            updateInspectionStatus(inspectionId, 2);
        }

        if (isAllCompleted()) {
            navigation.navigate('AllInspectionsScreen');
        } else {
            console.log('error');
        }
    };

    useEffect(() => {
        setAllCompleted(isAllCompleted());
    }, [responses]);

    const isAllCompleted = () => {
        return Object.values(responses).every((response) => response.answerId !== null);
    };

    interface ImageDeviceStateSave {
        questionId: string;
        groupId: number;
    }

    const toggleCameraDevice = (questionId: string, groupId: number) => {
        if (!questionId || isNaN(groupId)) {
            console.warn('Invalid IDs in toggleCameraDevice:', questionId, groupId);
            return;
        }

        setCameraVisible(!isCameraVisible);
        setImageSaveParams({ questionId, groupId });
    };

    const handleSaveDeviceElementImage = async (path: string, questionId: string) => {
        try {
            const record = {
                storagePath: path,
                name: 'InspectionQuestion_Image',
            };
            await saveQuestionImage(questionId, record);
            console.log('Image saved successfully');
        } catch (error) {
            console.error('Error saving device element image:', error);
            setError('Fehler beim Speichern des Bildes. Bitte versuchen Sie es erneut.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <GalleryModal
                visible={isGalleryVisible}
                images={galleryImages}
                title={galeryTitle || 'ANLAGE -- ANLAGE'}
                onClose={handleCloseGallery}
                setGalleryImages={setGalleryImages}
            />
            <TakePicture
                visible={isCameraVisible}
                onClose={handleCloseCamera}
                saveImage={(path) => {
                    const questionId = imageSaveParams?.questionId;

                    if (questionId) {
                        handleSaveDeviceElementImage(path, questionId);
                    } else {
                        console.error('imageSaveParams are missing or invalid!');
                    }
                }}
                photoPreview={photoPreview}
                setPhotoPreview={setPhotoPreview}
            />
            <GestureHandlerRootView style={styles.scrollContainer}>
                <>
                    <RenderTabs
                        questionsData={questionsData}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />

                    {/* Prikaz pitanja za izabranu inspekciju */}
                    <ScrollView style={styles.scrollView}>
                        <RenderQuestionsByType
                            questionsData={questionsData}
                            selectedTab={selectedTab}
                            responses={responses}
                            handleResponse={handleResponse}
                            handleCommentChange={handleCommentChange}
                            handleCommentBlur={handleCommentBlur}
                            toggleCameraDevice={toggleCameraDevice}
                            onPressGallery={onPressGallery}
                            setIsLoading={setIsLoading}
                            setLoadingText={setLoadingText}
                            setError={setError}
                        />
                    </ScrollView>
                </>
            </GestureHandlerRootView>
            <View style={styles.rightAlign}>
                <PrimaryButton
                    title="Nächster Schritt"
                    onPress={submit}
                    isDisabled={!allCompleted}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        alignItems: 'center',
        width: '100%',
        maxHeight: '92%',
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
    scrollView: {
        width: '100%',
    },
    groupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    inspectionContainer: {
        marginBottom: 30,
        padding: 15,
        backgroundColor: customColors.blueLighter,
        borderRadius: 10,
    },
    tabsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 10,
        marginVertical: 10,
    },
    tab: {
        width: '46%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '1%',
    },
    activeTab: { backgroundColor: customColors.blueDark },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        maxWidth: '100%',
        overflow: 'hidden',
        textAlign: 'center',
    },

    activeTabText: { color: 'white' },
    inspectionTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: customColors.blackText,
        marginBottom: 10,
        textAlign: 'center',
    },
    typeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    groupContainer: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: customColors.blueDark,
        borderRadius: 6,
        marginBottom: 5,
    },
    groupTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        maxWidth: '70%',
        flexShrink: 1,
    },
    questionContainer: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: customColors.grayLight,
        borderRadius: 6,
        marginTop: 5,
    },
    questionText: {
        fontSize: 20,
        color: customColors.blackText,
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 5,
    },
    commentInput: {
        flex: 1,
        marginTop: 10,
        padding: 10,
        borderRadius: 6,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 18,
        color: customColors.blackText,
    },
    rightAlign: {
        display: 'flex',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 2,
        paddingHorizontal: 20,
        width: '100%',
    },
    allYesButton: {
        backgroundColor: customColors.greenMid,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: '20%',
    },
    allYesButtonText: {
        color: '#FFD700',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
    cameraIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        maxWidth: '40%',
        paddingLeft: 10,
    },
});

export default QuestionsScreen;
