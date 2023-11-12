// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName } from '../../redux/slices/profile';
import { RootState } from '../../redux/store';

const ProfileScreen: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [newName, setNewName] = useState('');

    const handleUpdateName = () => {
        dispatch(updateUserName(newName));
    };

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>
                {`Профиль пользователя: ${
                    currentUser?.username || 'Неизвестно'
                }`}
            </Text>
            <TextInput
                placeholder="Введите новое имя"
                value={newName}
                onChangeText={(text) => setNewName(text)}
            />
            <Button title="Обновить имя" onPress={handleUpdateName} />
        </View>
    );
};

export default ProfileScreen;
