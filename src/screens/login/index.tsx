import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, colors, Input, Text } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginFailure, loginSuccess } from '../../redux/slices/auth';
import { getUserData, useAuthenticated } from '../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ValidScreens } from '../../constants/screens';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.white,
    },

    registration: {
        paddingTop: 10,
    },

    link: {
        color: colors.primary,
    },

    failValidation: {
        color: colors.error,
    },
});

const LoginScreen: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const authError = useSelector((state: RootState) => state.auth.error);
    const navigation = useNavigation();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        getUserData().then((data) => {
            if (data) {
                if (login === data.login && password === data.password) {
                    dispatch(
                        loginSuccess({
                            login,
                            password,
                            username: data.username,
                        }),
                    );
                    useAuthenticated('YES');
                    navigation.navigate(ValidScreens.POSTS_LIST_SCREEN);
                } else {
                    dispatch(loginFailure('Неверные данные'));
                }
            }
        });
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Логин пользователя"
                value={login}
                onChangeText={(text) => setLogin(text)}
            />
            <Input
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Войти" onPress={handleLogin} />
            {authError && (
                <Text style={styles.failValidation}>{authError}</Text>
            )}

            <TouchableOpacity
                style={styles.registration}
                onPress={() =>
                    navigation.navigate(ValidScreens.REGISTER_SCREEN)
                }
            >
                <Text style={styles.link}>{'Зарегистрироваться'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
