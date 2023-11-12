import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ValidScreens } from '../../constants/screens';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    postContainer: {
        marginBottom: 16,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 12,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    postContent: {
        fontSize: 16,
        marginBottom: 8,
    },
    postImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 8,
    },
});
const PostsScreen: React.FC = (): JSX.Element => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState<UserPost[]>([]);

    const renderPostItem = (item: UserPost) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate(ValidScreens.POST_VIEW, {
                    postId: item.id,
                })
            }
            style={styles.postContainer}
        >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text
                style={styles.postContent}
                numberOfLines={3}
                ellipsizeMode="tail"
            >
                {item.content}
            </Text>
            {item.images && item.images.length > 0 && (
                <Image
                    source={{ uri: item.images[0] }}
                    style={styles.postImage}
                />
            )}
        </TouchableOpacity>
    );

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsString = await AsyncStorage.getItem('posts');
                if (postsString) {
                    const parsedPosts: UserPost[] = JSON.parse(postsString);
                    setPosts(parsedPosts);
                }
            } catch (error) {
                console.error('Ошибка при получении постов:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => renderPostItem(item)}
            />
        </View>
    );
};

export default PostsScreen;
