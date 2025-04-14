import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { customColors } from '../assets/styles/customStyles';
import { useInspectionStore } from '../store/store';
import {
    getDeviceStateImages,
    getInspectionQuestions,
    getQuestionImages,
} from '../../database/dataAccess/Query/sqlQueries';
import {
    saveInspectionQuestion,
    saveQuestionImage,
} from '../../database/dataAccess/Command/sqlCommands';
import IconButton from '../components/buttons/IconButton';
import {
    DeviceStateComponentsForInspection,
    ImageGallery,
    ImageTypesByDbTable,
    TypedQuestionGroupForUI,
} from '../../database/types';
import QuestionButton from '../components/buttons/QustionButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PrimaryButton from '../components/buttons/PrimaryButton';
import GalleryModal from '../components/modals/GalleryModal';
import TakePicture from '../components/camera/TakePicture';
import ErrorInformationModal from '../components/modals/ErrorInformationModal';
import { IMAGE_TYPES } from '../helpers/constants';

type NewInspectionScreenNavigationProp = NavigationProp<Record<string, object>, string>;

const QuestionsScreen = () => {
    const navigation = useNavigation<NewInspectionScreenNavigationProp>();
    const inspectionId = useInspectionStore((state) => state.inspectionId);
    const [questionsData, setQuestionsData] = useState<TypedQuestionGroupForUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [responses, setResponses] = useState<
        Record<number, { answerId: string | null; comment: string }>
    >({});
    const [selectedDeviceElementId, setSelectedDeviceElementId] = useState<string | null>(null);
    const [allCompleted, setAllCompleted] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<number | null>(null);
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [imageSaveParams, setImageSaveParams] = useState<ImageDeviceStateSave | null>(null);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [isGalleryVisible, setGalleryVisible] = useState(false);
    const [galleryImages, setGalleryImages] = useState<ImageGallery[]>([]);
    const [galeryTitle, setGalleryTitle] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [inspectionDeviceStateDetails, setInspectionDeviceStateDetails] = useState<
        DeviceStateComponentsForInspection[]
    >([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onPressGallery = async (questionId: string) => {
        try {
            const images = await getQuestionImages(questionId);
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
            setErrorMessage('Greška pri učitavanju slika.');
            setErrorModalVisible(true);
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
                setLoading(false);
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

    const handleDeviceStateGalleryClick = async (titleId: number, groupTypeId: number) => {
        if (!inspectionDeviceStateDetails) {
            console.error('InspectionDeviceStateDetails is not loaded.');
            return;
        }

        const group = inspectionDeviceStateDetails.find((group) =>
            group.titleComponents.some((title) =>
                title.deviceStateComponents.some(
                    (deviceState) =>
                        deviceState.titleComponentId === titleId &&
                        deviceState.groupTypeId === groupTypeId,
                ),
            ),
        );

        if (!group) {
            console.error(
                `Group containing titleId: ${titleId} and groupTypeId: ${groupTypeId} not found`,
            );
            return;
        }

        const title = group.titleComponents.find((title) =>
            title.deviceStateComponents.some(
                (deviceState) =>
                    deviceState.titleComponentId === titleId &&
                    deviceState.groupTypeId === groupTypeId,
            ),
        );

        if (!title) {
            console.error(
                `Title with titleId: ${titleId} and groupTypeId: ${groupTypeId} not found`,
            );
            return;
        }

        const galleryTitle = `${group.groupTypeName} - ${title.name}`;
        setGalleryTitle(galleryTitle);

        if (selectedElementId) {
            const deviceImages = await getDeviceStateImages(
                titleId,
                groupTypeId,
                parseInt(selectedElementId),
            );
            if (deviceImages && deviceImages.length > 0) {
                setGalleryImages(
                    deviceImages.map((image) => ({
                        imageId: image.id,
                        imagePath: image.storagePath,
                        imageType: IMAGE_TYPES.DeviceState_Title_Group_Image as ImageTypesByDbTable,
                    })),
                );

                setGalleryVisible(true);
            } else {
                console.log('No images found for this titleId and groupTypeId.');
            }
        }
    };

    const handleSaveDeviceElementImage = async (path: string, questionId: string) => {
        try {
            const record = {
                storagePath: path,
                name: 'Device Image',
            };
            await saveQuestionImage(questionId, record);
            console.log('Image saved successfully');
        } catch (error) {
            console.error('Error saving device element image:', error);
            setErrorMessage('Failed to save the image. Please try again.');
            setErrorModalVisible(true);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ErrorInformationModal
                visible={errorModalVisible}
                message={errorMessage}
                onClose={() => setErrorModalVisible(false)}
            />
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
                {loading ? (
                    <Text>Laden...</Text>
                ) : error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : (
                    <>
                        {/* Tabs za inspekcije */}
                        <View style={styles.tabsContainer}>
                            {questionsData.map((type) => (
                                <TouchableOpacity
                                    key={type.inspectionTypeId}
                                    style={[
                                        styles.tab,
                                        selectedTab === type.inspectionTypeId && styles.activeTab,
                                    ]}
                                    onPress={() => setSelectedTab(type.inspectionTypeId)}
                                >
                                    <Text
                                        style={[
                                            styles.tabText,
                                            selectedTab === type.inspectionTypeId &&
                                                styles.activeTabText,
                                        ]}
                                    >
                                        {type.inspectionTypeName}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Prikaz pitanja za izabranu inspekciju */}
                        <ScrollView style={styles.scrollView}>
                            {questionsData
                                .filter((type) => type.inspectionTypeId === selectedTab)
                                .map((type) => (
                                    <View
                                        key={type.inspectionTypeId}
                                        style={styles.inspectionContainer}
                                    >
                                        {type.questionsByGroup.map((group) => (
                                            <View key={group.groupId} style={styles.groupContainer}>
                                                <View style={styles.groupHeader}>
                                                    <Text style={styles.groupTitle}>
                                                        {group.name}
                                                    </Text>
                                                    {group.questions.length > 0 && (
                                                        <TouchableOpacity
                                                            style={styles.allYesButton}
                                                            onPress={() => {
                                                                const hasNein =
                                                                    group.questions.some(
                                                                        (q) =>
                                                                            responses[
                                                                                q
                                                                                    .inspectionQuestionId
                                                                            ]?.answerId === 2,
                                                                    );

                                                                if (hasNein) {
                                                                    setErrorMessage(
                                                                        'Mindestens eine Frage wurde mit "Nein" beantwortet.',
                                                                    );
                                                                    setErrorModalVisible(true);
                                                                } else {
                                                                    group.questions.forEach((q) => {
                                                                        handleResponse(
                                                                            q.inspectionQuestionId,
                                                                            'Ja',
                                                                        );
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            <Text style={styles.allYesButtonText}>
                                                                JA
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                </View>
                                                {group.questions.map((q) => (
                                                    <View
                                                        key={q.inspectionQuestionId}
                                                        style={styles.questionContainer}
                                                    >
                                                        <Text style={styles.questionText}>
                                                            {q.questionNumber}. {q.fullDescription}
                                                        </Text>
                                                        <View style={styles.buttonContainer}>
                                                            {[
                                                                {
                                                                    label: 'Ja',
                                                                    color: customColors.greenMid,
                                                                },
                                                                {
                                                                    label: 'Nein',
                                                                    color: customColors.redLight,
                                                                },
                                                                {
                                                                    label: 'Nicht relevant',
                                                                    color: '#9E9E9E',
                                                                },
                                                            ].map(({ label, color }) => (
                                                                <QuestionButton
                                                                    key={label}
                                                                    label={label}
                                                                    responses={responses}
                                                                    q={q}
                                                                    color={color}
                                                                    handleResponse={handleResponse}
                                                                />
                                                            ))}
                                                        </View>
                                                        <View style={styles.buttonContainer}>
                                                            <TextInput
                                                                style={styles.commentInput}
                                                                placeholder="Kommentar eingeben..."
                                                                value={
                                                                    responses[
                                                                        q.inspectionQuestionId
                                                                    ]?.comment || ''
                                                                }
                                                                onChangeText={(text) =>
                                                                    handleCommentChange(
                                                                        q.inspectionQuestionId,
                                                                        text,
                                                                    )
                                                                }
                                                                onBlur={() =>
                                                                    handleCommentBlur(
                                                                        q.inspectionQuestionId,
                                                                    )
                                                                }
                                                            />
                                                            <View
                                                                style={styles.cameraIconsContainer}
                                                            >
                                                                <IconButton
                                                                    icon="camera"
                                                                    onPress={() =>
                                                                        toggleCameraDevice(
                                                                            q.inspectionQuestionId,
                                                                            Number(group.groupId),
                                                                        )
                                                                    }
                                                                />
                                                                <IconButton
                                                                    icon="image"
                                                                    onPress={() =>
                                                                        onPressGallery(
                                                                            q.inspectionQuestionId,
                                                                        )
                                                                    }
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>
                                        ))}
                                    </View>
                                ))}
                        </ScrollView>
                    </>
                )}
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
        marginBottom: 10,
    },
    inspectionContainer: {
        marginBottom: 30, // Razmak između različitih inspekcija
        padding: 15,
        backgroundColor: customColors.blueLighter,
        borderRadius: 10,
    },
    tabsContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
    tab: { padding: 12, borderRadius: 8, backgroundColor: '#ccc', marginHorizontal: 5 },
    activeTab: { backgroundColor: customColors.blueDark },
    tabText: { fontSize: 18, fontWeight: 'bold', color: 'black' },
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
        bottom: 20,
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
