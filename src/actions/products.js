import Axios from 'axios';
import {backendUrl} from '../constants/app';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SUBCATEGORIES = 'SET_SUBCATEGORIES';
export const SET_LOADING_PRODUCTS = 'SET_LOADING_PRODUCTS';
export const SET_LOADING_PRODUCTS_FAILURE = 'SET_LOADING_PRODUCTS_FAILURE';

export const setProducts = products => dispatch => {
  dispatch({
    type: SET_PRODUCTS,
    payload: products,
  });
};

export const setCategories = categories => dispatch => {
  dispatch({
    type: SET_CATEGORIES,
    payload: categories,
  });
};

export const setSubCategories = categories => dispatch => {
  dispatch({
    type: SET_SUBCATEGORIES,
    payload: categories,
  });
};

export const setLoadingProducts = value => dispatch => {
  dispatch({
    type: SET_LOADING_PRODUCTS,
    payload: value,
  });
};

export const setLoadingProductsFailure = value => dispatch => {
  dispatch({
    type: SET_LOADING_PRODUCTS,
    payload: value,
  });
};

export const fetchCategories = () => dispatch => {
  Axios.get(backendUrl + '/getAllCategories')
    .then(res => {
      if (typeof res.data != 'string') {
        dispatch(setCategories(res.data));
      } else {
        dispatch(setCategories([]));
      }
    })
    .catch(err => {
      console.log('error while fetching categories');
      console.log(err);
    });
};

export const fetchSubCategories = () => dispatch => {
  Axios.get(backendUrl + '/getAllSubCategories')
    .then(res => {
      if (typeof res.data != 'string') {
        dispatch(setSubCategories(res.data));
      } else {
        dispatch(setSubCategories([]));
      }
    })
    .catch(err => {
      console.log('error while fetching sub categories');
      console.log(err);
    });
};

export const fetchProducts = () => (dispatch, getState) => {
  const {email, id} = getState().currentUser;
  dispatch(setLoadingProductsFailure(''));
  dispatch(setLoadingProducts(true));
  Axios.post(backendUrl + '/getMyProducts', {email, userId: id})
    .then(res => {
      dispatch(setLoadingProducts(false));
      if (res.data.type == 'success') {
        dispatch(setProducts(res.data.products));
        dispatch(setLoadingProductsFailure(''));
      } else {
        dispatch(setLoadingProductsFailure(res.data.msg));
      }
    })
    .catch(err => {
      dispatch(setLoadingProducts(false));
      dispatch(setLoadingProductsFailure(err.message));
      console.log('error while fetching products');
      console.log(err);
    });
};
