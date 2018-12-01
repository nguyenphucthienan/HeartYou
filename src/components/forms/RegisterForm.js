import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Field, reduxForm, } from 'redux-form';
import { Button } from 'react-native-elements';
import axios from 'axios';

import TextFieldInput from '../TextFieldInput';

import { CHECK_USERNAME_URL } from '../../config/api';

class RegisterForm extends Component {
  render() {
    const { handleSubmit, onSubmit, navigation } = this.props;
    return (
      <View>
        <Field name="username" placeholder="Username" component={TextFieldInput} style={styles.inputFieldStyle} />
        <Field name="password" placeholder="Password" component={TextFieldInput} style={styles.inputFieldStyle} secureTextEntry />
        <Field name="passwordConfirm" placeholder="Confirm Password" component={TextFieldInput} style={styles.inputFieldStyle} secureTextEntry />
        <Field name="firstName" placeholder="First Name" component={TextFieldInput} style={styles.inputFieldStyle} />
        <Field name="lastName" placeholder="Last Name" component={TextFieldInput} style={styles.inputFieldStyle} />
        <View style={styles.viewStyle}>
          <Button
            title="Register"
            onPress={handleSubmit(onSubmit)}
            borderRadius={25}
            fontSize={14}
            fontWeight="bold"
            fontFamily="monospace"
            color="#FFF"
            backgroundColor="#FF4081"
            containerViewStyle={styles.containerViewStyle}
          />
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            borderRadius={25}
            fontSize={14}
            fontWeight="bold"
            fontFamily="monospace"
            color="#FFF"
            backgroundColor="#1565C0"
            containerViewStyle={styles.containerViewStyle}
          />
        </View>
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
  viewStyle: {
    marginHorizontal: 50
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
