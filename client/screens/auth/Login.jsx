import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {SelectAllUser, fetchUser, logout} from '../../redux/slice/authSlice';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Redux
  const {user, loading, error} = useSelector(SelectAllUser);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    await dispatch(fetchUser({email, password}));
    if (user.success === true) {
      navigation.navigate('SignUp');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: responsiveScreenFontSize(3),
          fontWeight: '600',
        }}>
        Login
      </Text>
      <View style={styles.container}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Your Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Your Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={handleLogin}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: responsiveScreenFontSize(2.5),
            fontWeight: '400',
            marginTop: responsiveScreenHeight(2),
            color: 'blue',
          }}>
          Login
        </Text>
      </TouchableOpacity>
      {user && (
        <View>
          <Text>Welcome, {user.username}!</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={{color: 'red'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error occurred: {error.message}</Text>}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeAreaView: {flex: 1},
  container: {marginHorizontal: responsiveScreenWidth(10)},
  text: {
    marginBottom: responsiveScreenHeight(1),
    marginTop: responsiveScreenHeight(3),
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: responsiveScreenWidth(2),
    borderRadius: responsiveScreenHeight(0.5),
  },
});
