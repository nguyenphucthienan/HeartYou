import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { FormLabel, Button } from 'react-native-elements';

import TextAreaInput from '../TextAreaInput';

class AskForm extends Component {
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <View>
        <FormLabel>Enter your question</FormLabel>
        <Field name="questionText" component={TextAreaInput} />
        <Button
          title="Ask"
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
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 25
  }
});

function validate(values) {
  const errors = {};

  if (!values.questionText) {
    errors.questionText = 'Please enter your question';
  }

  if (values.questionText && values.questionText.length > 500) {
    errors.questionText = 'Question must be a maximum of 500 characters long';
  }

  return errors;
}

export default reduxForm({
  form: 'ask',
  validate
})(AskForm);
