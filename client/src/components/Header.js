import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import colors from '../constants/Theme';

const Header = () => {
  return (
    <View
      style={{
        paddingHorizontal: responsiveWidth(5),
        flexDirection: 'row',
        width: responsiveWidth(90),
        alignSelf: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.gray,
        paddingVertical: responsiveWidth(3),
        borderRadius: responsiveWidth(2),
      }}>
      <TextInput
        placeholder="search"
        placeholderTextColor={colors.gray_text}
        style={{
          fontSize: responsiveWidth(4),

          width: '100%',
        }}
      />
      <AntDesign
        name="search1"
        size={responsiveWidth(5)}
        style={{paddingRight: responsiveWidth(5)}}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
