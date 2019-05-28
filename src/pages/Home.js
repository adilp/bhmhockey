import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Button,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    Animated
} from "react-native";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Form from '../components/Form';
import firebase from "firebase";
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import App from "../../App";
import HomeHeader from './HomeHeader';
import { getUserThunk } from '../actions';
import {connect} from 'react-redux';


//import { TouchableOpacity } from "react-native-gesture-handler";

const requests2 = [];



class Home extends Component {


    state = {
        animateItem: new Animated.Value(0),
        requestsState: [],
        loading: false
    }

    componentDidMount() {
        var currentTime = Date.now();
        var that = this;
        var ref = firebase.database().ref('Events/');
        var query = ref.orderByChild('availableSpots');
        query.once('value', function (snapshot) {
            //console.log(snapshot.val().availableSpots);
            snapshot.forEach(function (child) {
                //console.log(child.key, child.val().availableSpots);
                var time = child.val().epochTime;
                if (currentTime < time) {
                    //console.log("each time ", time);
                    //const object = {child.val()}
                    // requestsState.push({value: child.val()})
                    // that.setState({ requestsState })
                    //console.log("objects", child.val())
                    that.setState({ requestsState: [...that.state.requestsState, child.val()] })
                    that.setState({ loading: true });
                }

                //console.log("current time", currentTime)
                //console.log("Array ", that.state.requestsState)

            })
        })

    }

    componentWillMount() {
        // Animated.timing(this.state.animateItem, {
        //     toValue: 1,
        //     duration: 200
        // }).start
        console.log("Component will mount");
        this.props.getUserThunk();
    }
    logout() {
        //Firebase.auth.signOut();
    }

    getEvents() {
        //oldstate = this
        //let requestsState = [...this.state.requestsState];

        //console.log(requests2);
        // firebase.database().ref.child('Events/').orderByChild('availableSpots').on("value", function(snapshot) {
        //     console.log(snapshot.val());
        //     snapshot.forEach(function(data) {
        //         console.log(data.key);
        //     });
        // });

        // firebase.database().ref('Events/').once("value").then(function(snapshot){



        //     //const id = snapshot.key;
        //     //let avail = (snapshot.val())
        //     let lastName = (snapshot.val() && snapshot.val().availableSpots)
        //     console.log("Events ",  snapshot.val())
        //     console.log("Lat " , lastName)

        //     // oldstate.setState({
        //     //     fullname: firstName + " " + lastName
        //     // })
        // })
        //console.log("events1: " , allEvents)
    }

    SampleFunction = () => {

        this.props.navigation.navigate('Home');

    }

    renderHeader() {
        //const { user } = this.props;

        return (
            <Block flex={0.42} column style={{ paddingHorizontal: 15 }}>
               
                    <HomeHeader />
                

            </Block>
        );
    }
    renderRequest(request) {
         if (this.state.loading) {
            return (
                <Block row card shadow color="white" style={styles.request}>
                    <Block
                        flex={0.45}
                        card
                        column
                        color="secondary"
                        style={styles.requestStatus}
                    >
                        <Block flex={0.45} middle center color={theme.colors.primary}>
                            <Text medium white style={{ textTransform: "uppercase", padding: 5 }}>
                                {request.availability}
                            </Text>
                        </Block>
                        <Block flex={0.7} center middle>
                            <Text h2 white>
                                {request.availableSpots}
                            </Text>
                        </Block>
                    </Block>
                    <Block flex={0.75} column middle>
                        <Text h3 style={{ paddingVertical: 8, }}>{request.date}</Text>
                        <Text caption semibold>
                            Time: {request.puckdrop}  •  Level: {request.level}  •  Organizer: {request.organizer}
                        </Text>
                    </Block>
                </Block>
            );

        }

    }


    renderRequests() {
        return (
            <Block flex={0.9} color="gray2" style={styles.requests}>
                <Block flex={false} row space="between" style={styles.requestsHeader}>
                    <Text light>Upcoming games</Text>
                </Block>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/*  <Animated.View style={{
                        margin: 5,
                        transform: [{
                            translateY: this.state.animateItem.interpolate({
                                inputRange: [0, 1],
                                outputRange: [700, 1]
                            })
                        }]
                    }}> */}
                    {this.state.requestsState.map(request => (
                        <TouchableOpacity activeOpacity={0.8} key={`request-${request.epochTime}`} onPress={() => this.props.navigation.navigate('Event', {
                            spots: request.availableSpots,
                            date: request.date,
                            puckdrop: request.time,
                            level: request.level,
                            organizer: request.scheduler,
                            uuid: request.uuid,
                            //availability: request.availability,

                        })}>
                            {/* {this.renderRequest(this.state.requestsState)} */}

                            <Block row card shadow color="white" style={styles.request}>
                                <Block
                                    flex={0.45}
                                    card
                                    column
                                    color="secondary"
                                    style={styles.requestStatus}
                                >
                                    <Block flex={0.45} middle center color={theme.colors.primary}>
                                        <Text medium white style={{ textTransform: "uppercase", padding: 5 }}>
                                            {request.availability}
                                        </Text>
                                    </Block>
                                    <Block flex={0.7} center middle>
                                        <Text h2 white>
                                            {request.availableSpots}
                                        </Text>
                                    </Block>
                                </Block>
                                <Block flex={0.75} column middle>
                                    <Text h3 style={{ paddingVertical: 8, }}>{request.date}</Text>
                                    <Text caption semibold>
                                        Time: {request.time}  •  Level: {request.level}  •  Organizer: {request.scheduler}
                                    </Text>
                                </Block>
                            </Block>
                        </TouchableOpacity>
                    ))}
                    {/* </Animated.View> */}
                </ScrollView>

            </Block>
        );
    }

    render2Header() {
        //const { user } = this.props;

        return (
            <Block flex={0.15} column style={{ paddingHorizontal: 15 }}>
                <Block flex={false} row style={{ paddingVertical: 15 }}>
                    <Block center>
                        <Text h3 white style={{ marginRight: -(25 + 5) }}>
                            Pickup Schedule
                            
                        </Text>
                    </Block>
                </Block>

            </Block>
        );
    }
    render() {
        console.log("usersadf ", this.props.userReducer)
        return (
            <SafeAreaView style={styles.safe} >
                

                {this.render2Header()}
                 
                {this.renderRequests()}

                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('NewEvent')} style={styles.TouchableOpacityStyle}>
                    <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}

                        style={styles.FloatingButtonStyle} />
                </TouchableOpacity>



            </SafeAreaView>

        );
    }
}



export default connect(
    state=>({userReducer: state.userReducer}), 
    { getUserThunk }
  )(Home);

//export default Home;

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
        marginBottom: 15
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

    TouchableOpacityStyle: {

        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 10,
    },

    FloatingButtonStyle: {

        resizeMode: 'contain',
        width: 50,
        height: 50,
    }

});
