import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Icon, Button } from 'react-native-elements';
import { logoutUser } from '../actions';

const background = require('../assets/background/texture.jpg');

class SideBarMenu extends Component {
  constructor() {
    super();
    this.renderMenu = this.renderMenu.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLogout() {
    const { logoutUserConnect, navigation } = this.props;
    await logoutUserConnect();
    navigation.navigate('AuthStack');
  }

  renderMenu() {
    const { auth: { token }, navigation } = this.props;

    if (token) {
      const { auth } = this.props;
      const {
        username,
        firstName,
        lastName,
        createdAt,
        photoUrl,
        following
      } = auth;

      return (
        <View style={styles.containerStyle}>
          <ImageBackground source={background} style={styles.backgroundHeaderStyle}>
            <Avatar
              large
              rounded
              source={photoUrl ? { uri: photoUrl } : null}
              title={photoUrl ? '' : (username && username.toUpperCase().slice(0, 1))}
              onPress={() => navigation.navigate('Profile')}
              activeOpacity={0.7}
              containerStyle={{}}
            />
            <Text>{`@${username}`}</Text>
          </ImageBackground>
          <View style={styles.bodyStyle}>
            <FlatList
              data={[
                {
                  key: 'User Info',
                  value: '',
                  icon: 'info-with-circle',
                  typeIcon: 'entypo'
                },
                {
                  key: 'Name:',
                  value: (firstName && lastName) ? `${firstName} ${lastName}` : '',
                  icon: 'person',
                  typeIcon: 'material-icons'
                },
                {
                  key: 'Joined:',
                  value: createdAt ? new Date(createdAt).toDateString() : null,
                  icon: 'timelapse',
                  typeIcon: 'material-community'
                },
                {
                  key: 'Following:',
                  value: following ? `${following.length}` : '',
                  icon: 'group',
                  typeIcon: 'material-icons'
                },
                {
                  key: '',
                  value: '',
                  icon: 'toys',
                  typeIcon: 'material-icons'
                },
                {
                  key: 'About Us',
                  value: '',
                  icon: 'info-with-circle',
                  typeIcon: 'entypo'
                },
                {
                  key: 'Class:',
                  value: 'SE346.J11',
                  icon: 'group-work',
                  typeIcon: 'material-icons'
                },
                {
                  key: 'Group:',
                  value: 'X',
                  icon: 'face',
                  typeIcon: 'material-icons'
                }
              ]}
              ItemSeparatorComponent={() => <View style={styles.separatorViewStyle} />}
              renderItem={({ item }) => (
                <View style={styles.infoStyle}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      name={item.icon}
                      type={item.typeIcon}
                      size={18}
                      color="#03A9F4"
                    />
                    <Text style={styles.textKeyStyle}>{item.key}</Text>
                  </View>
                  <Text style={styles.textValueStyle}>{item.value}</Text>
                </View>
              )}
              keyExtractor={item => item.key}
            />
            <View style={styles.buttonContainerStyle}>
              <Button
                title="Edit"
                icon={{ name: 'pencil-square-o', type: 'font-awesome' }}
                onPress={() => navigation.navigate('EditInfo')}
                borderRadius={25}
                fontSize={14}
                fontFamily="monospace"
                backgroundColor="#FF4081"
                containerViewStyle={styles.containerViewStyle}
              />
              <Button
                title="Logout"
                icon={{ name: 'logout', type: 'material-community' }}
                onPress={this.onLogout}
                borderRadius={25}
                fontSize={14}
                fontFamily="monospace"
                backgroundColor="#1565C0"
                containerViewStyle={styles.containerViewStyle}
              />
            </View>
          </View>
        </View>
      );
    }

    return null;
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        {this.renderMenu()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  backgroundHeaderStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyStyle: {
    flex: 3
  },
  buttonContainerStyle: {
    paddingVertical: 10
  },
  separatorViewStyle: {
    height: 1.5,
    backgroundColor: '#E0E0E0'
  },
  textKeyStyle: {
    fontFamily: 'Roboto',
    marginLeft: 4
  },
  textValueStyle: {
    fontFamily: 'Roboto'
  },
  infoStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 6,
    marginVertical: 10
  },
  containerViewStyle: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 15
  }
});

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => ({
  logoutUserConnect: () => dispatch(logoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarMenu);
