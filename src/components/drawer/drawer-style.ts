import { StyleSheet, Platform } from 'react-native';
import {
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
    height: 50,
    marginLeft: 0,
    borderRadius: 0,
    marginBottom: 10,
  },
  drawerActiveBackgroundColor: COLORS.secondaryColor,
  drawerActiveTintColor: COLORS.whiteColor,
  drawerPosition: 'right' as const,
  drawerLabelStyle: {
    marginLeft: 6,
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
    paddingTop: Platform.OS === 'android' ? 10 : 20,
    paddingBottom: 20,
  },

  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  logo: {
    width: 160,
    height: 50,
    resizeMode: 'contain',
  },

  crossBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  langOptionContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginTop: 12,
  },

  btnContainer: {
    minWidth: '30%',
    marginHorizontal: 6,
    marginVertical: 4,
    // justifyContent: 'center',
  },

  drawerIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: -10,
  },
});
