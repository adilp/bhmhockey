import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity
} from "react-native";

import Form from '../components/Form';

import Logo from '../components/Logo';
import Firebase from "../Firebase";

class Login extends Component {

    componentDidMount(){
        //this._logoutPress()
        this._otherPress()
        //console.log("this.state.email");

      }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            
        };
    }

    _handlePress(){
        console.log(this.state.password);
        console.log(this.state.email);
        
        try {
            Firebase.auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user){
                console.log(user)
            })
        }catch (error) {
            console.log(error.toString());
        }
    }


    _otherPress(){

        var user = Firebase.auth.currentUser;

        if (user != null){
            console.log(user.uid)
        }
        console.log(user)

    }

    _logoutPress(){
        this.props.navigation.navigate('Main')
        // var user = Firebase.auth.currentUser;
        // Firebase.auth.signOut();
        // console.log("signedout");
        // Firebase.auth.onAuthStateChanged(function(user){
        //     if (user){
        //         console.log("logged in")
        //     } else {
        //         console.log("logged out")
        //     }
        // })

        
    }

    

    render() {
        return (
            
            <View style={styles.container}>
            <Logo />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="white"
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    onChangeText={(text) => this.setState({ password: text })}

                />
                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._handlePress()}
                    
                >
                    <Text style={styles.buttonText}> Sign in</Text>
                </TouchableOpacity>*/}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._logoutPress()}
                    
                >
                    <Text style={styles.buttonText}> Sign in</Text>
                </TouchableOpacity>

                <View style={styles.signupTextCont}>
                    <Text> Dont have an acount yet? </Text>
                    <Text
                        style={styles.signupText}
                        onPress={() => this.props.navigation.navigate('Signup')}
                    > Signup </Text>
                </View>

                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._otherPress()}
                >
                    <Text style={styles.buttonText}> User or noh</Text>
                </TouchableOpacity>
                */}
{/*
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._logoutPress()}
                >
                    <Text style={styles.buttonText}> Logout</Text>
                </TouchableOpacity>
*/}
            </View>

        );
    }
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A62C23',
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A62C23',
    },
    signupText: {
        color: 'white',
        fontWeight: 'bold'
    },
    inputBox: {
        width: 300
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        marginVertical: 16
    },
    button: {
        backgroundColor: '#3A3232',
        width: 300,
        borderRadius: 25,
        marginVertical: 16,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    }
});
