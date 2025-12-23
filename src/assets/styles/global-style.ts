import { StyleSheet } from 'react-native';
import {
  FONT_SIZE_12,
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_18,
  FONT_SIZE_20,
  FONT_SIZE_22,
} from './imports/typography';
import { COLORS } from './imports/variables';

export const GLOBAL_STYLE = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  safeAreaView: {
    flex: 1,
  },
  bgGreyColor: {
    backgroundColor: COLORS.greyColor,
  },
  titleWrap: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIconWrap: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    paddingRight: 20,
  },
  subtitle1: {
    fontSize: FONT_SIZE_22,
  },
  subtitle2: {
    fontSize: FONT_SIZE_20,
  },
  subtitle3: {
    fontSize: FONT_SIZE_18,
  },
  caption: {
    fontSize: FONT_SIZE_16,
  },
  overline: {
    fontSize: FONT_SIZE_14,
  },
  overline1: {
    fontSize: FONT_SIZE_12,
  },
});
