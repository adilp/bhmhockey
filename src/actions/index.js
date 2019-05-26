import * as firebase from "firebase";
import { GET_LIST } from './types';
//export const getList = (teams) => ({type: GET_LIST, payload: teams})


export const getListThunk = (uuid) => {
    return (dispatch) => {
        const teams = [];
        const teamsObj = {};
        var that = this;
        console.log("uuid thunk ", uuid);
        var ref = firebase.database().ref('SignUp/' + uuid);//"56194332-65eb-4f69-a8c1-12826f0e49ec");
        //var query = ref.orderByChild("uuid");
        //console.log("uuid thunk ", uuid);

        ref.on('value', function (snapshot) {
            console.log("snap ", snapshot.val())
            snapshot.forEach(function (child) {
            
                let currentlike = child.val()
                    console.log("schedas ", currentlike)
                    teams.push(currentlike);
                    //(teamsObj: {...teamsObj, currentlike}
                    // that.setState({ requestsState: [...that.state.requestsState, currentlike] })
                    // that.setState({ loading: true });
                    console.log("teams ",teams);

               

            });
            dispatch({ type: GET_LIST, payload: teams})
        })
        
        // ref.on('value', function (snap) {
        //     console.log("snap" ,snap.val()); // not logging
        // });
        
        // ref.once('value').then(function (snapshot) {
            
        //     snapshot.forEach(function (child) {
               
        //         let currentlike = child.val()
        //             console.log("sched ", currentlike)
        //             teams.push(currentlike);
        //             // that.setState({ requestsState: [...that.state.requestsState, currentlike] })
        //             // that.setState({ loading: true });
        //             console.log("teams ",teams);

               

        //     });
        // }).then(() => dispatch({ type: GET_LIST, payload: teams}))
    }
    
}