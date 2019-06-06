import { combineReducers } from 'redux';
import listReducer from './listReducer';
import userReducer from './userReducer';
import userDetailsReducer from './userDetailsReducer';
import eventcountReducer from './eventcountReducer';
import eventListReducer from './eventListReducer';
import balanceTeamsReducer from './balanceTeamsReducer';

export default combineReducers({
    listReducer: listReducer,
    userReducer: userReducer,
    userDetailsReducer: userDetailsReducer,
    eventcountReducer: eventcountReducer,
    eventListReducer: eventListReducer,
    balanceTeamsReducer: balanceTeamsReducer,
});
