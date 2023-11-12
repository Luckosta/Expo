import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import Register from '../screens/register';

import { useSelector } from 'react-redux';
import ProfileScreen from '../screens/profile';
import { RootState } from '../redux/store';
//import AuthScreen from '../screens/AuthScreen';
//import ProfileScreen from '../screens/ProfileScreen';
//import ArticleListScreen from '../screens/ArticleListScreen';
//import ArticleDetailScreen from '../screens/ArticleDetailScreen';
//import { RootState } from '../redux/store/store';

const Stack = createStackNavigator();

const Navigation: React.FC = (): JSX.Element => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated,
    );

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated ? (
                    <>
                        <Stack.Screen
                            name="Profile"
                            component={ProfileScreen}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Authentication" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
