import { createStackNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';

import LoginStackNavigator from './LoginStackNavigator';

const AppNavigator = createStackNavigator({
  Home: {
    screen: WelcomeScreen
  },
  LoginStack: {
    screen: LoginStackNavigator
  }
}, {
  headerMode: 'none'
});

export default AppNavigator;
