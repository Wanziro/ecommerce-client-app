import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function PlaceHolder() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
      }}>
      <View style={{marginRight: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 65, width: 65, borderRadius: 100}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginRight: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 65, width: 65, borderRadius: 100}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginRight: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 65, width: 65, borderRadius: 100}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginRight: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 65, width: 65, borderRadius: 100}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginRight: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 65, width: 65, borderRadius: 100}}></View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
}

export default PlaceHolder;
