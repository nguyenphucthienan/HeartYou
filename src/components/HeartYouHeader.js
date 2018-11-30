import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';

class HeartYouHeader extends Component {
  renderLeftComponent() {
    const { navigation } = this.props;
    return (
      <Icon
        name="subject"
        type="material-icons"
        color="#FFF"
        underlayColor="transparent"
        onPress={() => navigation.toggleDrawer()}
      />
    );
  }

  renderCenterComponent() {
    return (
      <View style={styles.centerViewStyle}>
        <Icon
          name="heart"
          type="font-awesome"
          color="#FFF"
          underlayColor="transparent"
        />
        <Text style={styles.centerTextStyle}> You</Text>
      </View>
    );
  }

  renderRightComponent() {
    const { navigation } = this.props;
    return (
      <Icon
        name="search"
        type="material-icons"
        color="#FFF"
        underlayColor="transparent"
        onPress={() => navigation.navigate('Search')}
      />
    );
  }

  render() {
    const { leftComponent, centerComponent, rightComponent } = this.props;
    return (
      <View>
        <Header
          leftComponent={leftComponent || this.renderLeftComponent()}
          centerComponent={centerComponent || this.renderCenterComponent()}
          rightComponent={rightComponent || this.renderRightComponent()}
          backgroundColor="#03A9F4"
          outerContainerStyles={styles.outerContainerStyles}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerViewStyle: {
    flexDirection: 'row'
  },
  centerTextStyle: {
    color: '#FFF',
    marginLeft: 5
  },
  outerContainerStyles: {
    position: 'relative'
  }
});

export default HeartYouHeader;
