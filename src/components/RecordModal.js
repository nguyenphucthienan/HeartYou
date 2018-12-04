import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ToastAndroid
} from 'react-native';
import { Button } from 'react-native-elements';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import Modal from 'react-native-modal';
import axios from 'axios';

import { UPLOAD_AUDIO_URL } from '../config/api';

class RecordModal extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: 0.0,
      recording: false,
      paused: false,
      stopped: false,
      hasPermission: null,
      audioPath: `${AudioUtils.DocumentDirectoryPath}/audio.aac`
    };

    this.record = this.record.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.stop = this.stop.bind(this);
    this.play = this.play.bind(this);
    this.ok = this.ok.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    });
  }

  componentDidMount() {
    AudioRecorder.requestAuthorization().then((isAuthorised) => {
      this.setState({ hasPermission: isAuthorised });

      if (!isAuthorised) {
        return;
      }

      const { audioPath } = this.state;
      this.prepareRecordingPath(audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({ currentTime: Math.floor(data.currentTime) });
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this.finishRecording(data.status === 'OK', data.audioFileURL, data.audioFileSize);
        }
      };
    });
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

  async pause() {
    const { recording } = this.state;
    if (!recording) {
      ToastAndroid.show('Can\'t pause, not recording!', ToastAndroid.SHORT);
      return;
    }

    try {
      await AudioRecorder.pauseRecording();
      this.setState({ paused: true });
    } catch (error) {
      console.log(error);
    }
  }

  async resume() {
    const { paused } = this.state;
    if (!paused) {
      ToastAndroid.show('Can\'t resume, not paused!', ToastAndroid.SHORT);
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({ paused: false });
    } catch (error) {
      console.log(error);
    }
  }

  async stop() {
    const { recording } = this.state;
    if (!recording) {
      ToastAndroid.show('Can\'t stop, not recording!', ToastAndroid.SHORT);
      return;
    }

    this.setState({ stopped: true, recording: false, paused: false });

    try {
      const filePath = await AudioRecorder.stopRecording();
      if (Platform.OS === 'android') {
        this.finishRecording(true, filePath);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async play() {
    const { recording } = this.state;
    if (recording) {
      await this.stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(async () => {
      const { audioPath } = this.state;

      const sound = new Sound(audioPath, '', (error) => {
        if (error) {
          ToastAndroid.show('Load audio failed!', ToastAndroid.SHORT);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('Successfully finished playing');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async record() {
    const {
      recording,
      hasPermission,
      stopped,
      audioPath
    } = this.state;

    if (recording) {
      ToastAndroid.show('Already recording!', ToastAndroid.SHORT);
      return;
    }

    if (!hasPermission) {
      ToastAndroid.show('Can\'t record, no permission granted!', ToastAndroid.SHORT);
      return;
    }

    if (stopped) {
      this.prepareRecordingPath(audioPath);
    }

    this.setState({ recording: true, paused: false, stopped: false });

    try {
      await AudioRecorder.startRecording();
    } catch (error) {
      console.log(error);
    }
  }

  finishRecording(didSucceed, filePath, fileSize) {
  }

  uploadAudioAsync() {
    const path = `file://${AudioUtils.DocumentDirectoryPath}/audio.aac`;

    const formData = new FormData();
    formData.append('file', {
      uri: path,
      name: 'audio.aac',
      type: 'audio/aac',
    });

    return axios.post(UPLOAD_AUDIO_URL, formData)
      .then(res => res.data.secureUrl)
      .catch(error => console.log(error));
  }

  async ok() {
    const { stopped, currentTime } = this.state;
    if (stopped) {
      const { onOk } = this.props;
      ToastAndroid.show(`Finished recording of duration ${currentTime} seconds.`, ToastAndroid.SHORT);
      const audioUrl = await this.uploadAudioAsync();
      onOk(audioUrl);
    } else {
      ToastAndroid.show('Please stop before submit', ToastAndroid.SHORT);
    }
  }

  cancel() {
    const { onCancel } = this.props;
    this.stop();
    onCancel();
  }

  render() {
    const {
      recording,
      stopped,
      paused,
      currentTime
    } = this.state;
    const { isVisible } = this.props;

    return (
      <Modal isVisible={isVisible}>
        <View style={styles.containerStyle}>
          <Text>Recording</Text>
          <View style={styles.controlsStyle}>
            {this.renderButton('RECORD', this.record, recording)}
            {
              paused
                ? this.renderButton('RESUME', this.resume, false)
                : this.renderButton('PAUSE', this.pause, false)
            }
            {this.renderButton('STOP', this.stop, stopped)}
            {this.renderButton('PLAY', this.play)}
            <Text style={styles.progressTextStyle}>{`${currentTime}s`}</Text>
          </View>
          <View style={styles.buttonsContainerStyle}>
            <Button
              title="OK"
              onPress={this.ok}
              borderRadius={25}
              fontSize={14}
              fontFamily="monospace"
              color="#FFF"
              backgroundColor="#FF4081"
              buttonStyle={styles.buttonStyle}
              containerViewStyle={styles.containerViewStyle}
            />
            <Button
              title="Cancel"
              onPress={this.cancel}
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

export default RecordModal;
