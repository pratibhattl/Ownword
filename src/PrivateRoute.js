
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/Header';
import Home from './components/Home'
import ChangePassword from './pages/ChangePassword';
import Settings from './components/Settings';
import Insights from './components/Insights'
import Tracking from './components/Tracking';
import Menu from './components/Menu';
import Notification from './components/Notification';
import EditProfile from './pages/EditProfile';
import Donation from './pages/Donation';
import ImageUpload from './pages/ImageUpload';
import PrescriptionUpload from './pages/PrescriptionUpload';
const Stack = createNativeStackNavigator();

 function PrivateRoute () { 

  return (
       <Stack.Group initialRouteName="Home" screenOptions={({ route, navigation }) => ({
        header: (props) => {
          const { title } = props.options;
          return <Header title={title} />;  // Pass the title to Header component
        }
      })}> 
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: true, title: 'Onward - Settings' }}
            />
            <Stack.Screen
              name="Insights"
              component={Insights}
              options={{ headerShown: true, title: 'Onward - Insights' }}
            />
            <Stack.Screen
              name="Tracking"
              component={Tracking}
              options={{ headerShown: true, title: 'Onward - Tracking' }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{ headerShown: true, title: 'Onward - Menu' }}
            />
            <Stack.Screen
              name="Notification"
              component={Notification}
              options={{ headerShown: true, title: 'Onward - Notification' }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ headerShown: true, title: 'Onward - Edit Profile' }}
            />
            <Stack.Screen
              name="Donation"
              component={Donation}
              options={{ headerShown: true, title: 'Onward - Donations' }}
            />
            <Stack.Screen
              name="ImageUpload"
              component={ImageUpload}
              options={{ headerShown: true, title: 'Onward - Image Upload' }}
            />
            <Stack.Screen
              name="PrescriptionUpload"
              component={PrescriptionUpload}
              options={{ headerShown: true, title: 'Onward - Prescription Upload' }}
            />
            </Stack.Group>

  );
}

export default PrivateRoute;
