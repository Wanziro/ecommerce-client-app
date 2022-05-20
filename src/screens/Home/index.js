import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import colors from '../../constants/colors';
import {useLoadBasicData} from '../../helpers';
import Categories from './Categories';

function Home() {
  const loadData = useLoadBasicData();
  useEffect(() => {
    loadData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BACKGROUND_COLOR}}>
      <View style={{flex: 1}}>
        <Categories />
      </View>
    </SafeAreaView>
  );
}

export default Home;
