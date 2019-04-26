import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Button,
    SafeAreaView,
    ScrollView
} from "react-native";

import Form from '../components/Form';
import Firebase from "../Firebase";
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
            message: 'default click state'
          }
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
        const requests = [
            {
                id: 1,
                spots: "15",
                date: "Tuesday 4/16/19",
                puckdrop: "10pm",
                level: "B",
                organizer: "Adil Patel",
                time: 12,
                availability: "Available",
            },
            {
                id: 2,
                spots: "0",
                date: "Wednesday 4/17/19",
                puckdrop: "11pm",
                level: "All",
                organizer: "Brian",
                time: 22,
                availability: "Sold out",
            },
            {
                id: 3,
                spots: "1",
                date: "Wednesday 4/17/19",
                puckdrop: "9pm",
                level: "D",
                organizer: "Erik",
                time: 24,
                availability: "Available",
            },

        ];




        return (
            <Block flex={0.8} color="gray2" style={styles.requests}>
            <Block center>
                 <TouchableOpacity disabled={this.state.isDisabled} style={styles.button}>
                    
                        <Text style={styles.buttonText}> Register</Text>
    
                </TouchableOpacity>
                </Block>
                <Block flex={false} row space="between" style={styles.requestsHeader}>
                    <Text h3>White team:</Text>
                </Block>
                <Block row card shadow color="white" style={styles.request} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {requests.map(request => (
                        <TouchableOpacity activeOpacity={0.8} key={`request-${request.id}`}>
                            {this.renderRequest(request)}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                </Block>
                <Block flex={false} row space="between" style={styles.requestsHeader}>
                <Text h3>Black team:</Text>
            </Block>
                <Block row card shadow color="white" style={styles.request} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {requests.map(request => (
                        <TouchableOpacity activeOpacity={0.8} key={`request-${request.id}`}>
                            {this.renderRequest(request)}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                </Block>
            </Block>
        );
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
