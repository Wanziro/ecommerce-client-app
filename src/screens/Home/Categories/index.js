import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {imageUrl} from '../../../constants/app';
import colors from '../../../constants/colors';
import PlaceHolder from './PlaceHolder';
function Categories() {
  const {categories, loadingCategories, loadingCategoriesError} = useSelector(
    state => state.products,
  );
  return (
    <View>
      <Text style={{color: colors.BLACK, padding: 10}}>All Categories</Text>
      <View style={{marginBottom: 10}}>
        {loadingCategories && categories.length === 0 ? (
          <PlaceHolder />
        ) : (
          <>
            {categories.length > 0 ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                  }}>
                  {categories.map((item, i) => (
                    <View
                      key={i}
                      style={{marginRight: 10, alignItems: 'center'}}>
                      {item.image === '' ? (
                        <Image
                          source={require('../../../../assets/placeholder_image.jpg')}
                          style={{width: 60, height: 60, borderRadius: 100}}
                        />
                      ) : (
                        <Image
                          source={{uri: imageUrl + item.image}}
                          style={{width: 60, height: 60, borderRadius: 100}}
                        />
                      )}
                      <Text style={{color: colors.BLACK}}>{item.name}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <>
                {loadingCategoriesError == '' ? (
                  <Text>No categories found</Text>
                ) : (
                  <Text>{loadingCategoriesError}</Text>
                )}
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
}

export default Categories;
