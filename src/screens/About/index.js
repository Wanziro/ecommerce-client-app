import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import colors from '../../constants/colors';
function About() {
  return (
    <>
      <StatusBar
        backgroundColor={colors.APPBAR_HEADER_COLOR}
        barStyle="light-content"
      />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.BACKGROUND_COLOR,
          padding: 10,
        }}>
        <Text>About</Text>
      </View>
    </>
  );
}

export default About;
