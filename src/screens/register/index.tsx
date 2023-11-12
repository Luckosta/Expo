// Register.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, colors, Input, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { registerUser } from '../actions/authActions';
import registerUserAsync from '../../redux/actions/register';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.white,
    },
});

const Register: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password === confirmPassword) {
            try {
                await AsyncStorage.setItem('username', username);
                await AsyncStorage.setItem('login', login);
                await AsyncStorage.setItem('password', password);
                dispatch(registerUserAsync(username, login, password));
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

export default Register;
