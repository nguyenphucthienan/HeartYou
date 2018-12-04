import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { FormLabel, Button, Icon } from 'react-native-elements';

import TextAreaInput from '../TextAreaInput';
import RecordModal from '../modals/RecordModal';

class AnswerForm extends Component {
  constructor() {
    super();
    this.state = { isModalVisible: false };
    this.onModalOk = this.onModalOk.bind(this);
    this.onModalCancel = this.onModalCancel.bind(this);
  }

  onModalOk(answerAudioUrl) {
    const { change } = this.props;
    change('answerAudioUrl', answerAudioUrl);
    this.setState({ isModalVisible: false });
  }

  onModalCancel() {
    this.setState({ isModalVisible: false });
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    const { isModalVisible } = this.state;

    return (
      <View>
        <FormLabel>Enter your answer</FormLabel>
        <Field name="answerText" component={TextAreaInput} />
        <View style={styles.buttonsContainerStyle}>
          <Icon
            raised
            name="microphone"
            type="material-community"
            color="#FF4081"
            onPress={() => this.setState({ isModalVisible: true })}
          />
          <RecordModal isVisible={isModalVisible} onOk={this.onModalOk} onCancel={this.onModalCancel} />
        </View>
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
    justifyContent: 'center',
    alignItems: 'center'
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
