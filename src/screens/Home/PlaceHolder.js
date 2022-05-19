import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('window').width;

function PlaceHolder({index}) {
  if (index % 2 === 0) {
    return (
      <View style={{marginBottom: 15, width: width / 2 - 30}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 150, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
    );
  } else {
    return (
      <View style={{marginRight: 15, marginBottom: 15, width: width / 2 - 30}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 150, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
    );
  }
}

export default PlaceHolder;
