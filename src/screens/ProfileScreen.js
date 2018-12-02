import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  StyleSheet
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getFirstAnsweredQuestions, getMoreAnsweredQuestions } from '../actions';

import HeartYouHeader from '../components/HeartYouHeader';
import QuestionCard from '../components/QuestionCard';

const background = require('../assets/background/texture.jpg');

class ProfileScreen extends Component {
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

    const { getFirstAnsweredQuestionsConnect } = this.props;
    await getFirstAnsweredQuestionsConnect(token, userId);

    this.setState({ isLoading: false });
  }

  async onEndReached() {
    const { auth, answeredQuestions, getMoreAnsweredQuestionsConnect } = this.props;
    const { token, _id: userId } = auth;
    const { pagination: { pageNumber, totalPages } } = answeredQuestions;

    if (pageNumber < totalPages) {
      await getMoreAnsweredQuestionsConnect(token, userId, pageNumber + 1);
    }
  }

  async onRefresh() {
    const { auth: { token, _id: userId } } = this.props;
    this.getFirstBatch(token, userId);
  }

  renderAnsweredQuestions() {
    const { isLoading } = this.state;
    const { answeredQuestions } = this.props;

    if (isLoading) {
      return (
        <ActivityIndicator size="large" />
      );
    }

    const { navigation } = this.props;

    return (
      <FlatList
        data={answeredQuestions.items}
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
    const { auth, navigation } = this.props;
    const {
      username,
      firstName,
      lastName,
      createdAt,
      photoUrl,
      moodMessage,
      following
    } = auth;

    return (
      <View style={styles.containerStyle}>
        <ImageBackground source={background} style={styles.imageBackgroundStyle}>
          <Avatar
            large
            rounded
            source={photoUrl ? { uri: photoUrl } : null}
            title={photoUrl ? '' : (username && username.toUpperCase().slice(0, 1))}
            onPress={() => { }}
            activeOpacity={0.7}
            containerStyle={styles.avatarContainerStyle}
          />
          <View style={styles.userContainerStyle}>
            <Text>{`@${username}`}</Text>
            <Text style={styles.textBoldStyle}>{`${firstName} ${lastName}`}</Text>
            <Button
              title="Edit"
              onPress={() => navigation.navigate('EditInfo')}
              buttonStyle={styles.editButtonStyle}
              borderRadius={25}
              fontSize={12}
              backgroundColor="#000"
              icon={{ name: 'pencil-square-o', type: 'font-awesome' }}
              containerViewStyle={styles.editButtonContainerViewStyle}
            />
          </View>
        </ImageBackground>
        <View style={styles.infoContainerStyle}>
          <Button
            title={createdAt ? `Joined: ${new Date(createdAt).toDateString()}` : 'Joined:}'}
            icon={{
              name: 'timelapse',
              type: 'material-community',
              color: '#2196F3'
            }}
            onPress={() => { }}
            backgroundColor="#FFF"
            color="#757575"
            fontSize={12}
          />
          <Button
            title={following ? `Following: ${following.length}` : 'Following: 0'}
            icon={{
              name: 'group',
              type: 'material-icons',
              color: '#2196F3'
            }}
            onPress={() => { }}
            backgroundColor="#FFF"
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
    backgroundColor: '#FFF',
    width: Dimensions.get('window').width
  },
  imageBackgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  avatarContainerStyle: {
    marginTop: 20
  },
  contentContainerStyle: {
    paddingBottom: 75
  },
  textBoldStyle: {
    fontWeight: 'bold'
  },
  editButtonStyle: {
    width: 80,
    height: 10
  },
  editButtonContainerViewStyle: {
    marginTop: 10,
    borderWidth: 0,
    borderColor: '#FFF',
    borderRadius: 25
  },
  userContainerStyle: {
    alignItems: 'center',
    marginVertical: 10
  },
  infoContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  messageContainerStyle: {
    alignItems: 'center',
    marginBottom: 10
  },
  messageTextStyle: {
    color: '#FF4081',
    fontSize: 12
  }
});

const mapStateToProps = ({ auth, answeredQuestions }) => ({ auth, answeredQuestions });

const mapDispatchToProps = dispatch => ({
  getFirstAnsweredQuestionsConnect: (token, userId) => dispatch(getFirstAnsweredQuestions(token, userId)),
  getMoreAnsweredQuestionsConnect: (token, userId, pageNumber) => dispatch(getMoreAnsweredQuestions(token, userId, pageNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
