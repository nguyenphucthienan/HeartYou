import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { FormLabel, Button, Icon } from 'react-native-elements';

import TextAreaInput from '../TextAreaInput';
import PlayModal from '../modals/PlayModal';
import RecordModal from '../modals/RecordModal';

class AnswerForm extends Component {
  constructor() {
    super();
    this.state = {
      isPlayModalVisible: false,
      isRecordModalVisible: false
    };

    this.onRecordModalOk = this.onRecordModalOk.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onModalCancel = this.onModalCancel.bind(this);
  }

  onRecordModalOk(answerAudioUrl) {
    const { change } = this.props;
    change('answerAudioUrl', answerAudioUrl);
    this.setState({ isPlayModalVisible: false });
  }

  onModalClose() {
    this.setState({ isPlayModalVisible: false });
  }

  onModalCancel() {
    this.setState({ isRecordModalVisible: false });
  }

  render() {
    const { handleSubmit, onSubmit, questionAudioUrl } = this.props;
    const { isPlayModalVisible, isRecordModalVisible } = this.state;

    return (
      <View>
        <View style={styles.buttonsContainerStyle}>
          <Icon
            raised
            name="volume-high"
            type="material-community"
            color={questionAudioUrl ? '#651FFF' : '#DDD'}
            onPress={
              questionAudioUrl
                ? () => this.setState({ isPlayModalVisible: true })
                : () => { }
            }
          />
          <Icon
            raised
            name="microphone"
            type="material-community"
            color="#FF4081"
            onPress={() => this.setState({ isRecordModalVisible: true })}
          />
          <PlayModal
            isVisible={isPlayModalVisible}
            title="Question"
            audioUrl={questionAudioUrl}
            onClose={this.onModalClose}
          />
          <RecordModal
            isVisible={isRecordModalVisible}
            onOk={this.onRecordModalOk}
            onCancel={this.onModalCancel}
          />
        </View>
        <FormLabel>Enter your answer</FormLabel>
        <Field name="answerText" component={TextAreaInput} />
        <Button
          title="Answer"
          borderRadius={25}
          fontSize={14}
          fontWeight="bold"
          fontFamily="monospace"
          color="#FFF"
          backgroundColor="#FF4081"
          onPress={handleSubmit(onSubmit)}
          containerViewStyle={styles.containerViewStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerViewStyle: {
    paddingHorizontal: 60,
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 25
  },
  buttonsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
});

function validate(values) {
  const errors = {};

  if (!values.answerText) {
    errors.answerText = 'Please enter your answer';
  }

  if (values.answerText && values.answerText.length > 500) {
    errors.answerText = 'Answer must be a maximum of 500 characters long';
  }

  return errors;
}

export default reduxForm({
  form: 'answer',
  validate
})(AnswerForm);
