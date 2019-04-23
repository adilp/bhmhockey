import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    SafeAreaView,
    ScrollView,
    TextInput,
    Picker
} from 'react-native';

import Form from '../components/Form';
import Firebase from "../Firebase";
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import App from "../../App";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';


class NewEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            level: '',
            isVisible: false,
            chosenDateTime: 'Pick a Date',
            availSpots: 0,
            level: ''
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

    handlePicker = (datetime) => {
        this.setState({
            isVisible: false,
            chosenDateTime: moment(datetime).format('MMMM Do YYYY, h:mm a')
        })
    }

    hidePicker = () => {
        this.setState({
            isVisible: false
        })
    }

    showPicker = () => {
        this.setState({
            isVisible: true
        })
    }

    renderRequests() {

        return (


            <Block flex={0.9} color="gray2" style={styles.requests}>
                <Text h3 primary caption bold h3 accent> Date</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.showPicker}
                >
                    <Text style={styles.buttonText}> {this.state.chosenDateTime}</Text>
                </TouchableOpacity>

                <Block flex={false}>
                    <Text h3 primary caption bold h3 accent style={{ marginRight: -(25 + 5), marginTop: 15 }}> NUMBER OF SPOTS</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        keyboardType='numeric'
                        placeholder="Number of spots"
                        placeholderTextColor="gray"
                        onChangeText={(text) => this.setState({ availSpots: text })}
                    />
                </Block>

                <Block flex={false} row style={{ marginTop: 15 }}>
                    <Text h3 primary caption bold h3 accent style={{ marginRight: -(25 + 5) }}> LEVEL</Text>
                    <Block center>
                    <Picker
                        selectedValue={this.state.level}
                        style={{height: 50, width: 100}}
                        onValueChange={(itemValue, itemIndex) =>
                        this.setState({level: itemValue})
                        }>
                        <Picker.Item label="All Levels" value="All" />
                        <Picker.Item label="Gold" value="Gold" />
                        <Picker.Item label="Silver" value="Silver" />
                        <Picker.Item label="Bronze" value="Bronze" />
                        <Picker.Item label="D-League" value="Dev" />
                    </Picker>
                    </Block>
                    
                    
                </Block>

                <Block flex={1} center style={{  justifyContent: 'flex-end', marginBottom: 36}}>
                <TouchableOpacity
                style={styles.button2}
                onPress={() => this.props.navigation.navigate('Main')}
                
            >
                <Text style={styles.signupText}> ADD EVENT</Text>
            </TouchableOpacity>
                </Block>

                


                <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={'datetime'}
                    is24Hour={false}


                />


            </Block>

        );
    }

    render() {
        return (
            <SafeAreaView style={styles.safe} >

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
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        //backgroundColor: '#3A3232',
        borderColor: theme.colors.accent,
        borderRadius: 5,
        borderWidth: 0.5,
        width: 300,
        borderRadius: 5,
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
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
        //backgroundColor: theme.colors.accent,
        borderColor: theme.colors.accent,
        borderRadius: 5,
        paddingHorizontal: 16,
        borderWidth: 0.5,
        fontSize: 16,
        marginVertical: 1
    },
    button2: {
        backgroundColor: '#3A3232',
        borderColor: theme.colors.accent,
        borderRadius: 5,
        borderWidth: 0.5,
        width: 300,
        borderRadius: 5,
        paddingVertical: 10
    },
});