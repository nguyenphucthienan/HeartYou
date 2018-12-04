import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
import { getFirstUnansweredQuestions, getMoreUnansweredQuestions } from '../actions';

import HeartYouHeader from '../components/HeartYouHeader';

class QuestionScreen extends Component {
  constructor() {
    super();
    this.state = { isLoading: true };

    this.getFirstBatch = this.getFirstBatch.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderUnansweredQuestions = this.renderUnansweredQuestions.bind(this);
  }

  async componentWillMount() {
    const { auth: { token, _id: userId } } = this.props;
    await this.getFirstBatch(token, userId);
  }

  async getFirstBatch(token, userId) {
    this.setState({ isLoading: true });

    const { getFirstUnansweredQuestionsConnect } = this.props;
    await getFirstUnansweredQuestionsConnect(token, userId);

    this.setState({ isLoading: false });
  }

  async onEndReached() {
    const { auth, unansweredQuestions, getMoreUnansweredQuestionsConnect } = this.props;
    const { token, _id: userId } = auth;
    const { pagination: { pageNumber, totalPages } } = unansweredQuestions;

    if (pageNumber < totalPages) {
      await getMoreUnansweredQuestionsConnect(token, userId, pageNumber + 1);
    }
  }

  async onRefresh() {
    const { auth: { token, _id: userId } } = this.props;
    this.getFirstBatch(token, userId);
  }

  renderItem(question) {
    const { navigation } = this.props;
    return (
      <ListItem
        subtitle={(
          <View>
            <Text style={styles.questionTextStyle}>{question.questionText}</Text>
            <View style={styles.infoTextStyle}>
              <Icon
                name="volume-high"
                type="material-community"
                size={20}
                color={question.questionAudioUrl ? '#651FFF' : '#DDD'}
              />
              <Text style={styles.dateTimeStyle}>
                {`${new Date(question.createdAt).toLocaleString()}`}
              </Text>
            </View>
          </View>
        )}
        onPressRightIcon={() => navigation.navigate('Answer', {
          question,
          refresh: this.onRefresh
        })}
      />
    );
  }

  renderUnansweredQuestions() {
    const { isLoading } = this.state;
    const { unansweredQuestions } = this.props;

    if (isLoading) {
      return (
        <ActivityIndicator size="large" />
      );
    }

    return (
      <FlatList
        data={unansweredQuestions.items}
        renderItem={({ item }) => (this.renderItem(item))}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isLoading}
        onRefresh={this.onRefresh}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <HeartYouHeader navigation={navigation} />
        {this.renderUnansweredQuestions()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  questionTextStyle: {
    fontWeight: 'bold'
  },
  infoTextStyle: {
    flexDirection: 'row'
  },
  dateTimeStyle: {
    marginLeft: 2
  },
  contentContainerStyle: {
    paddingBottom: 75
  }
});

const mapStateToProps = ({ auth, unansweredQuestions }) => ({ auth, unansweredQuestions });

const mapDispatchToProps = dispatch => ({
  getFirstUnansweredQuestionsConnect: (token, userId) => dispatch(getFirstUnansweredQuestions(token, userId)),
  getMoreUnansweredQuestionsConnect: (token, userId, pageNumber) => dispatch(getMoreUnansweredQuestions(token, userId, pageNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((QuestionScreen));
