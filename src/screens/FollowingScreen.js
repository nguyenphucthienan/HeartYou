import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import {
  getFirstFollowingList,
  getMoreFollowingList,
  followOrUnfollowUser,
  getMyUserInfo
} from '../actions';

import HeartYouHeader from '../components/HeartYouHeader';

class FollowingScreen extends Component {
  constructor() {
    super();
    this.state = { isLoading: true };

    this.getFirstBatch = this.getFirstBatch.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderFollowingList = this.renderFollowingList.bind(this);
    this.followOrUnfollowUser = this.followOrUnfollowUser.bind(this);
  }

  async componentWillMount() {
    const { auth: { token, _id: userId } } = this.props;
    await this.getFirstBatch(token, userId);
  }

  async getFirstBatch() {
    this.setState({ isLoading: true });

    const { auth: { _id: userId } } = this.props;
    const { getFirstFollowingListConnect } = this.props;
    await getFirstFollowingListConnect(userId);

    this.setState({ isLoading: false });
  }

  async onEndReached() {
    const { auth, following, getMoreFollowingListConnect } = this.props;
    const { _id: userId } = auth;
    const { pagination: { pageNumber, totalPages } } = following;

    if (pageNumber < totalPages) {
      await getMoreFollowingListConnect(userId, pageNumber + 1);
    }
  }

  async onRefresh() {
    this.getFirstBatch();
  }

  async followOrUnfollowUser(userId) {
    const { auth: { token }, getMyUserInfoConnect, followOrUnfollowUserConnect } = this.props;
    await followOrUnfollowUserConnect(token, userId);
    await getMyUserInfoConnect(token);
  }

  renderItem(user) {
    const {
      _id,
      username,
      firstName,
      lastName,
      photoUrl
    } = user;

    const { navigation } = this.props;
    return (
      <ListItem
        avatar={(
          <Avatar
            rounded
            source={photoUrl ? { uri: photoUrl } : null}
            title={photoUrl ? '' : (username && username.toUpperCase().slice(0, 1))}
            onPress={() => navigation.navigate('User', { user, refresh: this.onRefresh })}
            activeOpacity={0.7}
          />
        )}
        title={`@${username}`}
        subtitle={`${firstName} ${lastName}`}
        subtitleStyle={styles.subtitleStyle}
        rightIcon={(
          <Icon
            name="user-times"
            type="font-awesome"
            color="#FF4081"
            onPress={() => { this.followOrUnfollowUser(_id); }}
          />
        )}
      />
    );
  }

  renderFollowingList() {
    const { isLoading } = this.state;
    const { following } = this.props;

    if (isLoading) {
      return (
        <ActivityIndicator size="large" />
      );
    }

    return (
      <FlatList
        data={following.items}
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
        {this.renderFollowingList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subtitleStyle: {
    color: '#000',
    fontWeight: 'bold'
  },
  contentContainerStyle: {
    paddingBottom: 75
  }
});

const mapStateToProps = ({ auth, following }) => ({ auth, following });

const mapDispatchToProps = dispatch => ({
  getFirstFollowingListConnect: userId => dispatch(getFirstFollowingList(userId)),
  getMoreFollowingListConnect: (userId, pageNumber) => dispatch(getMoreFollowingList(userId, pageNumber)),
  getMyUserInfoConnect: token => dispatch(getMyUserInfo(token)),
  followOrUnfollowUserConnect: (token, userId) => dispatch(followOrUnfollowUser(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingScreen);
