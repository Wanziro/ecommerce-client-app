import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import colors from '../../constants/colors';
import {useLoadBasicData} from '../../helpers';
import Categories from './Categories';
import Products from './Products';

function Home() {
  const loadData = useLoadBasicData();
  useEffect(() => {
    loadData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BACKGROUND_COLOR}}>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Categories />
          <Products />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Home;
