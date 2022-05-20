import {
  SET_PRODUCTS,
  SET_CATEGORIES,
  SET_SUBCATEGORIES,
  SET_LOADING_PRODUCTS,
  SET_LOADING_PRODUCTS_FAILURE,
  SET_LOADING_CATEGORIES,
  SET_LOADING_CATEGORIES_ERROR,
  SET_LOADING_SUB_CATEGORIES,
  SET_LOADING_SUB_CATEGORIES_ERROR,
} from '../actions/products';

const initialState = {
  loadingProducts: true,
  loadingCategories: true,
  loadingCategoriesError: '',
  loadingSubCategories: true,
  loadingSubCategoriesError: '',
  loadingProductsError: '',
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
      return {...state, loadingProductsError: action.payload};
    case SET_LOADING_CATEGORIES:
      return {...state, loadingCategories: action.payload};
    case SET_LOADING_CATEGORIES_ERROR:
      return {...state, loadingCategoriesError: action.payload};
    case SET_LOADING_SUB_CATEGORIES:
      return {...state, loadingSubCategories: action.payload};
    case SET_LOADING_SUB_CATEGORIES_ERROR:
      return {...state, loadingSubCategories: action.payload};
    default:
      return state;
  }
};

export default products;
