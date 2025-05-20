import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleList from './screens/ArticleList';
import ArticleDetail from './screens/ArticleDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Articles">
        <Stack.Screen name="Articles" component={ArticleList} />
        <Stack.Screen name="Détails" component={ArticleDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
