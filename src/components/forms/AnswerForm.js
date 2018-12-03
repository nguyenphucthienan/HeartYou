import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { FormLabel, Button } from 'react-native-elements';

import TextAreaInput from '../TextAreaInput';

class AnswerForm extends Component {
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <View>
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
