import React, { useEffect, useContext, useState } from 'react';
import { View } from 'react-native';

import { COLORS } from '../../assets/styles/imports/variables';
import { DRAWER_STYLE } from './drawer-style';
import Btn from '../buttons/btn';
import { AuthContext } from '../../redux/store';

export type LanguageItem = {
  name: string;
  optionName: string;
  isSelected?: boolean;
};

export interface DrawerLangBtnProps {
  data: LanguageItem[];
  onChange: (value: string, updated: LanguageItem[]) => void;
}

const DrawerLangBtn: React.FC<DrawerLangBtnProps> = ({ data, onChange }) => {
  const [language, setLanguage] = useState<LanguageItem[]>([]);
  const authContext = useContext(AuthContext);
  const lang = authContext?.state?.language as string;

  useEffect(() => {
    const tempArr = data.map(item => {
      if (item.name === lang) {
        return { ...item, isSelected: true };
      }
      return { ...item, isSelected: false };
    });
    setLanguage(tempArr);
  }, [lang, data]);

  const handleChange = (value: string) => () => {
    const nextArr = language.map(entry => ({
      ...entry,
      isSelected: entry.name === value,
    }));
    onChange(value, nextArr);
    setLanguage(nextArr);
  };

  return (
    <View style={DRAWER_STYLE.langOptionContainer}>
      {language.map((item, index) => (
        <Btn
          key={index}
          label={item.optionName}
          mode={item.isSelected ? 'contained' : 'outlined'}
          color={COLORS.secondaryColor}
          size="default"
          style={[
            DRAWER_STYLE.btnContainer,
            { backgroundColor: item.isSelected ? COLORS.secondaryColor : COLORS.whiteColor }
          ]}
          contentStyle={{
            height: 46,
            justifyContent: 'center',
            alignItems: 'center',
            // paddingHorizontal: 0,
          }}
          lablestyle={{
            fontSize: 10,
            fontWeight: '700',
            color: item.isSelected ? COLORS.whiteColor : COLORS.secondaryColor,
            textAlign: 'center',
          }}
          onPress={handleChange(item.name)}
        />

      ))}
    </View>
  );
};

export default DrawerLangBtn;
