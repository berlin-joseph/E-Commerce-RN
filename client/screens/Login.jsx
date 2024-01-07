import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/Button/ButtonComponent';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import {fetchUser, login} from '../Redux/slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const loginStatus = async () => {
      try {
        const token = AsyncStorage.getItem('auth-val-token');

        if (token) {
          navigation.replace('Bottom');
        }
      } catch (error) {
        console.log('Error', error.message);
      }
    };
    loginStatus();
  }, []);

  const handleLogin = () => {
    dispatch(fetchUser({email, password}))
      .unwrap()
      .then(response => {
        if (response.success === true) {
          const token = response.token;
          AsyncStorage.setItem('auth-val-token', token);
          navigation.replace('Bottom');
          Alert.alert('Login successful!');
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        Alert.alert('Login failed', error.message);
      });
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <InputComponent
        placeholder="Enter your email"
        container={styles.InputContainer}
        text={styles.InputText}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <InputComponent
        secureTextEntry={true}
        placeholder="Enter your password"
        container={styles.InputContainer}
        text={styles.InputText}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <ButtonComponent
        title={'Login'}
        container={styles.ButtonContainer}
        text={styles.ButtonText}
        onPress={handleLogin}
      />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  SafeAreaView: {marginTop: responsiveScreenHeight(30)},
  InputContainer: {
    borderColor: 'gray',
    borderWidth: responsiveScreenWidth(0.3),
    margin: responsiveScreenHeight(1),
    padding: responsiveScreenHeight(1),
    borderRadius: responsiveScreenWidth(2),
  },
  InputText: {color: 'black'},
  ButtonContainer: {
    backgroundColor: 'orange',
    alignSelf: 'center',
    paddingHorizontal: responsiveScreenWidth(10),
    paddingVertical: responsiveScreenWidth(2),
    borderRadius: responsiveScreenWidth(2),
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
