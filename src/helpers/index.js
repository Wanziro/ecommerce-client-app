import {formatCurrency} from 'react-native-format-currency';
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

export const formatMoney = number => {
  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
    formatCurrency({amount: Number(number), code: 'USD'});
  return valueFormattedWithoutSymbol;
};

export const calculateCartTotal = cart => {
  if (cart.length > 0) {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].product.price * cart[i].quantity;
    }
    return total;
  } else {
    return 0;
  }
};
