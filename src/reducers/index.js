import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import listingsReducer from './listingsReducer';
import neighbourhoodsReducer from './neighbourhoodsReducer';

export default combineReducers({
  usersReducer: usersReducer,
  listingsReducer: listingsReducer,
  neighbourhoodsReducer: neighbourhoodsReducer,
})
