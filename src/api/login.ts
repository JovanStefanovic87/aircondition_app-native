import Config from 'react-native-config';

export const authenticateUser = async (username: string, password: string) => {
    const url = `${Config.API_URL}/api/login`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    return response;
};
