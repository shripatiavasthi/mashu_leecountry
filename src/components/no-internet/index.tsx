import React from 'react';
import { SafeAreaView, Text, View, ImageBackground } from 'react-native';

import { NO_INTERNET_STYLE } from './no-internet-style';
import { GLOBAL_ICON } from '../../assets/images/global-images';
import { COLORS } from '../../assets/styles/imports/variables';
import Btn from '../buttons/btn';

const NoInternet: React.FC = () => {
  const checkInternet = () => {
    alert('Please check your internet connection');
  };

  return (
    <SafeAreaView style={[NO_INTERNET_STYLE.safeAreaView]}>
      <View style={[NO_INTERNET_STYLE.upperContentWrap]} />
      <View style={[NO_INTERNET_STYLE.alertWrap]}>
        <ImageBackground source={GLOBAL_ICON.noInternet} style={[NO_INTERNET_STYLE.imageWrap]} />
        <View style={[NO_INTERNET_STYLE.textWrapContainer]}>
          <Text style={[NO_INTERNET_STYLE.text]}>
            Oops! Looks like your device is not connected to the internet
          </Text>
        </View>
        <View style={[NO_INTERNET_STYLE.btnWrap]}>
          <Btn
            label="Retry"
            color={COLORS.secondaryColor}
            size="medium"
            onPress={checkInternet}
            contentStyle={{ marginRight: -6, marginLeft: -12 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoInternet;
