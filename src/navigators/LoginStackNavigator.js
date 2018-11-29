import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';

const LoginStackNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  }
}, {
  headerMode: 'none'
});

export default LoginStackNavigator;
