import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';

import { useSelector } from 'react-redux';
import ProfileScreen from '../screens/profile';
import { RootState } from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthenticated } from '../utils';
import { exit } from '../redux/slices/auth';
import CreatePostsScreen from '../screens/create_post';
import { ValidScreens } from '../constants/screens';
import PostsListScreen from '../screens/posts_list';
import PostView from '../screens/post_view';
import PostEditScreen from '../screens/post_edit';

const Stack = createStackNavigator();

const Navigation: React.FC = (): JSX.Element => {
    const [isAuthSaved, setIsAuthSaved] = useState<AuthType>('NO');
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated,
    );

    useEffect(() => {
        AsyncStorage.getItem('auth').then((data) => {
            if (data && data === 'YES') {
                setIsAuthSaved(data);
            }
        });
    }, [exit, useAuthenticated, isAuthenticated]);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerBackTitle: 'Назад',
                }}
            >
                {isAuthSaved === 'YES' || isAuthenticated ? (
                    <>
                        <Stack.Screen
                            name={ValidScreens.PROFILE_SCREEN}
                            component={ProfileScreen}
                        />
                        <Stack.Screen
                            name={ValidScreens.POST_EDIT}
                            component={PostEditScreen}
                        />
                        <Stack.Screen
                            name={ValidScreens.POST_VIEW}
                            component={PostView}
                        />
                        <Stack.Screen
                            name={ValidScreens.CREATE_POSTS_SCREEN}
                            component={CreatePostsScreen}
                        />
                        <Stack.Screen
                            name={ValidScreens.POSTS_LIST_SCREEN}
                            component={PostsListScreen}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name={ValidScreens.LOGIN_SCREEN}
                            component={LoginScreen}
                        />
                        <Stack.Screen
                            name={ValidScreens.REGISTER_SCREEN}
                            component={RegisterScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
