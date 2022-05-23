export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const RESET_CART = 'RESET_CART';
export const UPDATE_CART = 'UPDATE_CART';

export const addToCart = item => dispatch => {
  dispatch({
    type: ADD_ITEM,
    payload: item,
  });
};

export const removeItemFromCart = productId => dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    payload: productId,
  });
};

export const updateCartItem = item => dispatch => {
  dispatch({
    type: UPDATE_CART,
    payload: item,
  });
};

export const resetCart = () => dispatch => {
  dispatch({
    type: RESET_CART,
  });
};
