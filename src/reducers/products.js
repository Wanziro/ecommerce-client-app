import {
  SET_PRODUCTS,
  SET_CATEGORIES,
  SET_SUBCATEGORIES,
  SET_LOADING_PRODUCTS,
  SET_LOADING_PRODUCTS_FAILURE,
} from '../actions/products';

const initialState = {
  loadingProducts: true,
  loadingError: '',
  products: [],
  categories: [],
  subCategories: [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.payload};
    case SET_CATEGORIES:
      return {...state, categories: action.payload};
    case SET_SUBCATEGORIES:
      return {...state, subCategories: action.payload};
    case SET_LOADING_PRODUCTS:
      return {...state, loadingProducts: action.payload};
    case SET_LOADING_PRODUCTS_FAILURE:
      return {...state, loadingErrors: action.payload};
    default:
      return state;
  }
};

export default products;
