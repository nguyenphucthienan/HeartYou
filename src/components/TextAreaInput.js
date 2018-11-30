import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';

export default ({ input: { onChange, onBlur, ...restInput }, meta: { error, touched }, secureTextEntry }) => (
  <View>
    <FormInput
      multiline
      numberOfLines={5}
      underlineColorAndroid={0}
      secureTextEntry={secureTextEntry}
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
    borderColor: '#03A9F4',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingLeft: 5
  }
});
