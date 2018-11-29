import { createStackNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: WelcomeScreen
  }
}, {
  headerMode: 'none'
});

export default AppNavigator;
