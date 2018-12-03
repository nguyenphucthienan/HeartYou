import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import EditInfoScreen from '../screens/EditInfoScreen';

import SideBarMenu from '../components/SideBarMenu';

const MainDrawerNavigator = createDrawerNavigator({
  MainTab: {
    screen: MainTabNavigator
  },
  EditInfo: {
    screen: EditInfoScreen
  }
}, {
  drawerWidth: 280,
  contentComponent: props => <SideBarMenu {...props} />
});

export default MainDrawerNavigator;
