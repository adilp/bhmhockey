import { combineReducers } from 'redux';
import listReducer from './listReducer';
import userReducer from './userReducer';
import userDetailsReducer from './userDetailsReducer'

export default combineReducers({
    listReducer: listReducer,
    userReducer: userReducer,
    userDetailsReducer: userDetailsReducer,
});
