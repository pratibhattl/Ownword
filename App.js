
import React,{useEffect} from 'react';
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
import { getData } from './src/helper';
const Stack = createNativeStackNavigator();

function App() {
  const [token, setToken] = React.useState(null);
  
  useEffect(() => {
    getData('token').then((token) => {
      setToken(token);
    });
  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={({ route, navigation }) => ({
        header: (props) => {
          const { title } = props.options;
          return <Header title={title} />;  // Pass the title to Header component
        }
      })}>
        {!token ?
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
              options={{ headerShown: false }}
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
              name="DonationDetails"
              component={DonationDetails}
              options={{ headerShown: true, title: 'Onward - Donations' }}
            />
             <Stack.Screen
              name="Payment"
              component={Payment}
              options={{ headerShown: true, title: 'Onward - Payment' }}
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
             <Stack.Screen
              name="WaterIntake"
              component={WaterIntake}
              options={{ headerShown: true, title: 'Onward - Water Intake' }}
            />
         </>
         } 
      </Stack.Navigator>
      {/* <Footer /> */}
    </NavigationContainer>
  );
}

export default App;
