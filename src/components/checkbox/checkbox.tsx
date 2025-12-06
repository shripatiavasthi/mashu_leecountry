import React from 'react';
import { View } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';

import { CHECKBOX_STYLE } from './checkbox-style';
import { COLORS } from '../../assets/styles/imports/variables';
import { GLOBAL_ICON } from '../../assets/images/global-images';

export interface CheckBoxProps {
  color?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  color = COLORS.greenColor,
  checked = true,
  onChange = () => {},
}) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <View style={[CHECKBOX_STYLE.checkBoxWrap]}>
      <TouchableRipple
        onPress={handleChange}
        style={[CHECKBOX_STYLE.checkBoxWrap, checked && CHECKBOX_STYLE.checkBoxWrapActive]}
      >
        <>{checked && <IconButton icon={GLOBAL_ICON.tick} size={16} iconColor={color} />}</>
      </TouchableRipple>
    </View>
  );
};

export default CheckBox;
