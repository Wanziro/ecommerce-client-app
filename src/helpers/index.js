import {useDispatch} from 'react-redux';
import {
  fetchCategories,
  fetchProducts,
  fetchSubCategories,
} from '../actions/products';

//custom dispatcher hook
export const useLoadBasicData = () => {
  const dispatch = useDispatch();
  return payload => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  };
};
