import { createDrawerNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

const MainDrawerNavigator = createDrawerNavigator({
  MainTab: {
    screen: MainTabNavigator
  }
});

export default MainDrawerNavigator;
