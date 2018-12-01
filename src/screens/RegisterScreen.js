import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { registerUser } from '../actions';

import RegisterForm from '../components/forms/RegisterForm';

const background = require('../assets/background/background-2.jpg');

class RegisterScreen extends Component {
  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  async onSubmitForm(values) {
    const { registerUserConnect, clearForm, navigation } = this.props;

    await registerUserConnect(values);
    clearForm();
    navigation.navigate('Login');
  }

  render() {
    const { navigation } = this.props;

    return (
      <ImageBackground source={background} style={styles.imageBackgroundStyle}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <Text style={styles.titleStyle}>Register</Text>
          <KeyboardAvoidingView behavior="padding">
            <RegisterForm onSubmit={this.onSubmitForm} navigation={navigation} />
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    flex: 1
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    marginVertical: 50,
    fontSize: 40,
    color: '#03A9F4',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  containerViewStyle: {
    marginTop: 15
  }
});

const mapDispatchToProps = dispatch => ({
  registerUserConnect: values => dispatch(registerUser(values)),
  clearForm: () => dispatch(reset('register'))
});

export default connect(
  null,
  mapDispatchToProps
)(RegisterScreen);
