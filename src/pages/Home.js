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
    Animated,
    RefreshControl,
    Platform
} from "react-native";



import Form from '../components/Form';
import * as firebase from "firebase";
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import CustomListView from '../components/CustomListView';
import App from "../../App";
import { getListThunk, getUserDetailsThunk, getEventCountThunk, updateCount, getAllEvents, getUserThunk, } from '../actions'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from '../Reducer';
import RenderRequestsList from './RenderRequests';
import AuthLoading from "./Settings";
import LoadingScroll from './AuthLoading';
//import Swiper from 'react-native-web-swiper';
import Swiper from '../config/swiper';
import {AfterInteractions} from 'react-native-interactions';



class Home extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            isDisabled: true,
            isFetching: true,
            message: 'default click state',
            fullname: '',
            requestsState: [],
            loading: false,
            messages: [],
            golds: [],
            silvers: [],
            bronzes: [],
            loadingfetch: false,
            refreshing: false,
            fadeAnim: new Animated.Value(0),
            textAnim: new Animated.Value(0),
            slideDownAnim: new Animated.Value(0),
        }
    }


    componentWillMount() {
        this.props.getAllEvents();
        this.listenForMessages();
        this.props.getUserDetailsThunk();

    }



    componentDidMount() {
        //List Fade in 
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true 
            }
        ).start();
        //Name Fade in
        Animated.timing(
            this.state.textAnim,
            {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true 
            }
        ).start();
        //Welcome slide from up
        Animated.timing(
            this.state.slideDownAnim,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true 
            }
        ).start();
    }



    listenForMessages() {
        //Get All events
        that = this
        var ref = firebase.database().ref('Events/');
        ref.orderByChild("epochTime").on("value", function (snapshot) {
            let messages = [];
            snapshot.forEach(child => {
                let msg = child.val();
                messages.unshift(msg);
            })
            that.setState({ messages: messages, isFetching: false })

        })

        //Get Gold schedule
        var gold = firebase.database().ref('Gold/');
        gold.orderByChild('/order').on("value", function (snapshot) {
            let messages = [];
            snapshot.forEach(child => {
                let msg = child.val();
                console.log("chilsdf ", msg)
                messages.unshift(msg);
            })
            that.setState({ golds: messages })

        })

        //Get Silver Schedule
        var silver = firebase.database().ref('Silver/');
        silver.orderByChild('/order').on("value", function (snapshot) {
            let messages = [];
            snapshot.forEach(child => {
                let msg = child.val();
                console.log("chilsdf ", msg)
                messages.unshift(msg);
            })
            that.setState({ silvers: messages })

        })

        //Get Bronze Schedule
        var bronze = firebase.database().ref('Bronze/');
        bronze.orderByChild('/order').on("value", function (snapshot) {
            console.log("This is the snap ", snapshot.val())
            let messages = [];
            snapshot.forEach(child => {
                let msg = child.val();
                console.log("chilsdf ", msg)
                messages.unshift(msg);
            })
            that.setState({ bronzes: messages })
        })

    }



    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.listenForMessages();
        this.setState({ refreshing: false });

    }
    render2Header() {

        let { fadeAnim } = this.state;
        return (
            <Block flex={false} color="gray2" style={[styles.requests, { marginBottom: 30 }]}>

                <Block flex={false} column space="between" style={[styles.requestsHeader, { marginBottom: 10 }]}>
                    <Animated.View
            
                        style={{
                            transform: [
                                {
                                    translateY: this.state.slideDownAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-50, 0]
                                    })
                                }
                            ],
                            opacity: this.state.textAnim

                        }}>
                        <Text style={{ letterSpacing: 3, fontSize: 30 }} title light secondary >Welcome,</Text>
                    </Animated.View>

                    <Animated.View
                       
                        style={{ opacity: this.state.textAnim }} >
                        <Text style={{ fontSize: 30, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 3 }} title secondary >{this.props.userDetailsReducer}!</Text>
                    </Animated.View>
                </Block>




            </Block>
        );
    }
    renderBronzeSchedules() {
        const obj = [
            {
                "date": "August 11, 2019",
                "Home": "Innisfree",
                "Away": "Icemen",
                "Time": "6:00 pm"
            },
            {
                "date": "August 11, 2019",
                "Home": "Highlanders",
                "Away": "Bandits",
                "Time": "7:15 pm"
            },
            {
                "date": "August 11, 2019",
                "Home": "Flyers",
                "Away": "Blue Monkey",
                "Time": "8:30 pm"
            },
            {
                "date": "August 11, 2019",
                "Home": "Bombers",
                "Away": "Hooligans",
                "Time": "8:30 pm"
            },
            {
                "date": "August 18, 2019",
                "Home": "Flyers",
                "Away": "Innisfree",
                "Time": "6:00 pm"
            },
            {
                "date": "August 18, 2019",
                "Home": "Bandits",
                "Away": "Hooligans",
                "Time": "7:15 pm"
            },
            {
                "date": "August 18, 2019",
                "Home": "Blue Monkey",
                "Away": "Highlanders",
                "Time": "8:30 pm"
            },
            {
                "date": "August 18, 2019",
                "Home": "Icemen",
                "Away": "Bombers",
                "Time": "9:45 pm"
            },
            {
                "date": "August 25, 2019",
                "Home": "Blue Monkey",
                "Away": "Highlanders",
                "Time": "3:30 pm"
            },
            {
                "date": "August 25, 2019",
                "Home": "Innisfree",
                "Away": "Bandits",
                "Time": "4:45 pm"
            },
            {
                "date": "August 25, 2019",
                "Home": "Highlanders",
                "Away": "Icemen",
                "Time": "6:00 pm"
            },
            {
                "date": "August 25, 2019",
                "Home": "Flyers",
                "Away": "Hooligans",
                "Time": "7:15 pm"
            },
        ]
        return (this.renderScrollableNav(this.state.bronzes, "Bronze"))
    }
    renderGoldSchedules() {
        const obj1 = [
            {
                "date": "August 18, 2019",
                "Home": "Brew Hops",
                "Away": "BASH",
                "Time": "12:45 pm"
            },
            {
                "date": "August 18, 2019",
                "Home": "Panthers",
                "Away": "Average Joe's",
                "Time": "1:00 pm"
            },
            {
                "date": "August 25, 2019",
                "Home": "BASH",
                "Away": "Panthers",
                "Time": "8:30 pm"
            },
            {
                "date": "August 25, 2019",
                "Home": "Brew Hops",
                "Away": "Average Joe's",
                "Time": "9:45 pm"
            }
        ]


        console.log("typesa ", typeof (this.state.messages));

        console.log("typesa ", this.state.messages);

        objs = this.state.golds;
        obj2 = this.state.messages;
        obj2.map((request, i) => (
            console.log("R ", request)
        ))

        return (this.renderScrollableNav(objs, "Gold"))
    }

    renderSilverSchedules() {
        const obj = [
            {
                "date": "August 11, 2019",
                "Home": "Cahaba Brewing",
                "Away": "Sam Adams",
                "Time": "2:15 pm"
            },
            {
                "date": "August 11, 2019",
                "Home": "Bandits",
                "Away": "Black Market",
                "Time": "3:30 pm"
            },
            {
                "date": "August 11, 2019",
                "Home": "Ghost Train",
                "Away": "Good People",
                "Time": "4:45 pm"
            },
            {
                "date": "August 18, 2019",
                "Home": "Good People",
                "Away": "Bandits",
                "Time": "2:15 pm"
            },
            {
                "date": "August 18, 2019",
                "Home": "Sam Adams",
                "Away": "Ghost Train",
                "Time": "3:30 pm"
            },
            {
                "date": "August 18, 2019",
                "Home": "Cahaba Brewing",
                "Away": "Black Market",
                "Time": "4:45 pm"
            },
            {
                "date": "August 25, 2019",
                "Home": "Black Market",
                "Away": "Cahaba Brewing",
                "Time": "11:45 am"
            },
            {
                "date": "August 25, 2019",
                "Home": "Bandits",
                "Away": "Good People",
                "Time": "1:00 pm"
            },
            {
                "date": "August 25, 2019",
                "Home": "Sam Adams",
                "Away": "Ghost Train",
                "Time": "2:15 pm"
            },
        ]
        return (this.renderScrollableNav(this.state.silvers, "Silver"))
    }

    renderScrollableNav(obj, title) {



        return (
            <Block flex={false} color="gray2" style={styles.requests}>
                <Block flex={false} style={[styles.requestsHeader, { alignItems: 'center', justifyContent: 'center', marginBottom: 10 }]}>
                    <Text light style={{ alignItems: 'center', justifyContent: 'center' }}>{title} Games:</Text>
                </Block>

                <ScrollView showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                >

                    {obj.map((request, i) => (

                        <Block key={i} row card shadow color="white" style={styles.request}>
                            <Block
                                middle
                                flex={0.45}
                                card
                                column
                                color="secondary"
                                style={styles.requestStatus}
                            >
                                <Block flex={0.5} middle center color={theme.colors.primary}>
                                    <Text medium white style={{ textTransform: "uppercase", padding: 5 }}>
                                        {request.Home}
                                    </Text>
                                </Block>


                                <Block flex={0.5} center middle>
                                    <Text medium white style={{ textTransform: "uppercase", padding: 5 }}>
                                        {request.Away}

                                    </Text>
                                </Block>

                            </Block>
                            <Block flex={0.75} column middle>
                                <Text secondary h3 style={{ paddingVertical: 8, }}>{request.date}</Text>

                                <Block flex={false} row style={{ paddingVertical: 2 }}>
                                    <Text secondary h4 >
                                        TIME:
                                        </Text>
                                    <Text secondary h4 semibold style={{ paddingLeft: 5 }}>
                                        {request.Time}
                                    </Text>
                                </Block>
                            </Block>
                        </Block>





                    ))}
                </ScrollView>

            </Block>

        );
    }

    renderRequests3() {
        let { fadeAnim } = this.state;
        var obj = this.state.messages
        console.log(this.state.messages);
        //var b = ar[0]; 
        console.log("Loading.... ", this.props.eventLoading)
        if (this.props.eventListReducer == null || (this.props.eventLoading === false)) {
            <Text> Broke </Text>
        } else {
            return (
                <Block flex={false} color="gray2" style={styles.requests}>
                    <Block flex={false} style={[styles.requestsHeader, { alignItems: 'center', justifyContent: 'center', marginBottom: 10 }]}>
                        <Text light style={{ alignItems: 'center', justifyContent: 'center' }}>Pickup Games:</Text>
                    </Block>

                    <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />}
                    >

                        {obj.map((request, i) => (

                            <TouchableOpacity activeOpacity={0.8} key={i} onPress={() => this.props.navigation.navigate('Event', {
                                spots: request.availableSpots,
                                date: request.date,
                                puckdrop: request.time,
                                level: request.level,
                                organizer: request.scheduler,
                                uuid: request.uuid,
                                price: request.price,
                                venmo: request.venmo.venmo,
                            })

                            }>

                                {/*  <Animated.View
                        flex={1}
                        style={{
                            transform: [
                                {
                                  translateY: this.state.slideDownAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [50, 0]
                                  })
                                }
                              ],
                            opacity: fadeAnim }} > */}
                                <Block row card shadow color="white" style={styles.request}>
                                    <Block
                                        middle
                                        flex={0.45}
                                        card
                                        column
                                        color="secondary"
                                        style={styles.requestStatus}
                                    >
                                        <Block flex={0.45} middle center color={theme.colors.primary}>
                                            <Text medium white style={{ textTransform: "uppercase", padding: 5 }}>
                                                Spots
                                            </Text>
                                        </Block>


                                        <Block flex={0.7} center middle>
                                            <Text h2 white>
                                                {request.availableSpots}

                                            </Text>
                                        </Block>

                                    </Block>
                                    <Block flex={0.75} column middle>
                                        <Text secondary h3 style={{ paddingVertical: 8, }}>{request.date}</Text>
                                        {/* <Text caption semibold>
                                            Time: {request.time}  •  Level: {request.level}  •  Organizer: {request.scheduler}  •  Price: ${request.price} 
                                       </Text> */}
                                        <Block flex={false} row style={{ paddingVertical: 2 }}>
                                            <Text secondary caption >
                                                TIME:
                                        </Text>
                                            <Text caption semibold style={{ paddingLeft: 5 }}>
                                                {request.time}
                                            </Text>
                                        </Block>

                                        <Block flex={false} row style={{ paddingVertical: 2 }}>
                                            <Text secondary caption >
                                                LEVEL:
                                       </Text>
                                            <Text caption semibold style={{ paddingLeft: 5 }}>
                                                {request.level}
                                            </Text>
                                        </Block>
                                        <Block flex={false} row style={{ paddingVertical: 2 }}>
                                            <Text secondary caption >
                                                ORGANIZER:
                                      </Text>
                                            <Text caption semibold style={{ paddingLeft: 5 }}>
                                                {request.scheduler}
                                            </Text>
                                        </Block>
                                        <Block flex={false} row style={{ paddingVertical: 2 }}>
                                            <Text secondary caption >
                                                PRICE:
                                     </Text>
                                            <Text caption semibold style={{ paddingLeft: 5 }}>
                                                ${request.price}
                                            </Text>
                                        </Block>
                                    </Block>
                                </Block>
                                {/* </Animated.View> */}

                            </TouchableOpacity>


                        ))}
                    </ScrollView>

                </Block>
            );
        }

    }

    render() {


        var obj = this.props.eventListReducer

        if (typeof this.props.userDetailsReducer === 'object') {

            return (<LoadingScroll />)

        } else {


            if (this.props.userFormDetails.creator === 1) {
                return (
                    
                    <SafeAreaView style={styles.safe} >
                 
                         {this.render2Header()} 
                         
                        <Swiper>
                            <View style={{ paddingTop: 10 }}>
                           
                                 {this.renderRequests3()} 
                            </View>
                            <View style={{ paddingTop: 10 }}>
                            {this.renderGoldSchedules()} 
                                
                                
                            </View>
                            <View>
                            {this.renderSilverSchedules()} 
                                
                               
                            </View>
                            <View>
                            {this.renderBronzeSchedules()} 
                                
                                
                            </View>
                        </Swiper>

                       
                        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('NewEvent')} style={styles.TouchableOpacityStyle}>
                            <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}

                                style={styles.FloatingButtonStyle} />
                        </TouchableOpacity>

                    </SafeAreaView>
                    

                );
            } else {
                return (
                    <AfterInteractions flex={1}> 
                    <SafeAreaView style={styles.safe} >

                    {this.render2Header()} 

                    <Swiper>
                        <View style={{ paddingTop: 10 }}>
                       
                             {this.renderRequests3()} 
                        </View>
                        <View style={{ paddingTop: 10 }}>
                        {this.renderGoldSchedules()} 
                            
                            
                        </View>
                        <View>
                        {this.renderSilverSchedules()} 
                            
                           
                        </View>
                        <View>
                        {this.renderBronzeSchedules()} 
                            
                            
                        </View>
                    </Swiper>



                    </SafeAreaView>
                    </AfterInteractions>
                );
            }

        }

    }
}



export default connect(
    state => ({
        eventLoading: state.eventListReducer.loading, userDetailsReducer: state.userDetailsReducer, userFormDetails: state.userFormDetails,
        eventListReducer: state.eventListReducer.arr
    }),
    { getUserDetailsThunk, getAllEvents }
)(Home);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.gray2,
    },

    safe: {
        flex: 1,
        backgroundColor: theme.colors.gray2,
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
