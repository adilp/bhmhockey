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
import * as firebase from 'firebase';


class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            level: '',
            uid: ''
        };
    }

    writeUserData(email,fname,lname,level,uid){

        
        firebase.database().ref('UsersList/').child("users").child(uid).push({
            email,
            fname,
            lname,
            level
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    }

    async _handlePress(): Promise<void> {
        // console.log(this.state.password);
        // console.log(this.state.firstName);
        // console.log(this.state.lastName);
        // console.log(this.state.email);
        let oldstate = this;
        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function(user) {
                oldstate.setState({uid: user.user.uid});
                firebase.database().ref('UsersList/').child("users").child(user.user.uid).set({
                    email: oldstate.state.email,
                    firstname: oldstate.state.firstName,
                    lastname: oldstate.state.lastName,
                    level: oldstate.state.level
                }).then((data)=>{
                    //success callback
                    console.log('data ' , data)
                }).catch((error)=>{
                    //error callback
                    console.log('error ' , error)
                })
                console.log('uid:', oldstate.state.uid);
            })

            //var user = firebase.auth.currentUser;
            
            
            
        } catch (e) {
            alert(e);
        }
        //writeUserData(this.state.email, this.state.firstName, this.state.lastName, this.state.level, this.state.uid)

        console.log("after login ",  this.state.uid)
    }

 

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="First Name"
                    placeholderTextColor="white"
                    onChangeText={(text) => this.setState({ firstName: text })}
                />
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Last Name"
                    placeholderTextColor="white"
                    onChangeText={(text) => this.setState({ lastName: text })}
                />
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
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Playing experience"
                    placeholderTextColor="white"
                    onChangeText={(text) => this.setState({ level: text })}

                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._handlePress()}
                >
                    <Text style={styles.buttonText}> {this.props.type}</Text>
                </TouchableOpacity>

                

                <View style={styles.signupTextCont}>
                    <Text> Dont have an acount yet? </Text>
                    <Text
                        style={styles.signupText}
                        onPress={() => this.props.navigation.navigate('Home')}
                    > Signup </Text>
                </View>
            </View>
            // <View style={styles.container}>
            //     <Form type="Register" />

            //     <View style={styles.signupTextCont}>
            //         <Text> Already have an account? </Text>
            //         <Text 
            //         style={styles.signupText}
            //         onPress={() => this.props.navigation.navigate('Home')}
            //         > Signin </Text>
            //     </View>

            // </View>
        );
    }
}
export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#455a64',
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
        backgroundColor: '#455a64',
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
        backgroundColor: '#1c313a',
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
