import { createSwitchNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';

import AuthStackNavigator from './AuthStackNavigator';
import MainDrawerNavigator from './MainDrawerNavigator';

const AppNavigator = createSwitchNavigator({
  Home: {
    screen: WelcomeScreen
  },
  AuthStack: {
    screen: AuthStackNavigator
  },
  MainDrawer: {
    screen: MainDrawerNavigator
  }
}, {
  initialRouteName: 'AuthStack',
  headerMode: 'none'
});

export default AppNavigator;
