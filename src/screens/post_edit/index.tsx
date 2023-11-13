import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../redux/slices/posts';
import { RootState } from '../../redux/store';
import { colors } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
        padding: 8,
        borderColor: colors.grey5,
        borderWidth: 1,
        fontSize: 18,
    },
});

interface Props {
    route: {
        params: {
            postId: string;
        };
    };
}

const PostEditScreen: React.FC<Props> = ({ route }) => {
    const { postId } = route.params;
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.user);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const loadPost = async () => {
        try {
            const postsString = await AsyncStorage.getItem('posts');
            if (postsString) {
                const posts = JSON.parse(postsString);
                const post = posts.find((item: UserPost) => item.id === postId);

                if (post) {
                    setTitle(post.title);
                    setContent(post.content);
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке статьи:', error);
        }
    };

    const handleSave = async () => {
        try {
            const postsString = await AsyncStorage.getItem('posts');
            if (postsString) {
                const posts = JSON.parse(postsString);
                const updatedPosts = posts.map((post: UserPost) => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            title,
                            content,
                            author: currentUser?.login,
                        };
                    }
                    return post;
                });

                await AsyncStorage.setItem(
                    'posts',
                    JSON.stringify(updatedPosts),
                );

                const foundedPost = updatedPosts.find(
                    (post: UserPost) => post.id === postId,
                );

                if (foundedPost) {
                    dispatch(updatePost(foundedPost));
                }
                navigation.goBack();
            }
        } catch (error) {
            console.error('Ошибка при сохранении статьи:', error);
        }
    };

    useEffect(() => {
        loadPost();
    }, [postId]);

    return (
        <View style={styles.container}>
            <Text>{'Редактирование статьи'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Заголовок"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Содержание"
                value={content}
                onChangeText={(text) => setContent(text)}
            />
            <Button title="Сохранить" onPress={handleSave} />
        </View>
    );
};

export default PostEditScreen;
