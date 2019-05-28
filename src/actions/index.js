import * as firebase from "firebase";
import { GET_LIST, GET_USER, GET_USER_DETAILS } from './types';
//export const getList = (teams) => ({type: GET_LIST, payload: teams})


export const getListThunk = (uuid) => {
    return (dispatch) => {
        const teams = [];
        const teamsObj = {};
        var that = this;
        console.log("uuid thunk ", uuid);
        var ref = firebase.database().ref('SignUp/' + uuid);
        

        ref.on('value', function (snapshot) {
            console.log("snap ", snapshot.val())
            snapshot.forEach(function (child) {
            
                let currentlike = child.val()
                    console.log("schedas ", currentlike)
                    teams.push(currentlike);
                    console.log("teams ",teams);
            });
            dispatch({ type: GET_LIST, payload: teams})
        })
    }
    
}

export const getUserThunk = () => {
    currentUser = firebase.auth().currentUser.uid;

        
            console.log("Dispatching get user")
           return { type: GET_USER, payload: currentUser};
       
    
}

export const getUserDetailsThunk = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
      firebase.database().ref(`/UsersList/${currentUser.uid}`)
        .on('value', snapshot => {
            let firstName = (snapshot.val() && snapshot.val().firstname)
            let lastName = (snapshot.val() && snapshot.val().lastname)
            console.log("FirstName ",  firstName)
            fullname = firstName + " " + lastName
            console.log("Full name thunk ", fullname)
          dispatch({ type: GET_USER_DETAILS, payload: fullname });
        });
    };
  };