// ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { exit } from '../../redux/slices/auth';
import { updateUserName } from '../../redux/slices/profile';
import { RootState } from '../../redux/store';
import { getUserData, setUserData, useAuthenticated } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { ValidScreens } from '../../constants/screens';

const ProfileScreen: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const [newName, setNewName] = useState('');
    const navigation = useNavigation();

    const handleUpdateName = () => {
        Alert.prompt(
            'Введите новое имя',
            newName,
            (newNameInput: string | null) => {
                if (newNameInput) {
                    setUserData({ username: newNameInput });
                    setNewName(newNameInput);
                    dispatch(updateUserName(newNameInput));
                }
            },
        );
    };

    useEffect(() => {
        getUserData().then((data) => {
            if (data && data.username) {
                setNewName(data.username);
            }
        });
    }, []);

    const handleExit = () => {
        Alert.alert('Вы точно хотите выйти ?', undefined, [
            { text: 'Отмена', onPress: () => {} },
            {
                text: 'Выйти',
                onPress: () => {
                    useAuthenticated('NO');
                    dispatch(exit(null));
                },
            },
        ]);
    };

    const handleCreatePost = () => {
        navigation.navigate(ValidScreens.CREATE_POSTS_SCREEN);
    };

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>
                {`Профиль пользователя: ${currentUser?.login || 'Неизвестно'}`}
            </Text>
            <TextInput
                placeholder="Введите новое имя"
                value={newName}
                onChangeText={(text) => setNewName(text)}
            />
            <Button title="Обновить имя" onPress={handleUpdateName} />
            <Button title="Сменить пользователя" onPress={handleExit} />
            <Button title="Создать статью" onPress={handleCreatePost} />
        </View>
    );
};

export default ProfileScreen;
