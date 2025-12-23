import React from 'react';
import { View } from 'react-native';
import { List, Text } from 'react-native-paper';

import { RADIO_STYLE } from './radio-style';
import { COLORS } from '../../assets/styles/imports/variables';
import Radio from './radio';

type RadioItem = {
  name: string;
  optionName: string;
  isSelected: boolean;
};

export interface RadioListProps {
  data: RadioItem[];
  onChange: (value: string, event?: unknown, updated?: RadioItem[]) => void;
}

const RadioList: React.FC<RadioListProps> = ({ data, onChange }) => {
  const handleChange = (value: string) => () => {
    const nextData = data.map(entry => ({
      ...entry,
      isSelected: entry.name === value,
    }));

    onChange(value, undefined, nextData);
  };

  return (
    <View style={[RADIO_STYLE.listItemWrap]}>
      {data.map((item, index) => (
        <List.Item
          key={index}
          title={
            <Text
              style={[
                RADIO_STYLE.listTitle,
                item.isSelected && RADIO_STYLE.listTitleActive,
              ]}
            >
              {item.optionName}
            </Text>
          }
          titleStyle={RADIO_STYLE.listTitle}
          left={() => (
            <View style={[RADIO_STYLE.listLeftItem]}>
              <Radio
                color={COLORS.greenColor}
                checked={item.isSelected}
                onChange={handleChange(item.name)}
              />
            </View>
          )}
          style={[RADIO_STYLE.list, item.isSelected && RADIO_STYLE.listActive]}
          onPress={handleChange(item.name)}
          rippleColor={COLORS.rippleColor}
        />
      ))}
    </View>
  );
};

export default RadioList;
