import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';

class RecordModal extends Component {
  constructor() {
    super();
    this.uploadAudio = this.uploadAudio.bind(this);
  }

  uploadAudio() {
    const { onOk } = this.props;
    onOk();
  }

  render() {
    const { isVisible, onCancel } = this.props;
    return (
      <Modal isVisible={isVisible}>
        <View style={styles.containerStyle}>
          <Text>Record Modal</Text>
          <View style={styles.buttonsContainerStyle}>
            <Button
              title="OK"
              onPress={this.uploadAudio}
              borderRadius={25}
              fontSize={14}
              fontWeight="bold"
              fontFamily="monospace"
              color="#FFF"
              backgroundColor="#FF4081"
              buttonStyle={styles.buttonStyle}
              containerViewStyle={styles.containerViewStyle}
            />
            <Button
              title="Cancel"
              onPress={() => onCancel()}
              borderRadius={25}
              fontSize={14}
              fontWeight="bold"
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
  }
});

export default RecordModal;
