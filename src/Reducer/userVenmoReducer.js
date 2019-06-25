import { GET_USER_VENMO } from '../actions/types';
const INITIAL_STATE = {
    userDetails: [],
    venmo: ''
};



const userVenmoReducer = (state = INITIAL_STATE, action) => {
    

    switch (action.type){
        case GET_USER_VENMO:
            console.log("Venmo details ", action.payload);
            return action.payload;
        default:
        console.log("default ");
            return state;
    }

};

export default userVenmoReducer;