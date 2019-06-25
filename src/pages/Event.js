import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    SafeAreaView,
    ScrollView,
    TextInput,
    Picker,
    RefreshControl,
    TouchableOpacity
} from "react-native";

import Form from '../components/Form';
import * as firebase from "firebase";
import * as theme from '../theme';
import Block from '../components/Block';
import Text from '../components/Text';
import App from "../../App";
//import { TouchableOpacity } from "react-native-gesture-handler";
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
        if (!this.props.whiteTeamReducer && !this.props.blackTeamReducer){
            alert("Hello")
        }
       

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
        Object.keys(this.props.whiteTeamReducer.whiteTeam).map(i => {
            var myitem = this.props.whiteTeamReducer.whiteTeam[i];
            console.log('my item', myitem.Name);
            //console.log("state name: " , myitem.scheduler)
           //console.log("Is eqal ", _.isEqual(myitem.scheduler, this.state.fullname)) 

            if ("Is eqal ", _.isEqual(myitem.Name, this.props.userDetailsReducer)){
                //console.log("false")
                checking = false;
                
            }
            else {
               // console.log("true")
                
            }
            
        })
        Object.keys(this.props.blackTeamReducer.blackTeam).map(i => {
            var myotherItem = this.props.blackTeamReducer.blackTeam[i];
            if ("Is eqal ", _.isEqual(myotherItem.Name, this.props.userDetailsReducer)){
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
               <ScrollView>
                    <Block collumn center>
                        <Text h1> {this.params.puckdrop}</Text>
                    </Block>
                    <Block row space="between" style={{ paddingHorizontal: 30 }}>
                        <Block flex={false} row center>
                            <Text caption bold tertiary>Price: </Text>
                            <Text h2 style={{ paddingHorizontal: 10 }}>
                                ${this.params.price}
                  </Text>
                        </Block>

                        <Block flex={false} row center>
                            <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                                Spots Available:
                  </Text>
                            <Text h2>{this.props.eventcountReducer}</Text>
                        </Block>
                    </Block>
                    <Block
                        flex={0.5}
                        collumn
                        center
                        space="between"
                        style={{ paddingHorizontal: 30 }}
                    >
                        
                <Block flex={false} row center>
                    <Text caption bold primary style={{ paddingHorizontal: 10}}>
                        Level: {this.params.level}
                    </Text>
                    
                </Block>
                <Text caption light>
                            Organizer venmo:
                </Text>
                        <Text caption light>
                            {this.props.userVenmoReducer.venmo}
                </Text>
            
                    </Block>
                    <Block flex={1}>
                    </Block>
                    </ScrollView>
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

    togglePaidUnPaid(request, team) {
        console.log("This is toggle " , request)
        //console.log("THis is uuid ", this.params.uuid) 
        //console.log("Team ",team)
        let vpath = 'TeamsList/' + this.params.uuid + "/" + team + "/";
        let Paid = 'Paid';
        let unpaid = 'unpaid';
        let vstatus = ''
        let emmpty = "Empty";
        console.log("Reducer ", this.props.userDetailsReducer)
        console.log("Thunk ", this.props.userThunk)


        if (request.Name == emmpty || this.props.userDetailsReducer != this.params.organizer){
            console.log("EMpty or same guys");
        } else {

        
        try {
            
            var signupUid = this.uuidv4();
            firebase.database().ref('TeamsList/' + this.params.uuid + "/" + team).once('value', snapshot => {
                //console.log("toggle ", snapshot.val())

                snapshot.forEach( child => {
                    console.log("toggle child", child.val())
                    if (request.Name === child.val().Name) {
                        //console.log("Found ", child.val())
                        //console.log("Found ", child.key)
                        vpath += child.key
                        if (child.val().Paid === Paid){
                            console.log("Unpaid")
                            vstatus = "Unpaid";
                        } else {
                            vstatus = "Paid";
                        }
                    }
                })
               
            }).then(this.updateToggle(vpath, vstatus))
            
            .catch((error)=>{
                //error callback
                console.log('error ' , error)
            })
           
        
        
        
    } catch (e) {
        alert(e);
    }
}
    }

    updateToggle(vpath, vstatus){
        //console.log("Update ", vpath)
        firebase.database().ref(vpath).update({ Paid: vstatus });
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
                            
                            <TouchableOpacity activeOpacity={0.8} key={i} onPress={() => this.togglePaidUnPaid(request, "whiteTeam")}
                            >
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
                            <TouchableOpacity activeOpacity={0.8} key={i} onPress={() => this.togglePaidUnPaid(request, "blackTeam")} >
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

    } else {
        //console.log("Already exists");
        alert("You have already registered!")
    }

    }

    _deleteEvent(){
        var delEventuuid = ''
        console.log("Event uuid", this.params.uuid)
        var ref = firebase.database().ref('Events/');
        ref.orderByChild("uuid").equalTo(this.params.uuid).on("value", function(snapshot) {
            console.log("Snapshot from action " , snapshot.val())
            
            
            snapshot.forEach(child => {
                console.log("child ", child.key)
                delEventuuid = child.key
                
            })
          });
        var remRef = firebase.database().ref('Events/' + delEventuuid);
        remRef.remove()


        this.props.navigation.navigate('Main');
    }
        //eventNode = 
        //var adaRef = firebase.database().ref('Events/')
    
    
    deleteEvent() {

        if (this.props.userDetailsReducer != this.params.organizer){
            return(<Text>.</Text>);
        } else {
        return(
            <TouchableOpacity
            onPress={() => this._deleteEvent()}
              style = {styles.signup_button}
            >
              <Text style = {styles.signup_text}>
                DELETE
              </Text>
            </TouchableOpacity>
        );
        }
    }


    render() {
       console.log("helasdf ", this.params)
        
        if (this.props.teamListFetchReducer.isFetching) {
            return(
                <ActivityIndicator size="large" color ="0000ff"/>
            ) 
        } else {
        return (
            <SafeAreaView style={styles.safe} >
            <ScrollView>
                {this.renderHeader()}
                {this.renderRequestsRedux()}
                {this.deleteEvent()}
               
                {/*    
                    
                    {this.renderRequests()} 
                <RenderRequestsList uuid={this.params.uuid} />
                */}
                </ScrollView>
            </SafeAreaView>
 
        );
            }
    }
}



export default connect(
    state=>({ teamListFetchReducer: state.teamListFetchReducer, blackTeamReducer: state.blackTeamReducer, whiteTeamReducer: state.whiteTeamReducer, 
        balanceTeamsReducer: state.balanceTeamsReducer, userThunk: state.userReducer, list: state.listReducer, userDetailsReducer: state.userDetailsReducer, 
        eventcountReducer: state.eventcountReducer, updateCountReducer: state.updateCount, eventListReducer: state.eventListReducer, userVenmoReducer: state.userVenmoReducer}), 
    { getListThunk, getUserDetailsThunk, getEventCountThunk, updateCount, getAllEvents, getUserThunk, getListBalanced }
  )(Event);


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: "#F6F5F5"
    },
    container: {
        zIndex: 1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A62C23',
    },

    safe: {
        zIndex: 1,
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
        zIndex: 1,
        padding: 20,
        marginBottom: 20
    },
    requestStatus: {
        zIndex: 1,
        marginRight: 20,
        overflow: "hidden",
        height: 90
    },
    welcome: {
        zIndex: 1,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
    instructions: {
        zIndex: 1,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    signupTextCont: {
        zIndex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#455a64',
    },
    signupText: {
        zIndex: 1,
        color: 'white',
        fontWeight: 'bold'
    },
    button: {
        zIndex: 1,
        backgroundColor: '#3A3232',
        width: 300,
        borderRadius: 25,
        paddingVertical: 10
    },
    buttonText: {
        zIndex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    },
    requestsHeader: {
        zIndex: 1,
        paddingHorizontal: 20,
        paddingBottom: 15
      },
      signup_button: {
        backgroundColor: '#C4DE9F',
        width: "100%",
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
      },
      signup_text: {
        color: '#000',
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 10
      },
});
