
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Header from './components/Header';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

const Stack = createNativeStackNavigator();
function PublicRoute() {

    return (
            <Stack.Group initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </Stack.Group>
    );
}

export default PublicRoute;
