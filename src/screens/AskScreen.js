import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { askQuestion } from '../actions';

import HeartYouHeader from '../components/HeartYouHeader';
import AskForm from '../components/forms/AskForm';

class AskScreen extends Component {
  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  async onSubmitForm(values) {
    const { token, navigation, askQuestionConnect } = this.props;
    const user = navigation.getParam('user', null);

    await askQuestionConnect(token, user._id, values);
    navigation.goBack();
  }

  renderLeftComponent() {
    const { navigation } = this.props;
    return (
      <Icon
        name="chevron-left"
        type="octicon"
        color="#FFF"
        underlayColor="transparent"
        onPress={() => navigation.goBack()}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <HeartYouHeader leftComponent={this.renderLeftComponent()} navigation={navigation} />
        <View style={styles.containerStyle}>
          <Text style={styles.titleStyle}>Ask</Text>
          <AskForm onSubmit={this.onSubmitForm} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 35,
    fontFamily: 'monospace',
    color: '#FF4081'
  }
});

const mapStateToProps = ({ auth: { token } }) => ({ token });

const mapDispatchToProps = dispatch => ({
  askQuestionConnect: (token, answerer, values) => dispatch(askQuestion(token, answerer, values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AskScreen);
