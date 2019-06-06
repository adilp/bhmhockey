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
import { 
    getListThunk, 
    getUserDetailsThunk, 
    getEventCountThunk, 
    updateCount, 
    getAllEvents, 
    getUserThunk, 
    getListBalanced,
    

} from '../actions' 
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {connect} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from '../Reducer';
import RenderRequestsList from './RenderRequests';
import _ from 'lodash';



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
        
        this._handleStart();
       

    }

    componentWillMount(){
        var passedUuid = this.params.uuid
        this.props.getListThunk(this.params.uuid);
        this.props.getUserDetailsThunk();
        this.props.getEventCountThunk(this.params.uuid);
        this.props.getUserThunk();
        this.props.getListBalanced(this.params.uuid);
        
        
    }

    async _handleStart(): Promise<void> {
        var that = this;
        var ref = firebase.database().ref('SignUp/' + this.params.uuid);
   

        
        ref.once('value').then(function (snapshot) {
            
            snapshot.forEach(function (child) {
               

                let currentlike = child.val()
                    //console.log("sched ", currentlike)
                    that.setState({ requestsState: [...that.state.requestsState, currentlike] })
                    that.setState({ loading: true });

               

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
        //console.log("My name: " , this.state.fullname)
        var checking = true;
        Object.keys(this.state.requestsState).map(i => {
            var myitem = this.state.requestsState[i];
            //console.log("state name: " , myitem.scheduler)
           //console.log("Is eqal ", _.isEqual(myitem.scheduler, this.state.fullname)) 

            if ("Is eqal ", _.isEqual(myitem.scheduler, this.props.userDetailsReducer)){
                //console.log("false")
                checking = false;
                
            }
            else {
               // console.log("true")
                
            }
            
        })

        return checking;
        
    }
    
    fullCheck(){
        if (this.params.spots == 0){
            console.log("Zero spots aval")
            return true
        } else {
            console.log("There are " + this.params.spots + " available")
            return false
        }
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
                            <Text h1>{this.props.eventcountReducer}</Text>
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
            
                <Block flex={0.75} column middle>
                    <Text caption style={{ paddingVertical: 8, }}>{request.organizer}</Text>
                </Block>
           
        );
    }


    renderRequests() {
                
        return (
            <Block flex={0.8} color="gray2" style={styles.requests}>
            <Block center>
                 <TouchableOpacity  style={styles.button} onPress={() => this._handlePress()}>
                    
                        <Text style={styles.buttonText}> Register</Text>
    
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

    renderRequestsRedux() {
        const register = <Block center>
                            <TouchableOpacity  style={styles.button} onPress={() => this._handlePress()}>
                                       <Text style={styles.buttonText}> Register</Text>

                            </TouchableOpacity>
                        </Block>
        const disableRegister = <Block center>
                                    <TouchableOpacity style={styles.button} onPress={() => alert("Game is full!")}>
                                        <Text style={styles.buttonText}> Register</Text>
                                    </TouchableOpacity>
                                </Block>
        let regButton = disableRegister;

        if (this.fullCheck()) {
            regButton = disableRegister;
        } else {
            regButton = register;
        }
        //console.log("is fetching ", this.props.listReducer.isFetching )
        if (this.props.teamListFetchReducer.isFetching) {
            return(
                <ActivityIndicator size="large" color ="0000ff"/>
            ) 
        } else {
            return (
                <Block flex={0.8} color="gray2" style={styles.requests}>
                <Block center>
                     <TouchableOpacity  style={styles.button} onPress={() => this._handlePress()}>
                        
                            <Text style={styles.buttonText}> Register</Text>
        
                    </TouchableOpacity>
                    
                    </Block>
                    <Block flex={false} row space="between" style={styles.requestsHeader}>
                        <Text h3>White team:</Text>
                    </Block>
                    <Block row card shadow color="white" style={styles.request} >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.props.whiteTeamReducer.whiteTeam.map((request,i) => (
                            <TouchableOpacity activeOpacity={0.8} key={i}>
                            <Block flex={0.75} column middle>
                                <Block row space="between">
                                    <Text caption style={{ paddingVertical: 8, }}>{request.Name}</Text>
                                    <Text caption style={{ paddingVertical: 8, }}>{request.Paid}</Text>
                                </Block>
                                
                            
                            </Block>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    </Block>
                    <Block flex={false} row space="between" style={styles.requestsHeader}>
                    <Text h3>Black team:</Text>
                </Block>
                <Block row card shadow color="white" style={styles.request} >
                     <ScrollView showsVerticalScrollIndicator={false}>
                        {this.props.blackTeamReducer.blackTeam.map((request, i) => (
                            <TouchableOpacity activeOpacity={0.8} key={i}>
                            <Block flex={0.75} column middle>
                            <Block row space="between">
                            <Text caption style={{ paddingVertical: 8, }}>{request.Name}</Text>
                            <Text caption style={{ paddingVertical: 8, }}>{request.Paid}</Text>
                        </Block>
                            </Block>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    
                    </Block>
                    
                </Block>
            );
        }
                
        
    }

    async _handlePress(): Promise<void> {
                
        
        let event_uuid = this.params.uuid;

           

    if (this.check()) {
       
        try {
            
            var signupUid = this.uuidv4();
            firebase.database().ref('SignUp/' + event_uuid /* + '/' + currentUser */).push({
                scheduler: this.props.userDetailsReducer,
                uuid: signupUid,
               
            }).then((data)=>{
                this.props.updateCount(event_uuid);
                console.log('data ' , data)
            }).catch((error)=>{
                //error callback
                console.log('error ' , error)
            })
           
        
        
        
    } catch (e) {
        alert(e);
    }

    // try {
    //     var querry = firebase.database().ref('Event/').orderByChild("uuid").equalTo(event_uuid);
    //     querry.once("value", function(snapshot){
    //         snapshot.forEach(child => {
    //             console.log("child2 ", child.val().availableSpots)
    //             var spots = child.val().availableSpots -1 
    //             console.log("New spots ", spots)
    //             //child.ref.update({availableSpots: })
    //         })
    //     })
    // } catch(e){
    //     alert(e)
    // }
    } else {
        //console.log("Already exists");
        alert("You have already registered!")
    }

        
        //this.force();
        //this.componentWillMount();
    }
// renderWHite() {
//     if (this.props.whiteTeamReducer)
//     <Block row card shadow color="white" style={styles.request} >
//                     <ScrollView showsVerticalScrollIndicator={false}>
//                         {this.props.whiteTeamReducer.whiteTeam.map((request,i) => (
//                             <TouchableOpacity activeOpacity={0.8} key={i}>
//                             <Block flex={0.75} column middle>
//                                 <Block row space="between">
//                                     <Text caption style={{ paddingVertical: 8, }}>{request.Name}</Text>
//                                     <Text caption style={{ paddingVertical: 8, }}>{request.Paid}</Text>
//                                 </Block>
                                
                            
//                             </Block>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                     </Block>
// }
    render() {
        // console.log("Available spots ", this.params.spots)
        //this.fullCheck();
        // console.log("User thhhuunnkkk ", this.props.userThunk)
        // console.log("Key ", this.props.eventcountReducer)
        // console.log("props " , this.props.list)
         console.log("reducerasfasdf ", this.props.teamListFetchReducer.isFetching)
    // console.log("White Team ", this.props.balanceTeamsReducer.whiteTeam[0])
    // console.log("Black Team ", this.props.balanceTeamsReducer.blackTeam[0])
    console.log("Whole team in event ", this.props.balanceTeamsReducer)
    //console.log("WHite team in event ", this.props.whiteTeamReducer[0])
    //var wht = this.props.whiteTeamReducer[0]
    //console.log("WHite look in ", wht.Name)
    console.log("Black team in event ", this.props.blackTeamReducer)
        const empty = [];
        
        
        return (
            <SafeAreaView style={styles.safe} >
                {this.renderHeader()}
                {this.renderRequestsRedux()}

                {/*    
                    
                    {this.renderRequests()} 
                <RenderRequestsList uuid={this.params.uuid} />
                */}
                
            </SafeAreaView>
 
        );
    }
}



export default connect(
    state=>({ teamListFetchReducer: state.teamListFetchReducer, blackTeamReducer: state.blackTeamReducer, whiteTeamReducer: state.whiteTeamReducer, 
        balanceTeamsReducer: state.balanceTeamsReducer, userThunk: state.userReducer, list: state.listReducer, userDetailsReducer: state.userDetailsReducer, 
        eventcountReducer: state.eventcountReducer, updateCountReducer: state.updateCount, eventListReducer: state.eventListReducer}), 
    { getListThunk, getUserDetailsThunk, getEventCountThunk, updateCount, getAllEvents, getUserThunk, getListBalanced }
  )(Event);


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
