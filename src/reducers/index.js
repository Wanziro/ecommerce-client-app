import {combineReducers} from 'redux';
import currentUser from './currentUser';
import products from './products';
import suppliers from './suppliers';
import cart from './cart';
import locations from './locations';
const rootReducer = combineReducers({
  currentUser,
  products,
  suppliers,
  cart,
  locations,
});

export default rootReducer;
