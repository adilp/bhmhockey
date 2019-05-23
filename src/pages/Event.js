import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    SafeAreaView,
    ScrollView,
    TextInput,
    Picker
} from "react-native";

import Form from '../components/Form';
import * as firebase from "firebase";
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import App from "../../App";
import { TouchableOpacity } from "react-native-gesture-handler";



class Event extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            isDisabled: true,
            message: 'default click state',
            fullname: '',
            requestsState: [],
            loading: false
          }
    }

    componentDidMount() {
        //var currentTime = Date.now();
        var that = this;
        var ref = firebase.database().ref('SignUp/');
        var query = ref.orderByChild(this.params.uuid);
        query.once('value').then(function (snapshot) {
            //console.log(snapshot.val().availableSpots);
            snapshot.forEach(function (child) {
                child.forEach(item => {
                    item.forEach(child => {
                        let currentlike = child.val()
                        //console.log("sched " , currentlike);
                        that.setState({ requestsState: [...that.state.requestsState, currentlike] })
                        that.setState({ loading: true });
                    })
                   
                })

               

            })
        })

    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    }

    check() {
        let _ = require('underscore');
        console.log("My name: " , this.state.fullname)
        var checking = true;
        Object.keys(this.state.requestsState).map(i => {
            var myitem = this.state.requestsState[i];
            console.log("state name: " , myitem.scheduler)
           //console.log("Is eqal ", _.isEqual(myitem.scheduler, this.state.fullname)) 

            if ("Is eqal ", _.isEqual(myitem.scheduler, this.state.fullname)){
                console.log("false")
                checking = false;
                
            }
            else {
                console.log("true")
                
            }
            
        })

        return checking;
        
    }
    
    logout() {
        //Firebase.auth.signOut();
    }

    renderHeader() {
        //const { user } = this.props;

        return (
            <Block flex={0.42} column style={{ paddingHorizontal: 15 }}>
                <Block flex={false} row style={{ paddingVertical: 15 }}>
                    <Block center>
                        <Text h3 white style={{ marginRight: -(25 + 5) }}>
                             {this.params.date}
                        </Text>
                    </Block>
                </Block>
                <Block card shadow color="white" style={styles.headerChart}>
                    <Block collumn center>
                        <Text h1> {this.params.puckdrop}</Text>
                    </Block>
                    <Block row space="between" style={{ paddingHorizontal: 30 }}>
                        <Block flex={false} row center>
                            <Text caption bold tertiary>Level: </Text>
                            <Text h1 style={{ paddingHorizontal: 10 }}>
                                {this.params.level}
                  </Text>
                        </Block>

                        <Block flex={false} row center>
                            <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                                Spots Available:
                  </Text>
                            <Text h1>{this.params.spots}</Text>
                        </Block>
                    </Block>
                    <Block
                        flex={0.5}
                        collumn
                        center
                        space="between"
                        style={{ paddingHorizontal: 30 }}
                    >
                        <Text caption light>
                            Organizer:
                </Text>
                        <Text caption light>
                            {this.params.organizer}
                </Text>
                    </Block>
                    <Block flex={1}>
                    </Block>
                </Block>
            </Block>
        );
    }
    renderRequest(request) {
        return (
            //<Block row card shadow color="white" style={styles.request}>
                <Block flex={0.75} column middle>
                    <Text caption style={{ paddingVertical: 8, }}>{request.organizer}</Text>
                </Block>
            //</Block>
        );
    }


    renderRequests() {
        // const requests = [
        //     {
        //         id: 1,
        //         spots: "15",
        //         date: "Tuesday 4/16/19",
        //         puckdrop: "10pm",
        //         level: "B",
        //         organizer: "Adil Patel",
        //         time: 12,
        //         availability: "Available",
        //     },
        //     {
        //         id: 2,
        //         spots: "0",
        //         date: "Wednesday 4/17/19",
        //         puckdrop: "11pm",
        //         level: "All",
        //         organizer: "Brian",
        //         time: 22,
        //         availability: "Sold out",
        //     },
        //     {
        //         id: 3,
        //         spots: "1",
        //         date: "Wednesday 4/17/19",
        //         puckdrop: "9pm",
        //         level: "D",
        //         organizer: "Erik",
        //         time: 24,
        //         availability: "Available",
        //     },

        // ];

        
        return (
            <Block flex={0.8} color="gray2" style={styles.requests}>
            <Block center>
                 <TouchableOpacity  style={styles.button} onPress={() => this._handlePress()}>
                    
                        <Text style={styles.buttonText}> Register</Text>
    
                </TouchableOpacity>
                <TouchableOpacity  style={styles.button} onPress={() => this.check()}>
                    
                        <Text style={styles.buttonText}> Test</Text>
    
                </TouchableOpacity>
                </Block>
                <Block flex={false} row space="between" style={styles.requestsHeader}>
                    <Text h3>White team:</Text>
                </Block>
                <Block row card shadow color="white" style={styles.request} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.requestsState.map(request => (
                        <TouchableOpacity activeOpacity={0.8} key={`request-${request.uuid}`}>
                        <Block flex={0.75} column middle>
                        <Text caption style={{ paddingVertical: 8, }}>{request.scheduler}</Text>
                    </Block>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                </Block>
                <Block flex={false} row space="between" style={styles.requestsHeader}>
                <Text h3>Black team:</Text>
            </Block>
                
            </Block>
        );
    }

    async _handlePress(): Promise<void> {
        // console.log(this.state.password);
        // console.log(this.state.firstName);
        // console.log(this.state.lastName);
        // console.log(this.state.email);

        
        let oldstate = this;
        currentUser = firebase.auth().currentUser.uid;
        //console.log("after login ",  currentUser)
        //console.log("Evvent uuid; ",  this.params.uuid)
        let event_uuid = this.params.uuid;

        try {
            
                
            firebase.database().ref('UsersList/' + currentUser).once("value").then(function(snapshot){
                let firstName = (snapshot.val() && snapshot.val().firstname)
                let lastName = (snapshot.val() && snapshot.val().lastname)
                //console.log("FirstName ",  firstName)

                oldstate.setState({
                    fullname: firstName + " " + lastName
                })
            })
        
    } catch (e) {
        alert(e);
    }
    //console.log("fullname ",  this.state.fullname)
    //console.log("ehllo " ,this.check())

    if (this.check()) {
        console.log("New name");
        try {
            
            var signupUid = this.uuidv4();
            firebase.database().ref('SignUp/' + event_uuid + '/' + currentUser).push({
                //uuid: event_uuid,
                //chosenDate: oldstate.state.chosenDateTime,
                //epochTime: oldstate.state.epochTime,
                //time: oldstate.state.time,
                //datetime: oldstate.state.dateTime,
                //availableSpots: oldstate.state.availSpots,
                scheduler: oldstate.state.fullname,
                uuid: signupUid,
                //level: oldstate.state.level,
                //date: oldstate.state.date,
            }).then((data)=>{
                //success callback
                console.log('data ' , data)
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
            })
           
        
        
        
    } catch (e) {
        alert(e);
    }
    } else {
        console.log("Already exists");
        alert("You have already registered!")
    }

        
        
    }

    render() {
        return (
            <SafeAreaView style={styles.safe} >
                {this.renderHeader()}
                {this.renderRequests()}
            </SafeAreaView>
            // <View style={styles.container}>

            //     <View style={styles.signupTextCont}>
            //         <Text> Dont have an acount yet? </Text>
            //         <Text style={styles.signupText}
            //         onPress={() => this.logout()}
            //         > Signup </Text>

            //     </View>

            // </View>
        );
    }
}

// Home.defaultProps = {
//     user:mocks.user,
//     requests: mocks.requests,
//     chart: mocks.chart,
// };


export default Event;

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
