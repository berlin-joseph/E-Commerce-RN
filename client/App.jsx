import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Home from './src/screens/Home';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const App = () => {
  return (
    <SafeAreaProvider style={{}}>
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
