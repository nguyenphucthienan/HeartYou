import { createStackNavigator } from 'react-navigation';

import FollowingScreen from '../screens/FollowingScreen';
import UserScreen from '../screens/UserScreen';

const FollowingStackNavigator = createStackNavigator({
  Following: {
    screen: FollowingScreen
  },
  User: {
    screen: UserScreen
  }
}, {
  headerMode: 'none'
});

export default FollowingStackNavigator;
