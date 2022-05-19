import {combineReducers} from 'redux';
import currentUser from './currentUser';
import products from './products';

const rootReducer = combineReducers({
  currentUser,
  products,
});

export default rootReducer;
