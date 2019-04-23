import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';


import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Signup from './src/pages/Signup';
import Firebase from './src/Firebase';
import Event from './src/pages/Event';
import AuthLoading from './src/pages/AuthLoading';
import Settings from './src/pages/Settings';
import NewEvent from './src/pages/NewEvent';


interface AppState {
  authStatusReported: boolean,
  isUserAuthenticated: Boolean,
}

export default class App extends React.Component {

  constructor(props) {
    super(props);

}
  state: AppState = {
    authStatusReported: false,
    isUserAuthenticated: false,
  }
componentWillMount(){
  Firebase.init();
  console.log("componentwillMount");
  
  Firebase.auth.onAuthStateChanged(user => {
    if (user) {
      this.setState({
        isUserAuthenticated: true
      });
      console.log("in");
    } else {
      this.setState({
        isUserAuthenticated: false
      });
      console.log("out");

    }
  })
}

  render() {
     
         return(<AppContainer />);
      
  }
}

const HomeTabNavigator = createBottomTabNavigator({
  Home,
  Settings
});


//If user is not logged in
const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Login, 
    navigationOptions: {
      //title: 'Registration',
      header: null
    } 
  },
  Signup: { 
    screen: Signup,
    navigationOptions: {
      //title: 'Registration',
      //header: null
    }
  },
  Main: {
    screen: HomeTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  Event: {
    screen: Event,
    navigationOptions: {
      title: "Pickup",
    }
  },
  NewEvent: {
    screen: NewEvent,
    navigationOptions: {
      title: "New Event"
    }
  }
});

const AppContainer = createAppContainer(AppStackNavigator);


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3D3C4C'
  },

  WelcomeHeading: {
      fontSize: 40,
      marginBottom: 20
  },

  subtext: {
      fontSize: 12
  },

  buttonStyle: {
      marginTop: 10,
  }
});
