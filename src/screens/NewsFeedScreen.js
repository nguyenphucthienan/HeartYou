import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getFirstNewsFeed, getMoreNewsFeed } from '../actions';

import HeartYouHeader from '../components/HeartYouHeader';
import QuestionCard from '../components/QuestionCard';

class NewsFeedScreen extends Component {
  constructor() {
    super();
    this.state = { isLoading: true };

    this.renderHeader = this.renderHeader.bind(this);
    this.getFirstBatch = this.getFirstBatch.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderAnsweredQuestions = this.renderAnsweredQuestions.bind(this);
  }

  async componentWillMount() {
    const { auth: { token, _id: userId } } = this.props;
    await this.getFirstBatch(token, userId);
  }

  async getFirstBatch(token, userId) {
    this.setState({ isLoading: true });

    const { getFirstNewsFeedConnect } = this.props;
    await getFirstNewsFeedConnect(token, userId);

    this.setState({ isLoading: false });
  }

  async onEndReached() {
    const { auth, newsFeed, getMoreNewsFeedConnect } = this.props;
    const { token, _id: userId } = auth;
    const { pagination: { pageNumber, totalPages } } = newsFeed;

    if (pageNumber < totalPages) {
      await getMoreNewsFeedConnect(token, userId, pageNumber + 1);
    }
  }

  async onRefresh() {
    const { auth: { token, _id: userId } } = this.props;
    this.getFirstBatch(token, userId);
  }

  renderAnsweredQuestions() {
    const { isLoading } = this.state;
    const { newsFeed } = this.props;

    if (isLoading) {
      return (
        <ActivityIndicator size="large" />
      );
    }

    const { navigation } = this.props;

    return (
      <FlatList
        data={newsFeed.items}
        renderItem={({ item }) => <QuestionCard question={item} navigation={navigation} />}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isLoading}
        onRefresh={this.onRefresh}
        keyExtractor={item => item._id}
        ListHeaderComponent={this.renderHeader()}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  }

  renderHeader() {
    const { auth: { firstName, lastName } } = this.props;

    return (
      <View style={styles.containerStyle}>
        <Icon
          name="star"
          type="font-awesome"
          size={18}
          color="#FFEA00"
        />
        <Text style={styles.welcomeTextStyle}>{`Hi ${firstName} ${lastName}. Have a nice day!`}</Text>
        <Icon
          name="star"
          type="font-awesome"
          size={18}
          color="#FFEA00"
        />
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <HeartYouHeader navigation={navigation} />
        {this.renderAnsweredQuestions()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  welcomeTextStyle: {
    marginLeft: 5,
    marginRight: 5
  },
  contentContainerStyle: {
    paddingBottom: 75
  }
});

const mapStateToProps = ({ auth, newsFeed }) => ({ auth, newsFeed });

const mapDispatchToProps = dispatch => ({
  getFirstNewsFeedConnect: (token, userId) => dispatch(getFirstNewsFeed(token, userId)),
  getMoreNewsFeedConnect: (token, userId, pageNumber) => dispatch(getMoreNewsFeed(token, userId, pageNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsFeedScreen);
