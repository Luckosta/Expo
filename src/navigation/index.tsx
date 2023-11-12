import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import Register from '../screens/register';

//import { useSelector } from 'react-redux';
//import AuthScreen from '../screens/AuthScreen';
//import ProfileScreen from '../screens/ProfileScreen';
//import ArticleListScreen from '../screens/ArticleListScreen';
//import ArticleDetailScreen from '../screens/ArticleDetailScreen';
//import { RootState } from '../redux/store/store';

const Stack = createStackNavigator();

const Navigation: React.FC = (): JSX.Element => {
    //const isAuthenticated = useSelector(
    //    (state: RootState) => state.auth.isAuthenticated,
    //);

    const flag = false;

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {flag ? (
                    <>
                        {/*<Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="ArticleList" component={ArticleListScreen} />
            <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />*/}
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
