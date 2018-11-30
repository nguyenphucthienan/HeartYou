import React, { Component } from 'react';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Heart You', color: '#FF4081' },
  { text: 'Let the world know more...', color: '#03A9F4' },
  { text: '...about you ♡', color: '#FF4081' }
];

class WelcomeScreen extends Component {
  constructor() {
    super();
    this.onSlidesComplete = this.onSlidesComplete.bind(this);
  }

  onSlidesComplete() {
    const { navigation } = this.props;
    navigation.navigate('AuthStack');
  }

  render() {
    return (
      <Slides data={SLIDE_DATA} buttonText="Start" onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;
