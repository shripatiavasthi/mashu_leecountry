import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { List } from 'react-native-paper';

import { BTN_STYLE } from './btn-style';

export interface IconTextBtnProps {
  title: string;
  icon: any;
  iconColor?: string;
  color?: string;
  bgColor?: string;
  onPress?: () => void;
}

const IconTextBtn: React.FC<IconTextBtnProps> = ({
  title,
  icon,
  iconColor,
  color,
  bgColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ ...BTN_STYLE.cardBtn, backgroundColor: bgColor }}
      onPress={onPress}
    >
      <List.Icon style={BTN_STYLE.btnIcon} color={iconColor} icon={icon} />
      <Text style={{ ...BTN_STYLE.cardBtnLabel, color }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default IconTextBtn;
