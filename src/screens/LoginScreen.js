import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Icon } from 'react-native-elements';
import { loginUser, loginUserFromStorage, getMyUserInfo } from '../actions';

import LoginForm from '../components/forms/LoginForm';

const background = require('../assets/background/background-1.jpg');

class LoginScreen extends Component {
  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  async componentWillMount() {
    // BackHandler.addEventListener('hardwareBackPress', () => true);

    const { loginUserFromStorageConnect } = this.props;
    await loginUserFromStorageConnect();
  }

  async onSubmitForm(values) {
    const { username, password } = values;
    const { loginUserConnect } = this.props;

    if (username && password) {
      await loginUserConnect(username, password);
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { getMyUserInfoConnect, clearForm, navigation } = this.props;

    if (nextProps.token) {
      await getMyUserInfoConnect(nextProps.token);
      const { username } = this.props;

      if (username) {
        clearForm();
        navigation.navigate('Home');
      }
    }
  }

  render() {
    const { token, navigation } = this.props;

    if (token) {
      return (
        <View style={styles.loadingContainerStyle}>
          <ActivityIndicator size="large" />
          <Text style={styles.connectingTextStyle}>Connecting to Heart You server...</Text>
        </View>
      );
    }

    return (
      <ImageBackground source={background} style={styles.imageBackgroundStyle}>
        <KeyboardAvoidingView behavior="padding" style={styles.containerStyle}>
          <Text style={styles.titleStyle}>Heart You</Text>
          <LoginForm onSubmit={this.onSubmitForm} />
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerTextStyle}>Create an account</Text>
          </TouchableOpacity>
          <Text style={styles.orTextStyle}>____or____</Text>
          <TouchableOpacity onPress={() => ToastAndroid.show('Coming soon...', ToastAndroid.SHORT)}>
            <View style={styles.googleContainerStyle}>
              <Icon
                type="material-community"
                name="google-plus-box"
                color="#FFF"
              />
              <Text style={styles.googleLoginTextStyle}> Login with Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => BackHandler.exitApp()}>
            <Icon
              type="material-community"
              name="exit-to-app"
              color="#FFF"
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    flex: 1
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 40,
    color: '#FFF',
    marginVertical: 80,
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  connectingTextStyle: {
    fontSize: 16
  },
  registerTextStyle: {
    color: '#A7FFEB',
    fontFamily: 'monospace',
    marginTop: 15
  },
  orTextStyle: {
    color: '#FFF',
    marginTop: 10
  },
  googleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  googleLoginTextStyle: {
    color: '#A7FFEB',
    fontFamily: 'monospace'
  },
  loadingContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const mapStateToProps = ({ auth: { token, username } }) => ({
  token,
  username
});

const mapDispatchToProps = dispatch => ({
  loginUserConnect: (username, password) => dispatch(loginUser(username, password)),
  loginUserFromStorageConnect: () => dispatch(loginUserFromStorage()),
  getMyUserInfoConnect: token => dispatch(getMyUserInfo(token)),
  clearForm: () => dispatch(reset('login'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
