import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ValidScreens } from '../../constants/screens';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    content: {
        fontSize: 18,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
        padding: 8,
        borderColor: '#ccc',
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

const PostView: React.FC<Props> = ({ route }): JSX.Element => {
    const { postId } = route.params;
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const [isEditable, setIsEditable] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [author, setAuthor] = useState('');

    const navigation = useNavigation();

    const loadPost = async () => {
        try {
            const postsString = await AsyncStorage.getItem('posts');
            if (postsString) {
                const posts = JSON.parse(postsString);
                const post: UserPost = posts.find(
                    (item: UserPost) => item.id === postId,
                );
                const postFromStore = currentUser?.posts?.find(
                    (item: UserPost) => item.id === postId,
                );

                if (post) {
                    setTitle(postFromStore?.title || post.title);
                    setContent(postFromStore?.content || post.content);
                    setImage(postFromStore?.image || post.image || null);
                    setAuthor(post.author);
                    setIsEditable(currentUser?.login === post.author);
                }
            }
        } catch (error) {
            console.error('Ошибка при загрузке статьи:', error);
        }
    };

    const handleEdit = () => {
        navigation.navigate(ValidScreens.POST_EDIT, { postId });
    };

    useEffect(() => {
        loadPost();
    }, [postId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{'Автор: ' + author}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
            {image !== '' && (
                <Image source={{ uri: image }} style={styles.image} />
            )}

            {isEditable && (
                <View>
                    <Button title="Редактировать" onPress={handleEdit} />
                </View>
            )}
        </View>
    );
};

export default PostView;
