import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    SafeAreaView,
    ScrollView,
    TextInput
} from 'react-native';

import Form from '../components/Form';
import Firebase from "../Firebase";
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import App from "../../App";
import { TouchableOpacity } from "react-native-gesture-handler";


class NewEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            level: '',
        };
    }

    // loadApp = async() => {
    //     const userToken = await AsyncStorage.getItem('userToken')

    //     this.props.navigation.navigate(userToken ? 'App' : 'Auth')
    // }
    renderHeader() {
        //const { user } = this.props;

        return (
            <Block flex={0.1} color="gray2" column style={{ paddingHorizontal: 15 }}>
                <Block flex={false} row style={{ paddingVertical: 15 }}>
                    <Block >
                        <Text h2 bold accent style={{ marginRight: -(25 + 5) }}>
                            New Event
                        </Text>


                    </Block>
                </Block>

            </Block>
        );
    }

    renderRequests() {

        return (


            <Block flex={0.9} color="gray2" style={styles.requests}>
                <Text h3 accent style={{ marginRight: -(25 + 5), marginTop: 5 }}>
                    Pick date
        </Text>

                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="First Name"
                    placeholderTextColor="white"
                />

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

export default NewEvent;

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
    inputBox: {
        width: 300
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: theme.colors.accent,
        borderRadius: 5,
        paddingHorizontal: 16,
        fontSize: 16,
        marginVertical: 16
    },
});