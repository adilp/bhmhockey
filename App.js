import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';


import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Signup from './src/pages/Signup';
import Firebase from './src/Firebase';
import Event from './src/pages/Event';
import AuthLoading from './src/pages/AuthLoading';


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
//   constructor(props){
//   super(props);
//     this.state = {
//       user:{},
//     }
// }

// componentDidMount(){
  
// }

// authListner() {
//   Config.auth().onAuthStateChanged((user) => {
//     if (user) {
//       this.setState({ user });
//     } else {
//       this.setState({user: null});
//     }
//   });
// }


  render() {
     //Check user state render conditionally either login page or home page
      // if (this.state.isUserAuthenticated == true) {
      //   return(<AppContainerHome />);
        
      // } else {
         return(<AppContainer />);
      // }
  }
}



//If user is not logged in
const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Schedules',  // Title to appear in status bar
      headerLeft: <Button onPress={() => props.navigation.navigate('DrawerOpen')} title= "=" />
    })
    
  },
  Signup: { 
    screen: Signup,
    navigationOptions: {
      //title: 'Registration'
      header: null
    }
  },
  Main: {
    screen: Home,
    navigationOptions: {
      header: null,
    }
  },
  Event: {
    screen: Event,
    navigationOptions: {
      title: "Pickup",
    }
  }
});

const AppContainer = createAppContainer(AppStackNavigator);

//If user is logged in redirect to home page
const AppStackNavigatorHome = createStackNavigator({
  Home: Home,
  Signup: { 
    screen: Signup,
    navigationOptions: {
      title: 'Registration'
    }
  },
});

const AppContainerHome = createAppContainer(AppStackNavigatorHome);

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
