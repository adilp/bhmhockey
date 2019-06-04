
import { GET_EVENT_LIST, FETCH_BEGIN, FETCH_SUCCESS } from '../actions/types';
const INITIAL_STATE = {
    arr:[],
    loading: false
};

const eventListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case GET_EVENT_LIST:
            console.log("action count11", action.payload);
            //return action.payload
            return state.arr.push(action.payload);
            // return { 
            //     ...state,
            //     arr: [...state.arr, action.payload]
            // }
        case FETCH_BEGIN:
         console.log("Begining")
            return {
                ...state,
                loading: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                loading:false
            }
        default:
        console.log("default ");
            return state;
    }
};

export default eventListReducer;