import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole ] = useState('client');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false); 

  const validateFullName = (fullName) => {
    const fullNameRegex = /^[a-zA-Z\s\-]+$/;
    if (!fullNameRegex.test(fullName)) {
      setFullNameError('Full Name can only contain letters, spaces, and hyphens.');
      return false;
    } else if (fullName.length < 3) {
      setFullNameError('Full Name must be at least 3 characters long.');
      return false;
    } else {
      setFullNameError('');
      return true;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
  }; 

  const register = async () => {
    try {
      
      if (!fullName || !email || !password) {
        Alert.alert('Validation Error', 'All fields are required!');
        return;
      }
      if (!validateFullName(fullName)) {
        Alert.alert('Validation Error', 'Please enter a valid full name!');
        return;
      }
      if (!validateEmail(email)) {
        Alert.alert('Validation Error', 'Please enter a valid email address!');
        return;
      }
      if (!validatePassword(password)) {
        Alert.alert('Validation Error', 'Please enter a valid password!');
        return;
      }

      const data =  {
        fullName,
        email,
        password,
        role
      };
      const response = await axios.post('http://192.168.200.105:3000/user/register', data)

      if (response) {
        navigation.navigate('Login');

        // Clear the input fields after registration
        setFullName('');
        setEmail('');
        setPassword('');
        setRole('client');
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong!');
      }

    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration');
      console.log('Error during registration:', error.message);
    }
  };


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/memorise.png')} />
      <Text style={styles.text}>Full Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={(text) => {
          setFullName(text);
          validateFullName(text);
        }}
      />
      {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}
      <Text style={styles.email}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => {
          setEmail(text); 
          validateEmail(text);
          }}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <Text style={styles.password}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.textInputPassword}
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
          secureTextEntry={!showPassword}
        />
        <MaterialCommunityIcons 
                      name={showPassword ? 'eye-off' : 'eye'} 
                      size={24} 
                      color="#aaa"
                      style={styles.icon} 
                      onPress={toggleShowPassword} 
        />   
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.textButton}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButton}>I have already an account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textInput: {
    borderColor: '#6495ED',
    borderWidth: 1,
    height: 40,
    width: 300,
    paddingLeft: 10,
    marginBottom: 15,
  },
  textInputPassword: {
    borderColor: '#6495ED',
    borderWidth: 1,
    height: 40,
    width: 300,
    paddingLeft: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    color: 'blue',
    marginBottom: 5,
    position: 'fixed',
    right: 110,
  },
  email: {
    color: 'blue',
    marginBottom: 5,
    position: 'fixed',
    right: 125,
  },
  password: {
    color: 'blue',
    marginBottom: 5,
    position: 'fixed',
    right: 114,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#6495ED',
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 100,
    marginBottom: 30,
  },
  loginButton: {
    color: '#6495ED',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  icon: {
    marginLeft: -30,
  },
});