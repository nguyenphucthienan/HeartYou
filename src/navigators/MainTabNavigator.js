import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import NewsFeedScreen from '../screens/NewsFeedScreen';
import ProfileScreen from '../screens/ProfileScreen';

import QuestionStackNavigator from './QuestionStackNavigator';
import FollowingStackNavigator from './FollowingStackNavigator';

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
  },
  FollowingAndSearch: {
    screen: FollowingStackNavigator,
    navigationOptions: () => ({
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="users"
          type="font-awesome"
          color={tintColor}
        />
      )
    })
  }
}, {
  initialRouteName: 'NewsFeed',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: '#FFF',
    inactiveTintColor: '#333',
    style: {
      backgroundColor: '#03A9F4'
    }
  }
});

export default MainTabNavigator;
