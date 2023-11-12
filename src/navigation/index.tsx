import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
//import AuthScreen from '../screens/AuthScreen';
//import ProfileScreen from '../screens/ProfileScreen';
//import ArticleListScreen from '../screens/ArticleListScreen';
//import ArticleDetailScreen from '../screens/ArticleDetailScreen';
//import { RootState } from '../redux/store/store';

const Stack = createStackNavigator();

const Navigation: React.FC = (): JSX.Element => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            {/*<Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="ArticleList" component={ArticleListScreen} />
            <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />*/}
          </>
        ) : (
			<View><Text>{'hello'}</Text></View>
        //  <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
