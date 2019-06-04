import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';


import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Signup from './src/pages/Signup';
//import Firebase from './src/Firebase';
import Event from './src/pages/Event';
import AuthLoading from './src/pages/AuthLoading';
import Settings from './src/pages/Settings';
import NewEvent from './src/pages/NewEvent';
import * as firebase from 'firebase';
import Api from './src/Api';
//import AuthLoading from './AuthLoading';  
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/Reducer';






export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
    }

    console.log(this.state.isAuthenticated);

    //Initialize
    if (!firebase.apps.length) {
      firebase.initializeApp(Api.FirebaseConfig)
    }

    
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

}

onAuthStateChanged = (user) => {
  this.setState({isAuthenticationReady: true});
  this.setState({isAuthenticated: !!user});
}

componentWillMount(){
  //Firebase.init();
  console.log("componentwillMount");
}

  render() {
    
     if (this.state.isAuthenticated) {
       return(
        //<Provider store={ createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
         <HomeAppContainer />
         //</Provider>
         );
     } 
     else {
      return(
        //<Provider store={ createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <AppContainer />
        //</Provider>
        );
     }
         
         
      
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
//If user logged in
const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeTabNavigator, 
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

const HomeAppContainer = createAppContainer(HomeStackNavigator);


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
