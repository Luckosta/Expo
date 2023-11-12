// PostsScreen.js
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

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

const PostsListScreen: React.FC = (): JSX.Element => {
    const posts = useSelector((state: RootState) => state.posts.user.posts);

    const renderPostItem = ({ item }: { item: UserPost }) => (
        <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
            {item.images.length > 0 && (
                <Image
                    source={{ uri: item.images[0] }}
                    style={styles.postImage}
                />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={renderPostItem}
            />
        </View>
    );
};

export default PostsListScreen;
