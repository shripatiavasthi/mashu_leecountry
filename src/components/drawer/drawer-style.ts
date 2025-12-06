import { StyleSheet } from 'react-native';
import {
  FONT_SIZE_14,
  FONT_ARIAL_REGULAR,
  FONT_SIZE_16,
  FONT_WEIGHT_REGULAR,
  FONT_SIZE_18,
} from '../../assets/styles/imports/typography';
import { COLORS } from '../../assets/styles/imports/variables';

export const DRAWER_SCREEN_OPTIONS = {
  swipeEnabled: false,
  headerShown: false,
  drawerItemStyle: {
    width: '100%',
    height: 44,
    marginLeft: 0,
    borderRadius: 0,
    marginBottom: 6,
  },
  drawerActiveBackgroundColor: COLORS.secondaryColor,
  drawerActiveTintColor: COLORS.whiteColor,
  drawerPosition: 'right' as const,
  drawerLabelStyle: {
    marginLeft: -15.5,
    fontSize: FONT_SIZE_16,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: FONT_WEIGHT_REGULAR,
    lineHeight: FONT_SIZE_18,
  },
  drawerInactiveTintColor: COLORS.blackColor,
};

export const DRAWER_STYLE = StyleSheet.create({
  container: {
    backgroundColor: COLORS.greyColor,
    width: '100%',
    height: 138,
  },
  subContainer: {
    position: 'relative',
  },
  logo: {
    width: 179,
    height: 57,
    top: 8,
    left: 6,
  },
  crossBtn: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
  langOptionContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btnContainer: {
    width: '29%',
    marginHorizontal: 4,
  },
  drawerIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 6,
  },
});
