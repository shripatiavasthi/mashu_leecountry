import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/styles/imports/variables';
import {
  FONT_ARIAL_REGULAR,
  FONT_SIZE_14,
} from '../../assets/styles/imports/typography';

export const BTN_STYLE = StyleSheet.create({
  gradientBtnWrap: {
    overflow: 'hidden',
    borderRadius: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cardBtn: {
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: COLORS.secondaryColor,
    paddingHorizontal: 10,
    width: '48%',
  },
  cardBtnLabel: {
    fontSize: FONT_SIZE_14,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    color: COLORS.whiteColor,
  },
  btnIcon: {
    margin: 0,
    marginLeft: -10,
    transform: [
      {
        scale: 0.7,
      },
    ],
  },
});
