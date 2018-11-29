import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigators/AppNavigator';

import store from './src/store';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
