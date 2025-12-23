import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/styles/imports/variables';
import { FONT_ARIAL_REGULAR, FONT_SIZE_16 } from '../../assets/styles/imports/typography';

export const CHECKBOX_STYLE = StyleSheet.create({
  checkBoxWrap: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxWrapActive: {
    borderColor: COLORS.primaryColor,
  },
  listItemWrap: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  list: {
    backgroundColor: COLORS.whiteColor,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 16,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 0.0
  },
  listActive: {
    backgroundColor: COLORS.primaryColor,
  },
  listTitle: {
    color: COLORS.textColor,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    fontSize: FONT_SIZE_16,
    marginLeft: 8,
  },
  listTitleActive: {
    color: COLORS.whiteColor,
  },
  listLeftItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
