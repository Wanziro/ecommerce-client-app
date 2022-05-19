export const SET_CURRENT_USER_NAMES = 'SET_CURRENT_USER_NAMES';
export const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';
export const SET_CURRENT_USER_PHONE = 'SET_CURRENT_USER_PHONE';
export const SET_CURRENT_USER_EMAIL = 'SET_CURRENT_USER_EMAIL';
export const SET_CURRENT_USER_ADDRESS = 'SET_CURRENT_USER_ADDRESS';
export const RESET_CURRENT_USER = 'RESET_CURRENT_USER';

export const setCurrentUserNames = names => dispatch => {
  dispatch({
    type: SET_CURRENT_USER_NAMES,
    payload: names,
  });
};

export const setCurrentUserId = id => dispatch => {
  dispatch({
    type: SET_CURRENT_USER_ID,
    payload: id,
  });
};

export const setCurrentUserPhone = phone => dispatch => {
  dispatch({
    type: SET_CURRENT_USER_PHONE,
    payload: phone,
  });
};

export const setCurrentUserEmail = email => dispatch => {
  dispatch({
    type: SET_CURRENT_USER_EMAIL,
    payload: email,
  });
};

export const setCurrentUserAddress = address => dispatch => {
  dispatch({
    type: SET_CURRENT_USER_ADDRESS,
    payload: address,
  });
};

export const resetCurrentUser = () => ({type: RESET_CURRENT_USER});
