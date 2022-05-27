export const ADD_LOCATION = 'ADD_LOCATION';
export const REMOVE_LOCATION = 'REMOVE_ITEM';
export const RESET_LOCATIONS = 'RESET_LOCATIONS';
export const SET_SELECTED_LOCATION = 'SET_SELECTED_LOCATION';

export const addLocation = location => dispatch => {
  dispatch({
    type: ADD_LOCATION,
    payload: location,
  });
};

export const removeLocation = location => dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    payload: location,
  });
};

export const setSelectedLocation = location => dispatch => {
  dispatch({
    type: SET_SELECTED_LOCATION,
    payload: location,
  });
};

export const resetLocations = () => dispatch => {
  dispatch({
    type: RESET_LOCATIONS,
  });
};
