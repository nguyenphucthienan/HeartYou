import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';

export default ({ input: { onChange, onBlur, ...restInput }, meta: { error, touched }, secureTextEntry }) => (
  <View>
    <FormInput
      multiline
      numberOfLines={4}
      secureTextEntry={secureTextEntry}
      underlineColorAndroid={0}
      inputStyle={styles.inputFieldStyle}
      onChangeText={onChange}
      onEndEditing={onBlur}
      {...restInput}
    />
    <FormValidationMessage>{touched && error}</FormValidationMessage>
  </View>
);

const styles = StyleSheet.create({
  inputFieldStyle: {
    borderWidth: 2,
    borderColor: '#FF4081',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingLeft: 5
  }
});
