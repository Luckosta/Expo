// ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { exit } from '../../redux/slices/auth';
import { updateUserName } from '../../redux/slices/profile';
import { RootState } from '../../redux/store';
import { getUserData, setUserData, useAuthenticated } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { ValidScreens } from '../../constants/screens';
import Modal from 'react-native-modal';
import { colors, Input } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        maxHeight: 300,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 5,
        margin: 20,
        borderColor: colors.grey5,
        borderWidth: 1,
    },
    modalButton: {
        width: 100,
    },
});

const ProfileScreen: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const [newName, setNewName] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleUpdateName = () => {
        if (Platform.OS === 'ios') {
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
        } else {
            setModalVisible(true);
        }
    };

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

    const handleRedirectToPostList = () => {
        navigation.navigate(ValidScreens.POSTS_LIST_SCREEN);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        if (newName) {
            setUserData({ username: newName });
            setNewName(newName);
            dispatch(updateUserName(newName));
        }
    };

    useEffect(() => {
        getUserData().then((data) => {
            if (data && data.username) {
                setNewName(data.username);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text>
                {`Профиль пользователя: ${currentUser?.login || 'Неизвестно'}`}
            </Text>
            {Platform.OS === 'ios' && (
                <Input
                    placeholder="Введите новое имя"
                    value={newName}
                    onChangeText={(text) => setNewName(text)}
                />
            )}
            <View style={styles.button}>
                <Button title="Обновить имя" onPress={handleUpdateName} />
            </View>
            <View style={styles.button}>
                <Button title="Сменить пользователя" onPress={handleExit} />
            </View>
            <View style={styles.button}>
                <Button title="Создать статью" onPress={handleCreatePost} />
            </View>
            <Button
                title="Смотреть статьи"
                onPress={handleRedirectToPostList}
            />

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={handleModalClose}
                style={styles.modal}
            >
                <View style={styles.modalContainer}>
                    <Text>{'Введите новое имя'}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Новое имя"
                        value={newName}
                        onChangeText={(text) => setNewName(text)}
                    />
                    <View style={styles.modalButton}>
                        <Button title="OK" onPress={handleModalClose} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ProfileScreen;
