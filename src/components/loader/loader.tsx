import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { LOADER_STYLE } from './loader-style';
import { COLORS } from '../../assets/styles/imports/variables';

export interface LoaderProps {
  bgColor?: string;
}

const Loader: React.FC<LoaderProps> = ({ bgColor }) => {
  return (
    <View style={[LOADER_STYLE.container, { backgroundColor: bgColor }]}>
      <ActivityIndicator color={COLORS.violetColor} size="large" />
    </View>
  );
};

export default Loader;
