
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/pages/Welcome';
import Login from './src/pages/Login';
import Header from './src/components/Header';
import Signup from './src/pages/Signup';
import Home from './src/components/Home'
import ChangePassword from './src/pages/ChangePassword';
import ForgotPassword from './src/pages/ForgotPassword';
import Settings from './src/components/Settings';
import Insights from './src/components/Insights'
import Tracking from './src/components/Tracking';
import Menu from './src/components/Menu';
import Notification from './src/components/Notification';
import EditProfile from './src/pages/EditProfile';
import Donation from './src/pages/Donation';
import ImageUpload from './src/pages/ImageUpload';
import PrescriptionUpload from './src/pages/PrescriptionUpload';
import ResetPassword from './src/pages/ResetPassword';
import DonationDetails from './src/pages/DonationDetails';
import Payment from './src/pages/Payment';
import WaterIntake from './src/pages/WaterIntake';
import Menstrual from './src/pages/Menstrual';
import FoodIntake from './src/pages/FoodIntake';
import TimeInBed from './src/pages/TimeInBed';
import { getData } from './src/helper';
import TimeAsleep from './src/pages/TimeAsleep';
import Medication from './src/pages/Medication';
import MigraineLog from './src/pages/MigraineLog';
import PainArea from './src/pages/PainArea';
import MigraineReason from './src/pages/MigraineReason';
import Foram from './src/pages/Foram';
import Chat from './src/pages/Chat';
import MigraineList from './src/pages/MigraineList';
import { useAuth } from './src/Context/AppContext';
import UpdateMigraineReason from './src/pages/UpdateMigraineReason';
import UpdatePainArea from './src/pages/UpdatePainArea';
const Stack = createNativeStackNavigator();

function App() {
  const {isLoggedin,setToken,setUserDetails} = useAuth();
 
  


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={({ route, navigation }) => ({
        header: (props) => {
          const { title } = props.options;
          return <Header title={title} />;  // Pass the title to Header component
        }
      })}>
        {!isLoggedin ?
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
            />
          </>
          :
          <>
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
              options={{ headerShown: true, title: 'Settings' }}
            />
            <Stack.Screen
              name="Insights"
              component={Insights}
              options={{ headerShown: true, title: 'Insights' }}
            />
            <Stack.Screen
              name="Tracking"
              component={Tracking}
              options={{ headerShown: true, title: 'Tracking' }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{ headerShown: true, title: 'Menu' }}
            />
            <Stack.Screen
              name="Notification"
              component={Notification}
              options={{ headerShown: true, title: 'Notification' }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ headerShown: true, title: 'Edit Profile' }}
            />
            <Stack.Screen
              name="Donation"
              component={Donation}
              options={{ headerShown: true, title: 'Donations' }}
            />
            <Stack.Screen
              name="DonationDetails"
              component={DonationDetails}
              options={{ headerShown: true, title: 'Donations' }}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{ headerShown: true, title: 'Payment' }}
            />
            <Stack.Screen
              name="ImageUpload"
              component={ImageUpload}
              options={{ headerShown: true, title: 'Image Upload' }}
            />
            <Stack.Screen
              name="PrescriptionUpload"
              component={PrescriptionUpload}
              options={{ headerShown: true, title: 'Prescription Upload' }}
            />
            <Stack.Screen
              name="WaterIntake"
              component={WaterIntake}
              options={{ headerShown: true, title: 'Water Intake' }}
            />
            <Stack.Screen
              name="TimeInBed"
              component={TimeInBed}
              options={{ headerShown: true, title: 'Time in Bed' }}
            />
            <Stack.Screen name="TimeAsleep"
              component={TimeAsleep}
              options={{ headerShown: true, title: 'Time Asleep' }} />
            <Stack.Screen
              name="Menstrual"
              component={Menstrual}
              options={{ headerShown: true, title: 'Menstrual Cycle' }}
            />
            <Stack.Screen
              name="FoodIntake"
              component={FoodIntake}
              options={{ headerShown: true, title: 'Food Intake' }}
            />
             <Stack.Screen
              name="Medication"
              component={Medication}
              options={{ headerShown: true, title: 'Medications' }}
            />
             <Stack.Screen
              name="MigraineLog"
              component={MigraineLog}
              options={{ headerShown: true, title: 'Migraine Log' }}
            />
             <Stack.Screen
              name="PainArea"
              component={PainArea}
              options={{ headerShown: true, title: 'Migraine Log' }}
            />
              <Stack.Screen
              name="MigraineReason"
              component={MigraineReason}
              options={{ headerShown: true, title: 'Migraine Log' }}
            />
             <Stack.Screen
              name="Foram"
              component={Foram}
              options={{ headerShown: true, title: 'Chat' }}
            />
             <Stack.Screen
              name="Chat"
              component={Chat}
              options={{ headerShown: true, title: 'Chat' }}
            />
            <Stack.Screen
            name='MigraineList'
            component={MigraineList}
            options={{ headerShown: true, title: 'Migraine Logs' }}
            />
             <Stack.Screen
            name='UpdateMigraineReason'
            component={UpdateMigraineReason}
            options={{ headerShown: true, title: 'Edit Migraine Log' }}
            />
             <Stack.Screen
            name='UpdatePainArea'
            component={UpdatePainArea}
            options={{ headerShown: true, title: 'Edit Migraine Log' }}
            />
          </>
        }
      </Stack.Navigator>
      {/* <Footer /> */}
    </NavigationContainer>
  );
}

export default App;
