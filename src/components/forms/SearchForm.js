import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { FormLabel, Button } from 'react-native-elements';

import TextFieldInput from '../TextFieldInput';

class SearchForm extends Component {
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <View>
        <FormLabel>Search by username</FormLabel>
        <Field name="searchString" component={TextFieldInput} style={styles.inputFieldStyle} />
        <Button
          title="Search"
          icon={{ name: 'search', type: 'feather' }}
          onPress={handleSubmit(onSubmit)}
          borderRadius={25}
          fontSize={14}
          fontWeight="bold"
          fontFamily="monospace"
          color="#FFF"
          backgroundColor="#FF4081"
          containerViewStyle={styles.containerViewStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputFieldStyle: {
    borderWidth: 2,
    borderColor: '#03A9F4',
    borderRadius: 25,
    backgroundColor: '#FFF',
    color: '#000',
    paddingHorizontal: 20
  },
  containerViewStyle: {
    paddingHorizontal: 60,
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 25
  }
});

function validate(values) {
  const errors = {};

  if (!values.searchString) {
    errors.searchString = 'Please enter a username to search';
  }

  if (values.searchString && (values.searchString.length < 3 || values.searchString.length > 20)) {
    errors.searchString = 'Username must be between 3 and 20 characters long';
  }

  return errors;
}

export default reduxForm({
  form: 'search',
  validate
})(SearchForm);
