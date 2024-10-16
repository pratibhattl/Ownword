/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import AppContext from './src/Context/AppContext';

// AppRegistry.registerComponent(appName, () =>(
//     <AppContext>
//         <App />
//     </AppContext>
    
// ));
const WrappedApp = () => (
    <AppContext>
      <App />
    </AppContext>
  );
  
  AppRegistry.registerComponent(appName, () => WrappedApp);
