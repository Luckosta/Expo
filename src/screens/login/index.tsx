import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, colors, Input, Text } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../../redux/slices/auth';

//import { loginUser } from '../actions/authActions';

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
});

const Login: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    //const authError = useSelector((state) => state.auth.error);
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatch(loginUser(username, password));
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Имя пользователя"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <Input
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Button title="Войти" onPress={handleLogin} />
            {/*{authError && <Text style={{ color: 'red' }}>{authError}</Text>}*/}

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
