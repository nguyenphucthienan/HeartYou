import React, { Component } from 'react';
import { View } from 'react-native';

import HeartYouHeader from '../components/HeartYouHeader';

class FollowingScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <HeartYouHeader navigation={navigation} />
      </View>
    );
  }
}

export default FollowingScreen;
