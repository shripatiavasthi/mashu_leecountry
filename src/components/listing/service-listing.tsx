import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';

import { LISTING_STYLE } from './listing-style';
import { COLORS } from '../../assets/styles/imports/variables';

export interface ServiceListingProps {
  contentStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: TextStyle;
  color?: string;
  gradientColor?: string[];
  icon?: React.ReactNode;
  iconArrow?: React.ReactNode;
  onPress?: () => void;
}

const ServiceListing: React.FC<ServiceListingProps> = ({
  contentStyle,
  label = '',
  labelStyle,
  color = COLORS.whiteColor,
  gradientColor = [COLORS.violetColor, COLORS.darkVioletColor],
  icon,
  iconArrow,
  onPress = () => {},
}) => {
  return (
    <View style={[LISTING_STYLE.gradientBtnWrap]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={gradientColor}
          style={contentStyle as any}
        >
          {icon}
          <Text style={[labelStyle, { color }]}>{label}</Text>
          {iconArrow}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceListing;
