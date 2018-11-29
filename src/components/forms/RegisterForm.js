import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Field, reduxForm, } from 'redux-form';
import { Button } from 'react-native-elements';
import axios from 'axios';

import TextFieldInput from '../TextFieldInput';

import { CHECK_USERNAME_URL } from '../../config/api';

class RegisterForm extends Component {
  render() {
    const { handleSubmit, onSubmit } = this.props;

    return (
      <ScrollView>
        <Field name="username" placeholder="Username" component={TextFieldInput} style={styles.inputFieldStyle} />
        <Field name="password" placeholder="Password" component={TextFieldInput} style={styles.inputFieldStyle} secureTextEntry />
        <Field name="passwordConfirm" placeholder="Confirm password" component={TextFieldInput} style={styles.inputFieldStyle} secureTextEntry />
        <Field name="firstName" placeholder="First name" component={TextFieldInput} style={styles.inputFieldStyle} />
        <Field name="lastName" placeholder="Last name" component={TextFieldInput} style={styles.inputFieldStyle} />
        <Button
          title="Register"
          borderRadius={25}
          fontSize={14}
          fontWeight="bold"
          fontFamily="monospace"
          color="#FFF"
          backgroundColor="#FF4081"
          onPress={handleSubmit(onSubmit)}
          containerViewStyle={styles.containerViewStyle}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputFieldStyle: {
    borderWidth: 2,
    borderColor: '#FF4081',
    borderRadius: 25,
    backgroundColor: '#FFF',
    color: '#000',
    paddingHorizontal: 20,
    marginTop: 5,
    fontFamily: 'monospace'
  },
  containerViewStyle: {
    marginTop: 10,
    borderRadius: 25
  }
});

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please enter a username';
  }

  if (values.username && (values.username.length < 3 || values.username.length > 20)) {
    errors.username = 'Username must be between 3 and 20 characters long';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  if (values.password && (values.password.length < 6 || values.password.length > 20)) {
    errors.password = 'Password must be between 6 and 20 characters long';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter confirm password';
  }

  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Your passwords do not match';
  }

  if (!values.firstName) {
    errors.firstName = 'Please enter your first name';
  }

  if (!values.lastName) {
    errors.lastName = 'Please enter your last name';
  }

  return errors;
}

function asyncValidate(values) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(CHECK_USERNAME_URL, { username: values.username });
      const { result } = response.data;

      if (!result) {
        reject(new Error({ username: 'Username is taken' }));
      }

      resolve();
    } catch (err) {
      // Ignore the error
    }
  });
}

export default reduxForm({
  form: 'register',
  validate,
  asyncValidate,
  asyncBlurFields: ['username']
})(RegisterForm);
