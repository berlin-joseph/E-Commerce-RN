import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ButtonComponent = ({title, container, text, onPress}) => {
  return (
    <TouchableOpacity style={container} onPress={onPress}>
      <Text style={text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({});
