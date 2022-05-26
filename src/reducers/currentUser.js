import {
  SET_CURRENT_USER_NAMES,
  SET_CURRENT_USER_ID,
  SET_CURRENT_USER_PHONE,
  SET_CURRENT_USER_EMAIL,
  SET_CURRENT_USER_ADDRESS,
  RESET_CURRENT_USER,
} from '../actions/currentUser';

const initialState = {
  id: '',
  name: '',
  phone: '',
  email: '',
  address: '',
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_NAMES:
      return {...state, name: action.payload};
    case SET_CURRENT_USER_ID:
      return {...state, id: action.payload};
    case SET_CURRENT_USER_PHONE:
      return {...state, phone: action.payload};
    case SET_CURRENT_USER_EMAIL:
      return {...state, email: action.payload};
    case SET_CURRENT_USER_ADDRESS:
      return {...state, address: action.payload};
    case RESET_CURRENT_USER:
      return {
        id: '',
        name: '',
        phone: '',
        email: '',
        address: '',
      };
    default:
      return state;
  }
};

export default currentUser;
