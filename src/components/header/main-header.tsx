import React, { useContext } from 'react';
import { View, Image, TouchableOpacity, StatusBar, SafeAreaView, Platform } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Text } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import { HEADER_STYLE } from './header-style';
import { GLOBAL_IMAGES } from '../../assets/images/global-images';
import { COLORS } from '../../assets/styles/imports/variables';
import { storeData } from '../../utils/helper/localStorage';
import { AuthContext } from '../../redux/store';

export interface MainHeaderProps {
  statusBg?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  icons: {
    notification?: string;
    menu?: string;
  };
  label?: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  statusBg = COLORS.whiteColor,
  barStyle = 'dark-content',
  icons,
  label,
}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const authContext = useContext(AuthContext);
  const dispatch = authContext?.dispatch;
  const loginState = authContext?.state;

  const saveStatusToStorage = async (key: string, value: boolean) => {
    try {
      await storeData(key, value);
      dispatch?.({ type: 'UPDATE_BADGE_STATUS', badgeStatus: value });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isFocused && (
        <View style={{ backgroundColor: statusBg, height: StatusBar.currentHeight }}>
          <SafeAreaView>
            <StatusBar translucent backgroundColor={statusBg} barStyle={barStyle} />
          </SafeAreaView>
        </View>
      )}
      <View style={[HEADER_STYLE.headerWrap]}>
        <View style={[HEADER_STYLE.headerLogoWrap]}>
          <Image source={GLOBAL_IMAGES.logo} style={[HEADER_STYLE.headerLogo]} />
        </View>
        <View style={[HEADER_STYLE.headerActionWrap]}>
          <View style={[HEADER_STYLE.notifyActionWrap]}>
            <TouchableOpacity
              onPress={() => {
                const status = Platform.OS === 'android' ? false : true;
                saveStatusToStorage('badgeStatus', status);
                navigation.navigate('notifications' as never);
              }}
            >
              <View style={[HEADER_STYLE.notifyBtnWrap]}>
                <SvgUri
                  style={{ marginVertical: 10 }}
                  width={24}
                  height={24}
                  color={COLORS.blackColor}
                  uri={icons.notification}
                />
                <Text style={[HEADER_STYLE.notifyBtnText]}>{label}</Text>
                {loginState?.badgeStatus && <View style={[HEADER_STYLE.notifyBadge]} />}
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[HEADER_STYLE.btn, { marginHorizontal: 10 }]}
            onPress={() => navigation.toggleDrawer?.()}
          >
            <View style={[HEADER_STYLE.menuActionWrap]}>
              <SvgUri width={28} height={28} color={COLORS.blackColor} uri={icons.menu} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MainHeader;
