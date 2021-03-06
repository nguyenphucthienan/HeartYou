import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { answerQuestion } from '../actions';

import HeartYouHeader from '../components/HeartYouHeader';
import AnswerForm from '../components/forms/AnswerForm';

class AnswerScreen extends Component {
  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  async onSubmitForm(values) {
    const { token, navigation, answerQuestionConnect } = this.props;
    const question = navigation.getParam('question', null);
    const refresh = navigation.getParam('refresh', null);

    await answerQuestionConnect(token, question._id, values);
    refresh();
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
    const question = navigation.getParam('question', null);

    return (
      <View>
        <HeartYouHeader leftComponent={this.renderLeftComponent()} navigation={navigation} />
        <View style={styles.containerStyle}>
          <Text style={styles.titleStyle}>Answer</Text>
          <Text style={styles.questionTextStyle}>{question.questionText}</Text>
          <AnswerForm onSubmit={this.onSubmitForm} questionAudioUrl={question.questionAudioUrl} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    fontSize: 35,
    fontFamily: 'monospace',
    color: '#FF4081'
  },
  questionTextStyle: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10
  }
});

const mapStateToProps = ({ auth: { token } }) => ({ token });

const mapDispatchToProps = dispatch => ({
  answerQuestionConnect: (token, questionId, values) => dispatch(answerQuestion(token, questionId, values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerScreen);
