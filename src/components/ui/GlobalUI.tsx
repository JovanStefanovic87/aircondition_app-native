//src\components\ui\GlobalUI.tsx
import React from 'react';
import LoaderOverlay from './LoaderOverlay';
import ErrorInformationModal from '../modals/ErrorInformationModal';
import SuccessModal from '../modals/SuccessModal';
import { useInspectionStore } from '../../store/store';

const GlobalUI = () => {
    const { isLoading, loadingText, error, setError, success, setSuccess } = useInspectionStore();

    return (
        <>
            <LoaderOverlay visible={isLoading} message={loadingText ?? 'Učitavanje...'} />

            <ErrorInformationModal
                visible={!!error}
                message={error}
                onClose={() => setError(null)}
            />

            <SuccessModal visible={!!success} message={success} onClose={() => setSuccess(null)} />
        </>
    );
};

export default GlobalUI;
