import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

import HeartYouHeader from '../components/HeartYouHeader';
import SearchForm from '../components/forms/SearchForm';

import { SEARCH_USER_URL } from '../config/api';

class SearchScreen extends Component {
  constructor() {
    super();
    this.state = { foundUsers: [] };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.renderFoundUsers = this.renderFoundUsers.bind(this);
  }

  async onSubmitForm(values) {
    const { auth: { token } } = this.props;
    const { searchString } = values;

    const response = await axios.get(
      SEARCH_USER_URL,
      {
        headers: { authorization: `Bearer ${token}` },
        params: { username: searchString }
      },
    );

    if (response.data) {
      this.setState({ foundUsers: response.data });
    }
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

  renderUserCard(user) {
    const { navigation } = this.props;
    const {
      username,
      firstName,
      lastName,
      photoUrl,
      moodMessage
    } = user;

    return (
      <View style={styles.containerStyle}>
        <Avatar
          large
          rounded
          source={photoUrl ? { uri: photoUrl } : null}
          title={photoUrl ? '' : (username && username.toUpperCase().slice(0, 1))}
          onPress={() => navigation.navigate('User', { user })}
          activeOpacity={0.7}
          containerStyle={styles.avatarContainerStyle}
        />
        <View style={styles.infoStyle}>
          <Text>{`@${username}`}</Text>
          <Text style={styles.textBoldStyle}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.messageTextStyle}>{moodMessage}</Text>
        </View>
      </View>
    );
  }

  renderFoundUsers() {
    const { foundUsers } = this.state;
    return (
      <FlatList
        data={foundUsers}
        renderItem={({ item }) => this.renderUserCard(item)}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <HeartYouHeader leftComponent={this.renderLeftComponent()} navigation={navigation} />
        <ScrollView>
          <SearchForm onSubmit={this.onSubmitForm} />
          {this.renderFoundUsers()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 13,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 4
  },
  textBoldStyle: {
    fontWeight: 'bold'
  },
  infoStyle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContainerStyle: {
    marginLeft: 20
  },
  messageTextStyle: {
    color: '#FF4081',
    fontSize: 12
  },
  contentContainerStyle: {
    paddingTop: 20,
    paddingBottom: 70
  }
});

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(SearchScreen);
