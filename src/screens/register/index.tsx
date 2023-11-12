// Register.js
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, colors, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../../redux/slices/auth';
import { setUserData } from '../../utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.white,
    },
});

const RegisterScreen: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password === confirmPassword) {
            try {
                setUserData({ username, login, password });
                dispatch(registerUser({ username, login, password }));
                navigation.goBack();
            } catch (error) {
                console.error('Ошибка сохранения данных пользователя:');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Имя пользователя"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
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
            <Input
                placeholder="Подтвердите пароль"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />
            <Button title="Зарегистрироваться" onPress={handleRegister} />
        </View>
    );
};

export default RegisterScreen;
