import {
  ADD_LOCATION,
  REMOVE_LOCATION,
  RESET_LOCATIONS,
  SET_SELECTED_LOCATION,
} from '../actions/locations';

const initialState = {
  selectedLocation: null,
  locations: [],
};

const locations = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return {...state, locations: [...state.locations, action.payload]};
    case REMOVE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(item => item.id !== action.payload),
      };
    case SET_SELECTED_LOCATION:
      return {...state, selectedLocation: action.payload};
    case RESET_LOCATIONS:
      return {selectedLocation: null, locations: []};
    default:
      return state;
  }
};

export default locations;
