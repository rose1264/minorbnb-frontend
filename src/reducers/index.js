import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import listingsReducer from './listingsReducer';
import neighbourhoodsReducer from './neighbourhoodsReducer';
import tripsReducer from './tripsReducer';
import reservationsReducer from './reservationsReducer';

export default combineReducers({
  usersReducer: usersReducer,
  listingsReducer: listingsReducer,
  neighbourhoodsReducer: neighbourhoodsReducer,
  tripsReducer: tripsReducer,
  reservationsReducer: reservationsReducer,
})
