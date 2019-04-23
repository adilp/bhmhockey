import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    SafeAreaView,
    ScrollView,
} from 'react-native';

import Form from '../components/Form';
import Firebase from "../Firebase";
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import App from "../../App";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from 'firebase';

class AuthLoading extends Component {

    constructor() {
        super()
        //this.loadApp()
    }

    // loadApp = async() => {
    //     const userToken = await AsyncStorage.getItem('userToken')

    //     this.props.navigation.navigate(userToken ? 'App' : 'Auth')
    // }

    _logout(){
        //var user = firebase.auth.currentUser;
        firebase.auth().signOut();
        console.log("signedout");
    }
    renderHeader() {
        //const { user } = this.props;

        return (
            <Block flex={0.15} column style={{ paddingHorizontal: 15 }}>
                <Block flex={false} row style={{ paddingVertical: 15 }}>
                    <Block center>
                        <Text h3 white style={{ marginRight: -(25 + 5) }}>
                            Settings
                        </Text>
                    </Block>
                </Block>

            </Block>
        );
    }

    

    renderRequests() {

        return (


            <Block flex={0.9} color="gray2" style={styles.requests}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity>
                        <Block row card shadow color="white" style={styles.request} >
                            <Block row space="between" style={{ paddingHorizontal: 30 }}>
                                <Block flex={false} row center>
                                    <Text h3 > Account </Text>
                                </Block>

                                <Block flex={false} row center>
                                    <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                                        >
                            </Text>

                                </Block>
                            </Block>
                        </Block>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Block row card shadow color="white" style={styles.request} >
                        <Block row space="between" style={{ paddingHorizontal: 30 }}>
                            <Block flex={false} row center>
                                <Text h3 > Payment </Text>
                            </Block>

                            <Block flex={false} row center>
                                <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                                    >
                    </Text>

                            </Block>
                        </Block>
                    </Block>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Block row card shadow color="white" style={styles.request} >
                        <Block row space="between" style={{ paddingHorizontal: 30 }}>
                            <Block flex={false} row center>
                                <Text h3 > Notifications </Text>
                            </Block>

                            <Block flex={false} row center>
                                <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                                    >
                    </Text>

                            </Block>
                        </Block>
                    </Block>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Block row card shadow color="white" style={styles.request} >
                        <Block row space="between" style={{ paddingHorizontal: 30 }}>
                            <Block flex={false} row center>
                                <Text h3 > About </Text>
                            </Block>

                            <Block flex={false} row center>
                                <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                                    >
                    </Text>

                            </Block>
                        </Block>
                    </Block>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => this._logout()}
                    >
                    <Block row card shadow color="white" style={styles.request} >
                        <Block row space="between" style={{ paddingHorizontal: 30 }}>
                            <Block flex={false} row center>
                                <Text h3 > Logout </Text>
                            </Block>

                            <Block flex={false} row center>
                                <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                                    >
                    </Text>

                            </Block>
                        </Block>
                    </Block>
                    </TouchableOpacity>
                </ScrollView>
            </Block>

        );
    }

    render() {
        return (
            <SafeAreaView style={styles.safe} >
                {this.renderHeader()}
                {this.renderRequests()}
            </SafeAreaView>
        );
    }
}

export default AuthLoading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A62C23',
    },

    safe: {
        flex: 1,
        backgroundColor: theme.colors.accent,
    },
    headerChart: {
        paddingTop: 30,
        //paddingBottom: 45,
        zIndex: 1,
    },
    requests: {
        marginTop: -40,
        paddingTop: 55 + 20,
        paddingHorizontal: 15,
        zIndex: -1,
    },
    request: {
        padding: 20,
        marginBottom: 20
    },
    requestStatus: {
        marginRight: 20,
        overflow: "hidden",
        height: 90
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
    button: {
        backgroundColor: '#3A3232',
        width: 300,
        borderRadius: 25,
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    },
    requestsHeader: {
        paddingHorizontal: 20,
        paddingBottom: 15
    },
});