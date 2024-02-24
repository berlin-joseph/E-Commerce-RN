import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Category from '../components/Category';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const Home = () => {
  return (
    <View>
      <Header />
      <View>
        <Text style={{margin: responsiveWidth(5)}}>Category</Text>
        <Category />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
