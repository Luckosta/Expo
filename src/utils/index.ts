import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkCredentials = ({
    login,
    password,
}: Record<string, string>) => {
    const correctLogin = 'correctLogin';
    const correctPassword = 'correctPassword';

    if (login === correctLogin && password === correctPassword) {
        return true;
    } else {
        return false;
    }
};

export const setUserData = async ({ username, login, password }: UserData) => {
    if (username) {
        await AsyncStorage.setItem('username', username);
    }
    if (login) {
        await AsyncStorage.setItem('login', login);
    }
    if (password) {
        await AsyncStorage.setItem('password', password);
    }
};

export const getUserData = async (): Promise<UserData | null> => {
    const savedUsername = await AsyncStorage.getItem('username');
    const savedLogin = await AsyncStorage.getItem('login');
    const savedPassword = await AsyncStorage.getItem('password');
    if (savedUsername && savedLogin && savedPassword) {
        return {
            username: savedUsername,
            login: savedLogin,
            password: savedPassword,
        };
    }
    return null;
};

export const useAuthenticated = async (isAuth: AuthType) => {
    await AsyncStorage.setItem('auth', isAuth);
};
