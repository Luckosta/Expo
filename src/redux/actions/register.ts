import { createAsyncThunk } from '@reduxjs/toolkit';

const registerUserAsync = createAsyncThunk(
    'auth/registerUser',
    async ({ username, login, password }: UserData) => {
        try {
            const user = { username, login, password };
            return user;
        } catch (error) {
            throw new Error('Ошибка регистрации');
        }
    },
);

export default registerUserAsync;
