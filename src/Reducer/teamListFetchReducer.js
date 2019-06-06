
import { GET_EVENT_LIST, FETCH_BEGIN, FETCH_SUCCESS } from '../actions/types';


const INITIAL_STATE = {
    isFetching: false,
}

const teamListFetchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BEGIN:
            console.log("begining fetch list")
          return {isFetching: true};
        case FETCH_SUCCESS:
          return { isFetching: false};
        default:
          return state;
      }
}

export default teamListFetchReducer;