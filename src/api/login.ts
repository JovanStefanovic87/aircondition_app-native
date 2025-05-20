import { getAdminApiUrl } from './helpers/functions';

export const authenticateUser = async (username: string, password: string) => {
    const url = `${getAdminApiUrl()}/api/login`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    }).catch((error) => {
        console.error('Fehler beim Login:', error);
    });

    return response;
};
