import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-native-elements';

import TextFieldInput from '../TextFieldInput';

class EditInfoForm extends Component {
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <View>
        <Field name="firstName" placeholder="First Name" component={TextFieldInput} style={styles.inputFieldStyle} />
        <Field name="lastName" placeholder="Last Name" component={TextFieldInput} style={styles.inputFieldStyle} />
        <Field name="photoUrl" placeholder="Photo URL" component={TextFieldInput} style={styles.inputFieldStyle} />
        <Field name="moodMessage" placeholder="Mood Message" component={TextFieldInput} style={styles.inputFieldStyle} />
        <Button
          title="Save"
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
  inputFieldStyle: {
    borderWidth: 2,
    borderColor: '#03A9F4',
    borderRadius: 25,
    backgroundColor: '#FFF',
    color: '#000',
    paddingHorizontal: 20,
    marginTop: 5,
    fontFamily: 'monospace'
  },
  containerViewStyle: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 25
  }
});

function validate(values) {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Please enter your first name';
  }

  if (!values.lastName) {
    errors.lastName = 'Please enter your last name';
  }

  if (!values.avatar) {
    errors.avatar = 'Please enter your avatar URL';
  }

  if (values.avatar && values.avatar.match(/\.(jpeg|jpg|gif|png)$/) == null) {
    errors.avatar = 'Photo URL is not a valid URL';
  }

  if (!values.moodMessage) {
    errors.moodMessage = 'Please enter your mood message';
  }

  if (values.moodMessage && values.moodMessage.length > 50) {
    errors.moodMessage = 'Mood message must be a maximum of 50 characters long';
  }

  return errors;
}

export default reduxForm({
  form: 'editinfo',
  validate,
})(EditInfoForm);
