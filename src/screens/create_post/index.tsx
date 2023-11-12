import React, { useState } from 'react';
import { View, Button, ScrollView, Alert, StyleSheet } from 'react-native';
import { colors, Input, Text } from 'react-native-elements';

import {
    launchCamera,
    launchImageLibrary,
    ImagePickerResponse,
} from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/slices/posts';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    titleInput: {
        padding: 10,
        borderColor: colors.grey5,
        borderWidth: 1,
    },
    contentInput: {
        padding: 10,
        borderColor: colors.grey5,
        borderWidth: 1,
    },
    addButton: {
        marginTop: 12,
    },
    imageContainer: {
        marginTop: 12,
    },
    imageText: {
        marginBottom: 12,
    },
});

const CreatePostScreen = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const navigation = useNavigation();

    const handleAddImage = () => {
        Alert.alert(
            'Выберите источник изображения',
            '',
            [
                {
                    text: 'Камера',
                    onPress: () =>
                        launchCamera({ mediaType: 'photo' }, onImageSelect),
                },
                {
                    text: 'Галерея',
                    onPress: () =>
                        launchImageLibrary(
                            { mediaType: 'photo' },
                            onImageSelect,
                        ),
                },
                { text: 'Отмена', style: 'cancel' },
            ],
            { cancelable: true },
        );
    };

    const onImageSelect = (response: ImagePickerResponse) => {
        if (response.didCancel || response.errorCode) {
            return;
        }

        if (response.assets) {
            response.assets.map(({ uri }) => {
                if (uri) {
                    setImages((prevImages) => [...prevImages, uri]);
                }
            });
        }
    };

    const handleCreatePost = () => {
        if (!title || !content) {
            Alert.alert('Ошибка', 'Заголовок и контент не могут быть пустыми');
            return;
        }

        const newPost = {
            id: Date.now().toString(),
            title,
            content,
            images,
        };

        dispatch(addPost(newPost));

        navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Input
                    style={styles.titleInput}
                    placeholder="Заголовок"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
                <Input
                    style={styles.contentInput}
                    placeholder="Контент"
                    value={content}
                    onChangeText={(text) => setContent(text)}
                    multiline
                />
                <Button title="Добавить изображение" onPress={handleAddImage} />
                {images.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Text style={styles.imageText}>
                            {`Изображение ${index + 1}`}
                        </Text>
                        <Text>{image}</Text>
                    </View>
                ))}
                <Button title="Создать статью" onPress={handleCreatePost} />
            </View>
        </ScrollView>
    );
};

export default CreatePostScreen;
