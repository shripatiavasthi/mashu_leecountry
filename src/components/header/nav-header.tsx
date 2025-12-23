import React, { useEffect, useState } from 'react';
import { View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Text } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import { HEADER_STYLE } from './header-style';
import { COLORS } from '../../assets/styles/imports/variables';
import { getData } from '../../utils/helper/localStorage';

export interface NavHeaderProps {
  statusBg?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  title?: string;
  right?: React.ReactNode;
}

const NavHeader: React.FC<NavHeaderProps> = ({
  statusBg = COLORS.primaryColor,
  barStyle = 'light-content',
  title,
  right,
}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [icon, setIcon] = useState<string>('');

  useEffect(() => {
    getData<any>('settings')
      .then(res => {
        if (res?.commonIcons?.back) {
          setIcon(res.commonIcons.back);
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      {isFocused && (
        <View style={{ backgroundColor: statusBg, height: StatusBar.currentHeight }}>
          <SafeAreaView>
            <StatusBar translucent backgroundColor={statusBg} barStyle={barStyle} />
          </SafeAreaView>
        </View>
      )}
      <View style={[HEADER_STYLE.headerWrap, HEADER_STYLE.navHeaderWrap]}>
        <View style={[HEADER_STYLE.haeaderBackWrap, right == null && HEADER_STYLE.haeaderBackWrapCover]}>
          <TouchableOpacity
            style={[HEADER_STYLE.btn, { marginRight: 15 }]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <SvgUri width={21} height={16} color={COLORS.whiteColor} uri={icon} />
          </TouchableOpacity>
          <View style={[HEADER_STYLE.headerTextWrap]}>
            <Text style={[HEADER_STYLE.headerText]} numberOfLines={1}>
              {title}
            </Text>
          </View>
        </View>
        {right != null && <View style={[HEADER_STYLE.headerActionWrap]}>{right}</View>}
      </View>
    </>
  );
};

export default NavHeader;
