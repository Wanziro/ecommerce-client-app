import {ISO_8601} from 'moment';
import {
  SET_SUPPLIERS,
  SET_SELECTED_SUPPLIER,
  SET_IS_LOADING_SUPPLIERS,
  SET_IS_LOADING_SUPPLIERS_FAILURE,
} from '../actions/suppliers';

const initialState = {
  isLoading: true,
  supplierError: '',
  selectedSupplier: null,
  suppliers: [],
};

const suppliers = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUPPLIERS:
      return {...state, suppliers: action.payload};
    case SET_SELECTED_SUPPLIER:
      return {...state, selectedSupplier: action.payload};
    case SET_IS_LOADING_SUPPLIERS:
      return {...state, isLoading: action.payload};
    case SET_IS_LOADING_SUPPLIERS_FAILURE:
      return {...state, supplierError: action.payload};
    default:
      return state;
  }
};

export default suppliers;
