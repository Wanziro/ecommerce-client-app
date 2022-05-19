import React, {useEffect} from 'react';
import {View, Text, StatusBar, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../constants/colors';
import {useLoadBasicData} from '../../helpers';
import PlaceHolder from './PlaceHolder';
import ProductItem from './ProductItem';
function Home({navigation}) {
  const dispatch = useDispatch();
  const {products, loadingProducts} = useSelector(state => state.products);
  const loadBasicData = useLoadBasicData();
  useEffect(() => {
    loadBasicData();
  }, []);
  return (
    <>
      <StatusBar backgroundColor={colors.WHITE} barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          paddingHorizontal: 10,
        }}>
        <View>
          {products.length === 0 && loadingProducts ? (
            <FlatList
              data={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
              showsVerticalScrollIndicator={false}
              renderItem={(item, index) => <PlaceHolder index={index} />}
              numColumns={2}
              style={{padding: 10}}
              refreshing={false}
            />
          ) : (
            <>
              {products.length > 0 ? (
                <FlatList
                  data={products}
                  showsVerticalScrollIndicator={false}
                  renderItem={(item, index) => (
                    <ProductItem item={item} navigation={navigation} />
                  )}
                  numColumns={2}
                  style={{padding: 10}}
                  refreshing={false}
                  onRefresh={() => loadBasicData()}
                />
              ) : (
                <Text>No products found</Text>
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
}

export default Home;
