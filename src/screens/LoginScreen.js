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
import {
  loginUser,
  loginUserFromStorage,
  getMyUserInfo,
  logoutUser
} from '../actions';

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
    const {
      getMyUserInfoConnect,
      logoutUserConnect,
      clearForm,
      navigation
    } = this.props;

    if (nextProps.token) {
      await getMyUserInfoConnect(nextProps.token);
      const { username } = this.props;

      if (username) {
        clearForm();
        navigation.navigate('MainDrawer');
      } else {
        await logoutUserConnect();
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
          <Text style={styles.horizontalTextStyle}>__________</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    marginBottom: 60,
    fontSize: 40,
    color: '#FFF',
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  connectingTextStyle: {
    fontSize: 16
  },
  registerTextStyle: {
    color: '#FFF',
    fontFamily: 'monospace',
    marginTop: 15
  },
  horizontalTextStyle: {
    color: '#FFF',
    marginBottom: 10
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
  logoutUserConnect: () => dispatch(logoutUser()),
  clearForm: () => dispatch(reset('login'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
