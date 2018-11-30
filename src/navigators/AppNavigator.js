import { createSwitchNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';

import LoginStackNavigator from './LoginStackNavigator';
import MainDrawerNavigator from './MainDrawerNavigator';

const AppNavigator = createSwitchNavigator({
  Home: {
    screen: WelcomeScreen
  },
  LoginStack: {
    screen: LoginStackNavigator
  },
  MainDrawer: {
    screen: MainDrawerNavigator
  }
}, {
  initialRouteName: 'LoginStack',
  headerMode: 'none'
});

export default AppNavigator;
