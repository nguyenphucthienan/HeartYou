import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';

export default ({
  input: { onChange, onBlur, ...restInput },
  meta: { error, touched },
  secureTextEntry, placeholder
}) => (
  <View>
    <FormInput
      multiline
      numberOfLines={5}
      underlineColorAndroid={0}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      inputStyle={styles.inputFieldStyle}
      onChangeText={onChange}
      onEndEditing={onBlur}
      {...restInput}
    />
    <FormValidationMessage labelStyle={styles.validationTextStyle}>
      {touched && error}
    </FormValidationMessage>
  </View>
);

const styles = StyleSheet.create({
  inputFieldStyle: {
    borderWidth: 2,
    borderColor: '#03A9F4',
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingLeft: 5
  },
  validationTextStyle: {
    fontSize: 14
  }
});
