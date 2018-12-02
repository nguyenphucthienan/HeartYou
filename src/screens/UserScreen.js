import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import { followOrUnfollowUser, getMyUserInfo } from '../actions';
import { getAnsweredQuestionsUrl } from '../config/api';

import HeartYouHeader from '../components/HeartYouHeader';
import QuestionCard from '../components/QuestionCard';

const background = require('../assets/background/texture.jpg');

class UserScreen extends Component {
  constructor() {
    super();
    this.state = {
      pagination: {
        pageNumber: 1,
        pageSize: 10
      },
      answeredQuestions: [],
      isFollowed: false,
      isLoading: true
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.getFirstBatch = this.getFirstBatch.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderAnsweredQuestions = this.renderAnsweredQuestions.bind(this);
    this.followOrUnfollowUser = this.followOrUnfollowUser.bind(this);
  }

  async componentWillMount() {
    await this.getFirstBatch();

    // TODO: Check follow or not
  }

  async getFirstBatch() {
    await this.setState({ isLoading: true });

    const { auth: { token }, navigation } = this.props;
    const user = navigation.getParam('user', null);

    const url = getAnsweredQuestionsUrl(user._id, 1, 10);
    const response = await axios.get(url, { headers: { authorization: `Bearer ${token}` } });

    this.setState({
      pagination: response.data.pagination,
      answeredQuestions: response.data.items,
      isLoading: false,
    });
  }

  async onEndReached() {
    const { auth: { token }, navigation } = this.props;
    const user = navigation.getParam('user', null);

    const { pagination: { pageNumber, pageSize, totalPages }, answeredQuestions } = this.state;

    if (pageNumber < totalPages) {
      const url = getAnsweredQuestionsUrl(user._id, pageNumber + 1, pageSize);
      const response = await axios.get(url, { headers: { authorization: `Bearer ${token}` } });

      this.setState({
        pagination: response.data.pagination,
        answeredQuestions: [
          ...answeredQuestions,
          ...response.data.items
        ]
      });
    }
  }

  onRefresh() {
    this.getFirstBatch();
  }

  async followOrUnfollowUser() {
    const { isFollowed } = this.state;
    const {
      auth: { token },
      getMyUserInfoConnect,
      followOrUnfollowUserConnect,
      navigation
    } = this.props;

    this.setState({ isFollowed: !isFollowed });
    const user = navigation.getParam('user', null);
    await followOrUnfollowUserConnect(token, user._id);
    await getMyUserInfoConnect(token);
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

  renderHeader() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', null);

    const {
      username,
      firstName,
      lastName,
      createdAt,
      photoUrl,
      moodMessage,
      following
    } = user;

    const { isFollowed } = this.state;

    return (
      <View style={styles.headerContainerStyle}>
        <ImageBackground source={background} style={styles.imageBackgroundStyle}>
          <Avatar
            large
            rounded
            source={photoUrl ? { uri: photoUrl } : null}
            title={photoUrl ? '' : (username && username.toUpperCase().slice(0, 1))}
            onPress={() => { }}
            activeOpacity={0.7}
            containerStyle={{ marginTop: 20 }}
          />
          <Text style={{ fontSize: 12 }}>{`@${username}`}</Text>
          <Text style={{ fontWeight: 'bold' }}>{`${firstName} ${lastName}`}</Text>
          <Button
            title={isFollowed ? 'Unfollow' : 'Follow'}
            buttonStyle={{ width: 100, height: 10 }}
            onPress={this.followOrUnfollowUser}
            borderRadius={25}
            fontSize={11}
            backgroundColor="#000000"
            icon={isFollowed ? { name: 'user-unfollow', type: 'simple-line-icon' } : { name: 'user-follow', type: 'simple-line-icon' }}
            containerViewStyle={{ marginTop: 10, marginBottom: 5 }}
          />
          <Button
            title="Ask me anything"
            buttonStyle={{ width: 200, height: 35 }}
            fontSize={15}
            borderRadius={4}
            backgroundColor="#FF5722"
            onPress={() => navigation.navigate('Ask', { user })}
            containerViewStyle={{ marginTop: 10, marginBottom: 5 }}
            rightIcon={{ name: 'sentiment-very-satisfied', type: 'material-icons' }}
          />
        </ImageBackground>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            title={createdAt ? `Joined: ${new Date(createdAt).toDateString()}` : 'Joined:}'}
            icon={{ name: 'timelapse', type: 'material-community', color: '#2196F3' }}
            onPress={() => { }}
            backgroundColor="#FFFFFF"
            color="#757575"
            fontSize={12}
          />
          <Button
            title={following ? `Following: ${following.length}` : 'Following: 0'}
            icon={{ name: 'group', type: 'material-icons', color: '#2196F3' }}
            onPress={() => { }}
            backgroundColor="#FFFFFF"
            color="#757575"
            fontSize={12}
          />
        </View>
        <View style={styles.messageContainerStyle}>
          <Text style={styles.messageTextStyle}>{moodMessage}</Text>
        </View>
      </View>
    );
  }

  renderAnsweredQuestions() {
    const { isLoading, answeredQuestions } = this.state;

    if (isLoading) {
      return (
        <ActivityIndicator size="large" />
      );
    }

    return (
      <FlatList
        data={answeredQuestions}
        renderItem={({ item }) => <QuestionCard question={item} />}
        onEndReached={this.onEndReached}
        refreshing={isLoading}
        onRefresh={this.onRefresh}
        keyExtractor={item => item._id}
        ListHeaderComponent={this.renderHeader()}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <HeartYouHeader leftComponent={this.renderLeftComponent()} navigation={navigation} />
        {this.renderAnsweredQuestions()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainerStyle: {
    width: Dimensions.get('window').width
  },
  imageBackgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15
  },
  messageContainerStyle: {
    alignItems: 'center',
    marginBottom: 10
  },
  messageTextStyle: {
    color: '#FF4081',
    fontSize: 12
  },
  contentContainerStyle: {
    paddingBottom: 75
  }
});

const mapStateToProps = ({ auth, following }) => ({ auth, following });

const mapDispatchToProps = dispatch => ({
  getMyUserInfoConnect: token => dispatch(getMyUserInfo(token)),
  followOrUnfollowUserConnect: (token, userId) => dispatch(followOrUnfollowUser(token, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScreen);
