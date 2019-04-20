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



class Home extends Component {
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
                            Pickup schedule
                        </Text>
                        
                    </Block>
                </Block>
                <Block card shadow color="white" style={styles.headerChart}>
                    <Block collumn center>
                    
                        <Text h3> Monday 4/15/19 </Text>
                        <Text h3> 7:00pm </Text>
                        
                    </Block>
                    <Block row space="between" style={{ paddingHorizontal: 30 }}>
                        <Block flex={false} row center>
                            <Text caption bold tertiary>Level: </Text>
                            <Text h1 style={{ paddingHorizontal: 10 }}>
                                B
                  </Text>
                        </Block>

                        <Block flex={false} row center>
                            <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                                Spots Available:
                  </Text>
                            <Text h1>3</Text>
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
                            Adil
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
                            {request.spots}
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
                <Block flex={false} row space="between" style={styles.requestsHeader}>
                    <Text light>Upcoming games</Text>
                </Block>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {requests.map(request => (
                        <TouchableOpacity activeOpacity={0.8} key={`request-${request.id}`} onPress={() => this.props.navigation.navigate('Event', {
                            id: request.id,
                            spots: request.spots,
                            date: request.date,
                            puckdrop: request.puckdrop,
                            level: request.level,
                            organizer: request.organizer,
                            availability: request.availability,

                          })}>
                            {this.renderRequest(request)}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
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


export default Home;

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

});
