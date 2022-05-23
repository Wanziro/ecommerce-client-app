import Axios from 'axios';
import {backendUrl} from '../constants/app';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_LOADING_CATEGORIES = 'SET_LOADING_CATEGORIES';
export const SET_LOADING_CATEGORIES_ERROR = 'SET_LOADING_CATEGORIES_ERROR';
export const SET_LOADING_SUB_CATEGORIES = 'SET_LOADING_CATEGORIES';
export const SET_LOADING_SUB_CATEGORIES_ERROR = 'SET_LOADING_CATEGORIES_ERROR';
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
export const setLoadingCategories = value => dispatch => {
  dispatch({
    type: SET_LOADING_CATEGORIES,
    payload: value,
  });
};
export const setLoadingCategoriesError = value => dispatch => {
  dispatch({
    type: SET_LOADING_CATEGORIES_ERROR,
    payload: value,
  });
};
export const setLoadingProductsFailure = value => dispatch => {
  dispatch({
    type: SET_LOADING_PRODUCTS_FAILURE,
    payload: value,
  });
};

export const setLoadingSubCategories = value => dispatch => {
  dispatch({
    type: SET_LOADING_SUB_CATEGORIES,
    payload: value,
  });
};
export const setLoadingSubCategoriesError = value => dispatch => {
  dispatch({
    type: SET_LOADING_SUB_CATEGORIES_ERROR,
    payload: value,
  });
};

export const fetchCategories = () => dispatch => {
  dispatch(setLoadingCategories(true));
  dispatch(setLoadingCategoriesError(''));
  Axios.get(backendUrl + '/getAllCategories')
    .then(res => {
      if (typeof res.data != 'string') {
        dispatch(setLoadingCategoriesError(''));
        dispatch(setCategories(res.data));
      } else {
        dispatch(setCategories([]));
      }
    })
    .catch(err => {
      dispatch(setLoadingCategoriesError(err.message));
      console.log('error while fetching categories');
      console.log(err);
    });
};

export const fetchSubCategories = () => dispatch => {
  dispatch(setLoadingSubCategories(true));
  dispatch(setLoadingSubCategoriesError(''));
  Axios.get(backendUrl + '/getAllSubCategories')
    .then(res => {
      dispatch(setLoadingSubCategories(false));
      if (typeof res.data != 'string') {
        dispatch(setSubCategories(res.data));
      } else {
        dispatch(setSubCategories([]));
      }
    })
    .catch(err => {
      dispatch(setLoadingSubCategoriesError(err.message));
      console.log('error while fetching sub categories');
      console.log(err);
    });
};

export const fetchProducts = () => (dispatch, getState) => {
  const {selectedSupplier} = getState().suppliers;
  dispatch(setLoadingProductsFailure(''));
  dispatch(setLoadingProducts(true));
  Axios.post(backendUrl + '/getAllProducts', {supplierId: selectedSupplier.id})
    .then(res => {
      dispatch(setLoadingProducts(false));
      if (res.data.type == 'success') {
        dispatch(setProducts(res.data.products));
        dispatch(setLoadingProductsFailure(''));
      } else {
        dispatch(
          setLoadingProductsFailure('No products found from chosen supplier'),
        );
      }
    })
    .catch(err => {
      dispatch(setLoadingProducts(false));
      dispatch(setLoadingProductsFailure(err.message));
      console.log('error while fetching products');
      console.log(err);
    });
};
