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
          borderRadius={4}
          fontSize={14}
          fontWeight="bold"
          fontFamily="monospace"
          color="#FFF"
          backgroundColor="#03A9F4"
          onPress={handleSubmit(onSubmit)}
          containerViewStyle={styles.containerViewStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerViewStyle: {
    marginTop: 10
  }
});

function validate(values) {
  const errors = {};

  if (!values.answerBody) {
    errors.answerBody = 'Please enter your answer';
  }

  if (values.answerBody && values.answerBody.length > 500) {
    errors.answerBody = 'Answer must be a maximum of 500 characters long';
  }

  return errors;
}

export default reduxForm({
  form: 'answer',
  validate
})(AnswerForm);
