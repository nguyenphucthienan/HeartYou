import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderLastSlide(index) {
    const { data, buttonText, onComplete } = this.props;
    if (index === data.length - 1) {
      return (
        <Button
          title={buttonText}
          backgroundColor="#C2185B"
          rightIcon={{ name: 'flag-o', type: 'font-awesome' }}
          borderRadius={10}
          onPress={onComplete}
          fontWeight="bold"
          containerViewStyle={{ marginTop: 15 }}
        />
      );
    }

    return null;
  }

  renderSlides() {
    const { data } = this.props;
    return data.map((slide, index) => (
      <View
        key={slide.text}
        style={[styles.slideStyle, { backgroundColor: slide.color }]}
      >
        <Text style={styles.slideTextStyle}>{slide.text}</Text>
        {this.renderLastSlide(index)}
      </View>
    ));
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  slideTextStyle: {
    fontSize: 25,
    color: '#FFF'
  },
};

export default Slides;
