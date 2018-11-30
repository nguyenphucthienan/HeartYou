import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import NewsFeedScreen from '../screens/NewsFeedScreen';
import ProfileScreen from '../screens/ProfileScreen';

import QuestionStackNavigator from './QuestionStackNavigator';

const MainTabNavigator = createBottomTabNavigator({
  NewsFeed: {
    screen: NewsFeedScreen,
    navigationOptions: () => ({
      tabBarLabel: 'News Feed',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="home"
          type="font-awesome"
          color={tintColor}
        />
      )
    })
  },
  QuestionAndAnswer: {
    screen: QuestionStackNavigator,
    navigationOptions: () => ({
      tabBarLabel: 'Questions',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="question"
          type="font-awesome"
          color={tintColor}
        />
      )
    })
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="user"
          type="font-awesome"
          color={tintColor}
        />
      )
    })
  }
}, {
  initialRouteName: 'NewsFeed',
  tabBarOptions: {
    activeTintColor: '#03A9F4',
    labelStyle: {
      fontSize: 12,
    }
  }
});

export default MainTabNavigator;
