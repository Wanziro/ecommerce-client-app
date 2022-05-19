import {combineReducers} from 'redux';
import currentUser from './currentUser';
import products from './products';
import suppliers from './suppliers';

const rootReducer = combineReducers({
  currentUser,
  products,
  suppliers,
});

export default rootReducer;
