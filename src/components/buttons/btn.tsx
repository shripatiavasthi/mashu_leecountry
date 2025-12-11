import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Button } from 'react-native-paper';
import type { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

import {
  FONT_SIZE_16,
  FONT_SIZE_10,
  FONT_SIZE_14,
} from '../../assets/styles/imports/typography';
import { BTN_STYLE } from './btn-style';
import { COLORS } from '../../assets/styles/imports/variables';

type BtnSize = 'default' | 'medium' | 'small';

export interface BtnProps {
  mode?: 'text' | 'outlined' | 'contained';
  color?: string;
  label?: string;
  size?: BtnSize;
  lablestyle?: TextStyle;        // ← keep old prop
  textColor?: string;            // ← add support for dynamic text color
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  uppercase?: boolean;
  icon?: IconSource | ((props: { size: number; color: string }) => React.ReactNode) | React.ReactNode;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Btn: React.FC<BtnProps> = ({
  mode = 'contained',
  color = '',
  label = '',
  size = 'default',
  lablestyle,
  textColor,
  style,
  contentStyle,
  uppercase = true,
  icon,
  onPress = () => {},
  loading = false,
  disabled = false,
}) => {

  const fontSize = (btnSize: BtnSize): number => {
    switch (btnSize) {
      case 'medium': return FONT_SIZE_14;
      case 'small': return FONT_SIZE_10;
      default: return FONT_SIZE_16;
    }
  };

  const heightSize = (btnSize: BtnSize): number => {
    switch (btnSize) {
      case 'medium': return 38;
      case 'small': return 32;
      default: return 45;
    }
  };

  return (
    <Button
      mode={mode}
      buttonColor={disabled ? COLORS.greyColor : color}
      textColor={textColor}                        // ← Correctly supports override
      theme={{ roundness: 26 }}
      contentStyle={[
        { height: heightSize(size) },
        contentStyle,
      ]}
      labelStyle={[
        BTN_STYLE.label,
        { fontSize: fontSize(size) },
        lablestyle,                                 // ← Your override kept LAST
      ]}
      uppercase={uppercase}
      icon={icon as any}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[
        style,
        mode === 'outlined' && {
          borderColor: disabled ? COLORS.borderColor : color,
          borderWidth: 1,
        },
      ]}
    >
      {label}
    </Button>
  );
};

export default Btn;
