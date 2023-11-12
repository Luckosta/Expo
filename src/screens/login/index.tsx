import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, colors, Input, Text } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginFailure, loginSuccess } from '../../redux/slices/auth';
import { getUserData } from '../../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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

const Login: React.FC = (): JSX.Element => {
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
                } else {
                    dispatch(loginFailure('Неверные данные'));
                }
            }
        });
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Имя пользователя"
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
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.link}>{'Зарегистрироваться'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
