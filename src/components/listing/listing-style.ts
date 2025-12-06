import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/styles/imports/variables';
import { FONT_ARIAL_REGULAR, FONT_SIZE_18 } from '../../assets/styles/imports/typography';

export const LISTING_STYLE = StyleSheet.create({
  gradientBtnWrap: {
    overflow: 'hidden',
    borderRadius: 8,
    minHeight: 68,
    marginBottom: 16,
  },
  label: {
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  serviceListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: '100%',
    paddingRight: 0,
    paddingLeft: 10,
  },
  serviceListLabel: {
    fontSize: FONT_SIZE_18,
    flex: 1,
  },
});
