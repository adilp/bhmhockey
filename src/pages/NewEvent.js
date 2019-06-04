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
import * as firebase from "firebase";
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import App from "../../App";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "react-native-modal-datetime-picker";
import { getUserDetailsThunk } from '../actions';
import { connect } from 'react-redux';
import moment from 'moment';
import ModalSelector from 'react-native-modal-selector';



class NewEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            fullname: '',
            email: '',
            password: '',
            level: '',
            isVisible: false,
            chosenDateTime: 'Pick a Date',
            date: '',
            epochTime: 0,
            time: 0,
            dateTime: '',
            availSpots: 0,
            level: '',
            uuid: 0,
        };
    }

    componentWillMount() {

        console.log("Component will mount");
        this.props.getUserDetailsThunk();
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

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
            //chosenDateTime: datetime,
            epochTime: moment.utc(datetime).valueOf(),
            chosenDateTime: moment(datetime).format('MMMM Do YYYY, h:mm a'),
            time: moment(datetime).format("hh:mm a"),
            date: moment(datetime).format("LL"),
            uuid: this.uuidv4(),
            //dateTime: datetime
        })
        console.log(datetime)
        console.log(moment.utc(datetime).valueOf())

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
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Level' },
            { key: index++, label: 'All' },
            { key: index++, label: 'Gold' },
            { key: index++, label: 'Silver' },
            { key: index++, label: 'Bronze' },

        ];
        
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
                    <Block style={{ marginTop: 30}}>
                        
                    <ModalSelector
                    data={data}
                    initValue="Select level"
                    onChange={(option)=>{ this.setState({ level: option.label }) }} />

                    </Block>


                </Block>

                <Block flex={1} center style={{ justifyContent: 'flex-end', marginBottom: 36 }}>
                    <TouchableOpacity
                        style={styles.button2}
                        //onPress={() => this.props.navigation.navigate('Main')}
                        onPress={() => this._handlePress()}

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

    async _handlePress(): Promise<void> {
        // console.log(this.state.password);
        // console.log(this.state.firstName);
        // console.log(this.state.lastName);
        // console.log(this.state.email);
        let oldstate = this;

        console.log("fullname ", this.state.fullname)

        try {


            firebase.database().ref('Events/').push({
                uuid: oldstate.state.uuid,
                chosenDate: oldstate.state.chosenDateTime,
                epochTime: oldstate.state.epochTime,
                time: oldstate.state.time,
                //datetime: oldstate.state.dateTime,
                availableSpots: oldstate.state.availSpots,
                // scheduler: oldstate.state.fullname,
                scheduler: this.props.userDetailsReducer,
                level: oldstate.state.level,
                date: oldstate.state.date,
            }).then((data) => {
                //success callback
                console.log('data ', data)
            }).catch((error) => {
                //error callback
                console.log('error ', error)
            })
            //console.log('uid:', oldstate.state.uid);


            //var user = firebase.auth.currentUser;



        } catch (e) {
            alert(e);
        }


        //writeUserData(this.state.email, this.state.firstName, this.state.lastName, this.state.level, this.state.uid)

        console.log("Uid ", this.state.uuid)


        this.props.navigation.navigate('Main');

    }



    render() {
        console.log("Full name ", this.props)
        return (
            <SafeAreaView style={styles.safe} >

                {this.renderRequests()}
            </SafeAreaView>
        );
    }
}
export default connect(
    state => ({ userDetailsReducer: state.userDetailsReducer }),
    { getUserDetailsThunk }
)(NewEvent);
// export default NewEvent;

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