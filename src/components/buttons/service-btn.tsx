import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';

import { BTN_STYLE } from './btn-style';
import { COLORS } from '../../assets/styles/imports/variables';

export interface ServiceBtnProps {
  contentStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: TextStyle;
  color?: string;
  gradientColor?: string[];
  icon?: React.ReactNode;
  onPress?: () => void;
}

const ServiceBtn: React.FC<ServiceBtnProps> = ({
  contentStyle,
  label = '',
  labelStyle,
  color = COLORS.whiteColor,
  gradientColor = [COLORS.violetColor, COLORS.darkVioletColor],
  icon,
  onPress = () => {},
}) => {
  return (
    <View style={[BTN_STYLE.gradientBtnWrap]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={gradientColor} style={contentStyle as any}>
          {icon}
          <Text style={[labelStyle, { color }]} numberOfLines={2}>
            {label}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ServiceBtn;
