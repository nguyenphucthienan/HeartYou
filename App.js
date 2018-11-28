import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          raised
          color="#FFFFFF"
          backgroundColor="#FF4081"
          title="Heart You"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
