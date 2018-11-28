import { createStackNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: WelcomeScreen
  }
});

export default AppNavigator;
