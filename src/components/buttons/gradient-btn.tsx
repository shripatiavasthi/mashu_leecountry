import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import { BTN_STYLE } from './btn-style';
import { COLORS } from '../../assets/styles/imports/variables';

export interface GradientBtnProps {
  contentStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: TextStyle;
  color?: string;
  gradientColor?: string[];
  icon?: React.ReactNode;
  onPress?: () => void;
  uppercase?: boolean;
}

const GradientBtn: React.FC<GradientBtnProps> = ({
  contentStyle,
  label = '',
  labelStyle,
  color = COLORS.whiteColor,
  gradientColor = [COLORS.violetColor, COLORS.darkVioletColor],
  icon,
  onPress = () => {},
  uppercase = true,
}) => {
  return (
    <View style={[BTN_STYLE.gradientBtnWrap]}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={gradientColor}>
        <Button
          contentStyle={contentStyle}
          buttonColor={color}
          labelStyle={[BTN_STYLE.label, labelStyle]}
          icon={icon ? () => icon : undefined}
          disabled={false}
          style={{ borderColor: color, borderWidth: 1 }}
          uppercase={uppercase}
          onPress={onPress}
        >
          {label}
        </Button>
      </LinearGradient>
    </View>
  );
};

export default GradientBtn;
