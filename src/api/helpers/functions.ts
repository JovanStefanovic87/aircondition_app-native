import { DEV_AC_ADMIN_URL, PROD_AC_ADMIN_API_URL } from './constants';

export const getAdminApiUrl = () => {
    if (__DEV__) {
        return DEV_AC_ADMIN_URL;
    } else {
        return PROD_AC_ADMIN_API_URL;
    }
};
