import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/styles/imports/variables';
import {
  FONT_SIZE_12,
  FONT_ARIAL_REGULAR,
  FONT_SIZE_10,
  FONT_SIZE_18,
  FONT_SIZE_16,
  FONT_SIZE_14,
} from '../../assets/styles/imports/typography';

export const HEADER_STYLE = StyleSheet.create({
  headerWrap: {
    backgroundColor: COLORS.whiteColor,
    height: 64,
    borderBottomColor: COLORS.greyColor,
    borderBottomWidth: 2,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navHeaderWrap: {
    backgroundColor: COLORS.primaryColor,
  },
  headerLogoWrap: {
    width: 160,
  },
  headerLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  headerActionWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: -12,
  },
  notifyBtnWrap: {
    alignItems: 'center',
  },
  notifyBtnText: {
    fontSize: FONT_SIZE_12,
    fontFamily: FONT_ARIAL_REGULAR,
    color: COLORS.textColor,
    marginTop: -10,
  },
  notifyBadge: {
    position: 'absolute',
    right: 22,
    top: 11,
    width: 10,
    height: 10,
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
  },
  notifyCountWrap: {
    position: 'absolute',
    right: 11,
    top: 6,
    width: 18,
    height: 18,
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
  },
  notifyCount: {
    color: COLORS.whiteColor,
    fontSize: FONT_SIZE_10,
    lineHeight: FONT_SIZE_14,
    fontFamily: FONT_ARIAL_REGULAR,
  },
  haeaderBackWrap: {
    marginLeft: -12,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '60%',
    maxWidth: '88%',
  },
  haeaderBackWrapCover: {
    maxWidth: '100%',
  },
  headerTextWrap: {
    width: '85%',
  },
  headerText: {
    color: COLORS.whiteColor,
    fontSize: FONT_SIZE_18,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
