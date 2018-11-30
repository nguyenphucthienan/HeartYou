import { createStackNavigator } from 'react-navigation';

import FollowingScreen from '../screens/FollowingScreen';

const FolowingStackNavigator = createStackNavigator({
  FollowingScreen: {
    screen: FollowingScreen
  }
}, {
  headerMode: 'none'
});

export default FolowingStackNavigator;
