import {ADD_ITEM, REMOVE_ITEM, RESET_CART, UPDATE_CART} from '../actions/cart';

const initialState = {
  cart: [],
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {...state, cart: [...state.cart, action.payload]};
    case REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    case UPDATE_CART: {
      let index;
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].product.id == action.payload.product.id) {
          index = i;
          break;
        }
      }
      if (state.cart[index]) {
        const updatedCart = [...state.cart];
        updatedCart[index].quantity = action.payload.quantity;
        return {...state, cart: updatedCart};
      } else {
        return state;
      }
    }
    case RESET_CART:
      return {...state, cart: []};
    default:
      return state;
  }
};

export default cart;
