import React, {useState} from "react";
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Login = ( {navigation} ) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false); 

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 


    const login = async () => {
        try {
            if (!email || !password) {
                Alert.alert('Validation Error', 'All fields are required!');
                return;
            }

            data = {
                email,
                password,
            }

            console.log('Sending data:', data);

            const response = await axios.post('http://192.168.200.105:3000/user/login', data);
            if (response && response.data) {

                navigation.navigate('Home')
                setEmail('');
                setPassword('');

            } else {
                Alert.alert('Error', response.data.message || 'Something went wrong!');
            }
        } catch (error) {
            setPasswordError('Password Incorrect');
            Alert.alert('Error', 'An error occurred during connection');
            console.log('Error during connection:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source = {require("../assets/memorise.png")}/>
            <Text style={styles.email}>Email</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.password}>Password</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                style={styles.textInputPassword}
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
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
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
        </View>
    )
};


export default Login;

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
    email:{
        color: 'blue',
        marginBottom: 5,
        position: 'fixed',
        right: 125,
    },
    password:{
        color: 'blue',
        marginBottom: 5,
        position: 'fixed',
        right: 117,
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#6495ED',
        width: '40%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    icon: {
        marginLeft: -30,
    },
});
