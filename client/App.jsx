import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, Platform} from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Routes from './Routes/routes';

const CustomStatusBar = ({backgroundColor}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{height: insets.top, backgroundColor}}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle="light-content"
      />
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      {Platform.OS === 'ios' ? (
        <CustomStatusBar backgroundColor="#FB187E" />
      ) : (
        <StatusBar backgroundColor="#FB187E" barStyle={'light-content'} />
      )}

      <Routes />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
