import { GET_LIST } from '../actions/types';
const INITIAL_STATE = {
    team: []
};

const listReducer = (state = INITIAL_STATE, action) => {
    

    switch (action.type){
        case GET_LIST:
            console.log("action ", action.payload);
       
            return action.payload;

            //return {...state, team: action.payload}
          
        default:
        console.log("default ");
            return state;
    }

};

export default listReducer;