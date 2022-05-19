import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('window').width;

function PlaceHolder() {
  return (
    <>
      <View style={{marginVertical: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginVertical: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginVertical: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginVertical: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginVertical: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginVertical: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginVertical: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginVertical: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginVertical: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginVertical: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
      <View style={{marginVertical: 10}}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 50, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
      </View>
    </>
  );
}

export default PlaceHolder;
