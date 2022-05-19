import Axios from 'axios';
import {backendUrl} from '../constants/app';
export const SET_SUPPLIERS = 'SET_SUPPLIERS';
export const SET_SELECTED_SUPPLIER = 'SET_SELECTED_SUPPLIER';
export const SET_IS_LOADING_SUPPLIERS = 'SET_IS_LOADING_SUPPLIERS';
export const SET_IS_LOADING_SUPPLIERS_FAILURE =
  'SET_IS_LOADING_SUPPLIERS_FAILURE';

export const setSuppliers = sup => dispatch => {
  dispatch({
    type: SET_SUPPLIERS,
    payload: sup,
  });
};

export const setSelectedSupplier = sup => dispatch => {
  dispatch({
    type: SET_SELECTED_SUPPLIER,
    payload: sup,
  });
};

export const setIsLoadingSupplierFailure = sup => dispatch => {
  dispatch({
    type: SET_IS_LOADING_SUPPLIERS_FAILURE,
    payload: sup,
  });
};

export const setIsLoadingSupplier = sup => dispatch => {
  dispatch({
    type: SET_IS_LOADING_SUPPLIERS,
    payload: sup,
  });
};

export const fetchSuppliers = () => (dispatch, getState) => {
  dispatch(setIsLoadingSupplierFailure(''));
  dispatch(setIsLoadingSupplier(true));
  Axios.get(backendUrl + '/getAllSuppliers')
    .then(res => {
      dispatch(setIsLoadingSupplier(false));
      if (res.data.type == 'success') {
        dispatch(setSuppliers(res.data.suppliers));
        dispatch(setIsLoadingSupplierFailure(''));
      }
    })
    .catch(err => {
      dispatch(setIsLoadingSupplier(false));
      dispatch(setIsLoadingSupplierFailure(err.message));
      console.log('error while fetching suppliers');
      console.log(err);
    });
};
