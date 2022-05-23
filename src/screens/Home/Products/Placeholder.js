import React from 'react';
import {View, Dimensions, Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../../constants/colors';

const width = Dimensions.get('window').width;

function PlaceHolder() {
  return (
    <>
      <View
        style={{
          backgroundColor: colors.WHITE,
          padding: 10,
          borderRadius: 10,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 80, width: 80, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
        <View style={{flex: 1, marginHorizontal: 10}}>
          <SkeletonPlaceholder speed={900}>
            <View style={{height: 20, width: width - (80 + 60)}}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 100),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 170),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.WHITE,
          padding: 10,
          borderRadius: 10,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 80, width: 80, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
        <View style={{flex: 1, marginHorizontal: 10}}>
          <SkeletonPlaceholder speed={900}>
            <View style={{height: 20, width: width - (80 + 60)}}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 100),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 170),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.WHITE,
          padding: 10,
          borderRadius: 10,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 80, width: 80, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
        <View style={{flex: 1, marginHorizontal: 10}}>
          <SkeletonPlaceholder speed={900}>
            <View style={{height: 20, width: width - (80 + 60)}}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 100),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 170),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.WHITE,
          padding: 10,
          borderRadius: 10,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 80, width: 80, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
        <View style={{flex: 1, marginHorizontal: 10}}>
          <SkeletonPlaceholder speed={900}>
            <View style={{height: 20, width: width - (80 + 60)}}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 100),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 170),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.WHITE,
          padding: 10,
          borderRadius: 10,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 80, width: 80, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
        <View style={{flex: 1, marginHorizontal: 10}}>
          <SkeletonPlaceholder speed={900}>
            <View style={{height: 20, width: width - (80 + 60)}}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 100),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 170),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.WHITE,
          padding: 10,
          borderRadius: 10,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <SkeletonPlaceholder speed={900}>
          <View style={{height: 80, width: 80, borderRadius: 10}}></View>
        </SkeletonPlaceholder>
        <View style={{flex: 1, marginHorizontal: 10}}>
          <SkeletonPlaceholder speed={900}>
            <View style={{height: 20, width: width - (80 + 60)}}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 100),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={900}>
            <View
              style={{
                height: 20,
                width: width - (80 + 170),
                marginTop: 10,
              }}></View>
          </SkeletonPlaceholder>
        </View>
      </View>
    </>
  );
}

export default PlaceHolder;
