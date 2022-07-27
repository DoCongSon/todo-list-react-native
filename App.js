import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Profile from './screens/Profile';
import AddTodo from './screens/AddTodo';
import StoreProvider from './store/Store';
import { IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <StoreProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon={<Icon name='account-circle' color={tintColor} size={24} />}
                  onPress={() => navigation.navigate('Profile')}
                  color={tintColor}
                  size={24}
                />
              ),
            })}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Profile' component={Profile} options={{ headerRight: false }} />
            <Stack.Screen name='AddTodo' component={AddTodo} options={{ title: 'Add Todo' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </>
  );
}
