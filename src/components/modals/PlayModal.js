import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import { Button } from 'react-native-elements';
import Sound from 'react-native-sound';
import Modal from 'react-native-modal';

class PlayModal extends Component {
  constructor() {
    super();
    this.state = {
      stopped: true,
      currentTime: 0
    };

    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const { audioUrl } = this.props;
    if (audioUrl) {
      this.sound = new Sound(audioUrl, '', (error) => { });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { audioUrl } = nextProps;
    if (audioUrl) {
      this.sound = new Sound(audioUrl, '', (error) => { });
    }
  }

  setCurrentTime() {
    this.sound.getCurrentTime((seconds) => {
      if (this.interval) {
        this.setState({ currentTime: Math.floor(seconds) });
      }
    });
  }

  play() {
    const { stopped } = this.state;
    this.setState({ stopped: false, currentTime: 0 });

    if (!this.sound) {
      ToastAndroid.show('Load audio failed!', ToastAndroid.SHORT);
    }

    if (this.sound && stopped) {
      this.interval = setInterval(() => this.setCurrentTime(), 250);

      this.sound.play((success) => {
        if (success) {
          this.setState({ stopped: true });

          if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
          }
        }
      });
    }
  }

  stop() {
    const { stopped } = this.state;
    if (this.sound && !stopped) {
      this.sound.stop();
      this.setState({ stopped: true, currentTime: 0 });
    }
  }

  close() {
    const { onClose } = this.props;
    onClose();
  }

  renderButton(title, onPress, active) {
    const color = active ? '#FF4081' : '#03A9F4';
    return (
      <Button
        title={title}
        borderRadius={5}
        fontSize={20}
        fontFamily="monospace"
        color={color}
        backgroundColor="#FFF"
        onPress={onPress}
        containerViewStyle={styles.controlContainerViewStyle}
      />
    );
  }

  render() {
    const { stopped, currentTime } = this.state;
    const { isVisible, title } = this.props;

    return (
      <Modal isVisible={isVisible}>
        <View style={styles.containerStyle}>
          <Text>{title}</Text>
          <View style={styles.controlsStyle}>
            {this.renderButton('PLAY', this.play, !stopped)}
            {this.renderButton('STOP', this.stop, stopped)}
            <Text style={styles.progressTextStyle}>{`${currentTime}s`}</Text>
          </View>
          <View style={styles.buttonsContainerStyle}>
            <Button
              title="Close"
              onPress={this.close}
              borderRadius={25}
              fontSize={14}
              fontFamily="monospace"
              color="#FFF"
              backgroundColor="#1565C0"
              buttonStyle={styles.buttonStyle}
              containerViewStyle={styles.containerViewStyle}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 5
  },
  buttonsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle: {
    width: 120,
    height: 30
  },
  containerViewStyle: {
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 25
  },
  controlsStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressTextStyle: {
    paddingVertical: 20,
    fontSize: 35
  },
  controlContainerViewStyle: {
    marginTop: 5,
    borderWidth: 0,
    borderColor: '#FFF',
    borderRadius: 5
  },
});

export default PlayModal;
