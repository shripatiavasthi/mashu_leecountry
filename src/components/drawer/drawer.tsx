import React, { useEffect, useState, useContext } from 'react';
import { View, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

import DrawerLangBtn from './drawer-lang-btn';
import { DRAWER_STYLE } from './drawer-style';
import { COLORS } from '../../assets/styles/imports/variables';
import { HEADER_STYLE } from '../header/header-style';
import { GLOBAL_IMAGES } from '../../assets/images/global-images';
import { getData, storeData } from '../../utils/helper/localStorage';
import { AuthContext } from '../../redux/store';

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const [languages, setLanguages] = useState<any[]>([]);
  const [closeIcon, setCloseIcon] = useState('');
  const authContext = useContext(AuthContext);
  const dispatch = authContext?.dispatch;
  const { i18n } = useTranslation();

  useEffect(() => {
    getData<any>('settings')
      .then(res => {
        if (res?.commonIcons?.close) {
          setCloseIcon(res.commonIcons.close);
        }
      })
      .catch(error => console.log(error));

    getData<any[]>('languages')
      .then(res => {
        if (res) {
          setLanguages(res);
        }
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 30,
          backgroundColor: COLORS.whiteColor,
        }}
      >
        <View style={DRAWER_STYLE.container}>
          <View style={DRAWER_STYLE.subContainer}>
            <Image style={DRAWER_STYLE.logo} source={GLOBAL_IMAGES.logo} />

            <View style={DRAWER_STYLE.crossBtn}>
              <TouchableOpacity
                style={[HEADER_STYLE.btn]}
                onPress={() =>
                  // Use the drawer nav from props to avoid dispatching on the wrong navigator.
                  props.navigation?.dispatch(DrawerActions.closeDrawer())
                }
              >
                <SvgUri style={{ margin: 10 }} uri={closeIcon} width={14} height={14} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingTop: 24 }}>
            <DrawerLangBtn
              data={languages as any}
              onChange={(value, _dataArr) => {
                storeData('selected_language', value);
                dispatch?.({
                  type: 'UPDATE_LANGUAGE',
                  language: value,
                });
                i18n.changeLanguage(value);
              }}
            />
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
