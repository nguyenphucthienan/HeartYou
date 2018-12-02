import { createStackNavigator } from 'react-navigation';

import FollowingScreen from '../screens/FollowingScreen';
import UserScreen from '../screens/UserScreen';
import AskScreen from '../screens/AskScreen';

const FollowingStackNavigator = createStackNavigator({
  Following: {
    screen: FollowingScreen
  },
  User: {
    screen: UserScreen
  },
  Ask: {
    screen: AskScreen
  }
}, {
  headerMode: 'none'
});

export default FollowingStackNavigator;
