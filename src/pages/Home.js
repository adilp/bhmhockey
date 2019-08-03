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
    RefreshControl
} from "react-native";

import Form from '../components/Form';
import * as firebase from "firebase";
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import CustomListView from '../components/CustomListView';
import App from "../../App";
import { getListThunk, getUserDetailsThunk, getEventCountThunk, updateCount, getAllEvents, getUserThunk } from '../actions' 
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {connect} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from '../Reducer';
import RenderRequestsList from './RenderRequests';
import AuthLoading from "./Settings";
import LoadingScroll from './AuthLoading';


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
            loadingfetch: false,
            refreshing: false,
          }
    }
 

    componentWillMount(){      
        this.props.getAllEvents();
        this.listenForMessages();
        this.props.getUserDetailsThunk();
    }

   
      
    listenForMessages() {
        
        that = this
        var ref = firebase.database().ref('Events/');
        ref.orderByChild("epochTime").on("value", function(snapshot) {
            let messages = [];
            snapshot.forEach(child => {
                let msg = child.val();
                messages.unshift(msg);
            })
            that.setState({ messages: messages, isFetching: false})

    })
      }

      _onRefresh = () => {
        this.setState({refreshing: true});
        
        this.listenForMessages();
        this.setState({refreshing: false});
     
      }
    render2Header() {
       
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

    renderRequests3() {
        var obj = this.state.messages
         //var b = ar[0]; 
        console.log("Loading.... ", this.props.eventLoading)
        if (this.props.eventListReducer == null || (this.props.eventLoading === false)) {
            <Text> Broke </Text>
        } else {
            return (
                <Block flex={0.9} color="gray2" style={styles.requests}>
                <Block flex={false} row space="between" style={[styles.requestsHeader, { marginBottom: 10 }]}>
                        <Text title>Welcome {this.props.userDetailsReducer}</Text>
                    </Block>
                    <Block flex={false} row space="between" style={styles.requestsHeader}>
                        <Text light>Upcoming games</Text>
                    </Block>
                    
    
                    <ScrollView showsVerticalScrollIndicator={false} 
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        /> }
                        >
               
                        {obj.map((request,i) => (
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
                                        <Text h3 style={{ paddingVertical: 8, }}>{request.date}</Text>
                                        <Text caption semibold>
                                            Time: {request.time}  •  Level: {request.level}  •  Organizer: {request.scheduler}  •  Price: ${request.price} 
                                        </Text>
                                    </Block>
                                </Block>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
    
                </Block>
            );
                        }
        
    }
 
    render() {
        
        var obj = this.props.eventListReducer
        
        if (typeof this.props.userDetailsReducer === 'object'){
            
            return(<LoadingScroll />)
            
        } else {
            
            
            if (this.props.userFormDetails.creator === 1) {
                return (
                    <SafeAreaView style={styles.safe} >
                      
        
                        {this.render2Header()}
                        {this.renderRequests3()}
                   
                                       
                        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('NewEvent')} style={styles.TouchableOpacityStyle}>
                            <Image source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
        
                                style={styles.FloatingButtonStyle} />
                        </TouchableOpacity>
                    </SafeAreaView>
        
                );
            } else {
                return (
                    <SafeAreaView style={styles.safe} >
                        
        
                        {this.render2Header()}
                        {this.renderRequests3()}
                       
                      
                        
                    </SafeAreaView>
        
                );
            }
            
        } 
        
    }
}



export default connect(
    state=>({eventLoading: state.eventListReducer.loading, userDetailsReducer: state.userDetailsReducer, userFormDetails: state.userFormDetails,
         eventListReducer: state.eventListReducer.arr}), 
    { getUserDetailsThunk, getAllEvents}
  )(Home);


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
