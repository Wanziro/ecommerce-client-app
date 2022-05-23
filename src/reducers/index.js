import {combineReducers} from 'redux';
import currentUser from './currentUser';
import products from './products';
import suppliers from './suppliers';
import cart from './cart';

const rootReducer = combineReducers({
  currentUser,
  products,
  suppliers,
  cart,
});

export default rootReducer;
