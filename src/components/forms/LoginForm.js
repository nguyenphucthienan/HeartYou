import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-native-elements';

import TextFieldInput from '../TextFieldInput';

class LoginForm extends Component {
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <View>
        <Field name="username" placeholder="Username" component={TextFieldInput} style={styles.inputFieldStyle} />
        <Field name="password" placeholder="Password" component={TextFieldInput} style={styles.inputFieldStyle} secureTextEntry />
        <View style={styles.viewStyle}>
          <Button
            title="Login"
            onPress={handleSubmit(onSubmit)}
            borderRadius={25}
            fontSize={14}
            fontWeight="bold"
            fontFamily="monospace"
            color="#FFF"
            backgroundColor="#26A69A"
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
    borderColor: '#FFF',
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
    errors.username = 'Please enter your username';
  }

  if (!values.password) {
    errors.password = 'Please enter your password';
  }

  return errors;
}

export default reduxForm({
  form: 'login',
  validate
})(LoginForm);
