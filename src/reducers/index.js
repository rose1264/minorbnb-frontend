import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import listingsReducer from './listingsReducer';

export default combineReducers({
  usersReducer: usersReducer,
  listingsReducer: listingsReducer
})
