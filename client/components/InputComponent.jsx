import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const InputComponent = ({
  placeholder,
  secureTextEntry,
  container,
  text,
  value,
  onChangeText,
}) => {
  return (
    <View style={container}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="gray"
        style={text}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({});
