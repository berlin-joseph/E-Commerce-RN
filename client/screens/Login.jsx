import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/Button/ButtonComponent';
import {
  responsiveFontSize,
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
    // loginStatus();
  }, []);

  const handleLogin = () => {
    dispatch(fetchUser({email, password}))
      .then(response => {
        if (response.success === true) {
          console.log(response);
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
      <StatusBar
        animated={false}
        backgroundColor="red"
        barStyle="dark-content"
      />
      <Image source={require('../assets/Logo.png')} style={styles.Image} />
      <Text
        style={{
          textAlign: 'center',
          color: '#FB187E',
          fontWeight: '900',
          fontSize: responsiveFontSize(2),
          marginTop: responsiveScreenHeight(5),
          marginBottom: responsiveScreenHeight(2),
        }}>
        LOGIN
      </Text>
      <View>
        <Text style={styles.Text}>Email</Text>
        <InputComponent
          placeholder="Enter your email"
          container={styles.InputContainer}
          text={styles.InputText}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View>
        <Text style={styles.Text}>Password</Text>
        <InputComponent
          secureTextEntry={true}
          placeholder="Enter your password"
          container={styles.InputContainer}
          text={styles.InputText}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Text style={[styles.Text, {textAlign: 'right', color: '#FB187E'}]}>
          Forgot Password
        </Text>
      </View>
      <ButtonComponent
        title={'Login'}
        container={styles.ButtonContainer}
        text={styles.ButtonText}
        onPress={handleLogin}
      />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', color: '#FB187E'}}>
            Don’t have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{textAlign: 'center', color: '#FB187E'}}>
              {' '}
              Join us
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    marginTop: responsiveScreenHeight(5),
    margin: responsiveScreenHeight(1),
  },
  InputContainer: {
    borderColor: 'gray',
    borderWidth: responsiveScreenWidth(0.3),
    padding: responsiveScreenHeight(1),
    borderRadius: responsiveScreenWidth(2),
  },
  Image: {
    alignSelf: 'center',
    height: responsiveScreenWidth(40),
    width: responsiveScreenWidth(40),
  },
  Text: {
    marginVertical: responsiveScreenHeight(1),
    color: '#FB187E',
    fontSize: responsiveFontSize(1.7),
    fontWeight: '500',
  },
  InputText: {color: 'black'},
  ButtonContainer: {
    backgroundColor: '#FB187E',
    alignSelf: 'center',
    width: responsiveScreenWidth(50),
    paddingVertical: responsiveScreenWidth(2),
    borderRadius: responsiveScreenWidth(1),
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
});
