import {
    DEV_AC_ADMIN_URL,
    DEV_AC_S3_URL,
    PROD_AC_ADMIN_API_URL,
    PROD_AC_S3_URL,
} from './constants';

export const getAdminApiUrl = () => {
    if (__DEV__) {
        return DEV_AC_ADMIN_URL;
    } else {
        return PROD_AC_ADMIN_API_URL;
    }
};

export const getS3Url = () => {
    if (__DEV__) {
        return DEV_AC_S3_URL;
    } else {
        return PROD_AC_S3_URL;
    }
};
