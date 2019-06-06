
import { BALANCE_TEAMS, FETCH_BEGIN, FETCH_SUCCESS } from '../actions/types';


// const INITIAL_STATE = {
//     arr:[],
//     loading: true
// };

const INITIAL_STATE = {
    arr: [],
  }

const balanceTeamsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BALANCE_TEAMS:
            console.log("balance teams reducer ", action.payload)
          return action.payload;
        default:
          return state;
      }
}

export default balanceTeamsReducer;