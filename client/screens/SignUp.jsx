import {
  Alert,
  Image,
  SafeAreaView,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUser} from '../Redux/slice/authSlice';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(createUser({name, email, password, phoneNumber}))
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Account creation error:', error);
        if (error.response && error.response.data) {
          Alert.alert('Account creation failed', error.response.data.message);
        } else {
          Alert.alert(
            'Account creation failed',
            'An error occurred while creating the account.',
          );
        }
      });
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
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
        CREATE ACCOUNT
      </Text>
      <View>
        <Text style={styles.Text}>Name</Text>
        <InputComponent
          placeholder="Enter your name"
          container={styles.InputContainer}
          text={styles.InputText}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View>
        <Text style={styles.Text}>Phone Number</Text>
        <InputComponent
          placeholder="Enter your phone number"
          container={styles.InputContainer}
          text={styles.InputText}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
      </View>
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
      </View>
      <ButtonComponent
        title={'create account'}
        container={styles.ButtonContainer}
        text={styles.ButtonText}
        onPress={handleCreate}
      />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', color: '#FB187E'}}>
            Have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{textAlign: 'center', color: '#FB187E'}}>
              {' '}
              {''}Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

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
    marginTop: responsiveScreenHeight(2),
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
