import React from 'react';
import { View } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';

import { RADIO_STYLE } from './radio-style';
import { COLORS } from '../../assets/styles/imports/variables';
import { GLOBAL_ICON } from '../../assets/images/global-images';

export interface RadioProps {
  color?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Radio: React.FC<RadioProps> = ({
  color = COLORS.greenColor,
  checked = true,
  onChange = () => {},
}) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <View style={[RADIO_STYLE.radioBoxWrap]}>
      <TouchableRipple
        onPress={handleChange}
        style={[RADIO_STYLE.radioBoxWrap, checked && RADIO_STYLE.radioWrapActive]}
      >
        <>{checked && <IconButton icon={GLOBAL_ICON.fillCircle} size={16} iconColor={color} />}</>
      </TouchableRipple>
    </View>
  );
};

export default Radio;
