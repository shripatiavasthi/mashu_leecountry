import { StyleSheet } from 'react-native';
import { COLORS } from '../imports/variables';
import {
  FONT_ARIAL_REGULAR,
  FONT_SIZE_10,
  FONT_SIZE_12,
  FONT_SIZE_14,
  FONT_SIZE_22,
  FONT_SIZE_24,
  FONT_SIZE_26,
  FONT_SIZE_28,
} from '../imports/typography';

export const HOME_STYLE = StyleSheet.create({
  serviceListWrap: {
    marginBottom: 12,
  },
  carouselWrap: {
    marginBottom: 15,
  },
  headline: {
    fontSize: FONT_SIZE_22,
    color: COLORS.secondaryColor,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    lineHeight: FONT_SIZE_28,
  },
  titleIconWrap: {
    paddingLeft: 8,
  },
  serviceCategoryListWrap: {
    marginTop: -20,
    marginBottom: 24,
  },
  serviceBtnWrap: {
    padding: 8,
    width: 116,
    height: 90,
  },
  serviceBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 0,
    width: 116,
    height: 90,
  },
  serviceLabelBtn: {
    fontSize: FONT_SIZE_12,
    fontFamily: FONT_ARIAL_REGULAR,
    letterSpacing: 0.1,
    paddingHorizontal: 6,
    flexShrink: 1,
    textAlign: 'center',
    marginTop: -7,
    marginLeft: -16,
    width: '95%',
    height: 38,
  },
  eventCardWrap: {
    marginVertical: 15,
  },
  actionWrap: {
    flexDirection: 'row',
    marginLeft: -48,
  },
});
