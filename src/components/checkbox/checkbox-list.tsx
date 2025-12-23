import React, { useContext } from 'react';
import { View } from 'react-native';
import { List, Text } from 'react-native-paper';

import { CHECKBOX_STYLE } from './checkbox-style';
import { COLORS } from '../../assets/styles/imports/variables';
import CheckBox from './checkbox';
import { AuthContext } from '../../redux/store';

type CheckboxItem = {
  name: string;
  optionName: Record<string, string>;
  isSelected: boolean;
};

export interface CheckboxListProps {
  data: CheckboxItem[];
  onChange: (label: string, updated: CheckboxItem[]) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ data, onChange }) => {
  const authContext = useContext(AuthContext);
  const lang = authContext?.state?.language as string;

  const handleChange = (item: CheckboxItem) => {
    const parentChecked = item.name === 'all' && item.isSelected;

    const nextData = data.map(entry => ({ ...entry }));
    const allItem = nextData.find(x => x.name === 'all');

    nextData.forEach(entry => {
      if (item.name === 'all') {
        entry.isSelected = !parentChecked;
      } else if (item.name === entry.name) {
        entry.isSelected = !entry.isSelected;
        if (allItem && allItem.isSelected === !entry.isSelected) {
          allItem.isSelected = false;
        }
      }
    });

    if (item.name !== 'all' && allItem) {
      const checkedFilter = nextData.filter(x => x.name !== 'all' && x.isSelected);
      if (checkedFilter.length === nextData.length - 1) {
        allItem.isSelected = true;
      }
    }

    const label = item.optionName?.[lang] ?? Object.values(item.optionName)[0] ?? '';
    onChange(label, nextData);
  };

  return (
    <View style={[CHECKBOX_STYLE.listItemWrap]}>
      {data.map((item, index) => (
        <List.Item
          key={index}
          title={
            <Text
              style={[
                CHECKBOX_STYLE.listTitle,
                item.isSelected && CHECKBOX_STYLE.listTitleActive,
              ]}
            >
              {item.optionName?.[lang] ?? Object.values(item.optionName)[0] ?? ''}
            </Text>
          }
          titleStyle={CHECKBOX_STYLE.listTitle}
          left={() => (
            <View style={[CHECKBOX_STYLE.listLeftItem]}>
              <CheckBox
                color={COLORS.greenColor}
                checked={item.isSelected}
                onChange={() => {
                  handleChange(item);
                }}
              />
            </View>
          )}
          style={[CHECKBOX_STYLE.list, item.isSelected && CHECKBOX_STYLE.listActive]}
          onPress={() => handleChange(item)}
          rippleColor={COLORS.rippleColor}
        />
      ))}
    </View>
  );
};

export default CheckboxList;
