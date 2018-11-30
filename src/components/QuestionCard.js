import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Icon } from 'react-native-elements';
import { heartOrUnheartQuestion } from '../actions';

class QuestionCard extends Component {
  constructor(props) {
    super(props);

    const { hearts } = props.question;
    const { _id: myUserId } = props.auth;
    this.state = { isHearted: hearts.includes(myUserId), numOfHearts: hearts.length };

    this.onAvatarPress = this.onAvatarPress.bind(this);
    this.heartOrUnheartQuestion = this.heartOrUnheartQuestion.bind(this);
  }

  onAvatarPress(user) {
    // const { navigation } = this.props;
    // if (navigation) {
    //   return () => navigation.navigate('User', { user });
    // }

    return () => { };
  }

  async heartOrUnheartQuestion() {
    const { auth: { token }, question, heartOrUnheartQuestionConnect } = this.props;
    const { isHearted, numOfHearts } = this.state;
    if (isHearted) {
      this.setState({ isHearted: !isHearted, numOfHearts: numOfHearts - 1 });
    } else {
      this.setState({ isHearted: !isHearted, numOfHearts: numOfHearts + 1 });
    }

    await heartOrUnheartQuestionConnect(token, question._id);
  }

  render() {
    const {
      question: {
        answerer,
        questionText,
        answerText,
        answeredAt
      }
    } = this.props;

    const { username, photoUrl } = answerer;
    const { isHearted, numOfHearts } = this.state;

    return (
      <View style={styles.cardStyle}>
        <View style={styles.topStyle}>
          <Text style={styles.questionTextStyle}>{questionText}</Text>
        </View>

        <View style={styles.bodyStyle}>
          <View style={styles.avatarStyle}>
            <Avatar
              medium
              rounded
              source={photoUrl ? { uri: photoUrl } : null}
              title={photoUrl ? '' : (username && username.toUpperCase().slice(0, 1))}
              activeOpacity={0.7}
              onPress={this.onAvatarPress(answerer)}
            />
            <Text style={styles.usernameTextStyle}>{`@${username}`}</Text>
          </View>

          <View style={styles.textContainerStyle}>
            <Text style={styles.answerTextStyle}>{answerText}</Text>
            <Text style={styles.dateTextStyle}>{new Date(answeredAt).toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.bottomStyle}>
          <Icon
            name="heart"
            color={isHearted ? '#FF4081' : '#DDD'}
            size={20}
            type="font-awesome"
            onPress={this.heartOrUnheartQuestion}
          />
          <Text>{numOfHearts > 0 ? numOfHearts : ' '}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: '#FFF',
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 4
  },
  topStyle: {
    marginTop: 2
  },
  bodyStyle: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  textContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 5,
    flexShrink: 1
  },
  bottomStyle: {
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingBottom: 2,
    marginLeft: 5,
    marginRight: 5
  },
  avatarStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  questionTextStyle: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 5,
    marginRight: 5
  },
  usernameTextStyle: {
    fontSize: 10,
    fontWeight: '200',
  },
  answerTextStyle: {
    fontStyle: 'normal',
    textAlign: 'left',
    color: 'black',
  },
  dateTextStyle: {
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
    color: '#DDD',
    marginTop: 2
  }
});

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => ({
  heartOrUnheartQuestionConnect: (token, questionId) => dispatch(heartOrUnheartQuestion(token, questionId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCard);
