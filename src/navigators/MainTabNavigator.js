import { createBottomTabNavigator } from 'react-navigation';

import NewsFeedScreen from '../screens/NewsFeedScreen';

import QuestionStackNavigator from './QuestionStackNavigator';

const MainTabNavigator = createBottomTabNavigator({
  NewsFeed: {
    screen: NewsFeedScreen
  },
  QuestionAndAnswer: {
    screen: QuestionStackNavigator
  }
}, {
  initialRouteName: 'NewsFeed',
});

export default MainTabNavigator;
