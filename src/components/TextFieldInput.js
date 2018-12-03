import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';

export default ({
  input: { onChange, onBlur, ...restInput },
  meta: { error, touched },
  secureTextEntry, placeholder, style
}) => (
  <View>
    <FormInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      underlineColorAndroid={0}
      inputStyle={style}
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
  validationTextStyle: {
    fontSize: 14
  }
});
