import { StyleSheet } from 'react-native';
import { COLORS } from '../imports/variables';
import {
  FONT_ARIAL_REGULAR,
  FONT_SIZE_12,
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_18,
  FONT_SIZE_20,
} from '../imports/typography';

export const SERVICE_CARD_STYLE = StyleSheet.create({
  externalCardList: {
    flex: 1,
  },
  externalCardItem: {
    backgroundColor: COLORS.whiteColor,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 8,
    shadowColor: COLORS.greyColor,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 10,
  },
  cardBtn: {
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    flex: 1,
  },
  cardLabel: {
    fontSize: FONT_SIZE_18,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    color: COLORS.darkVioletColor,
    alignSelf: 'center',
    marginBottom: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  cardBtnLabel: {
    fontSize: FONT_SIZE_16,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    color: COLORS.whiteColor,
  },
  loaderWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const LIST_VIEW_CARD_STYLE = StyleSheet.create({
  tabBtnHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tabBtnHeaderWrap: {
    borderColor: COLORS.secondaryColor,
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  tabBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 100,
  },
  tabBtnActive: {
    backgroundColor: COLORS.secondaryColor,
  },
  tabBtnLabel: {
    fontSize: FONT_SIZE_16,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    color: COLORS.secondaryColor,
    textAlign: 'center',
  },
  tabBtnLabelActive: {
    color: COLORS.whiteColor,
  },
  tabBodyWrap: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  listingView: {
    paddingHorizontal: 8,
    paddingTop: 10,
    flex: 1,
  },
  listingViewCard: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: COLORS.borderColor,
    paddingBottom: 16,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  cardTitileWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  cardTitilText: {
    fontSize: FONT_SIZE_16,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    color: COLORS.darkVioletColor,
    flex: 1,
    lineHeight: FONT_SIZE_18,
    paddingRight: 16,
  },
  cardBadgeWrap: {
    backgroundColor: COLORS.darkVioletColor,
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
  cardBadge: {
    fontSize: FONT_SIZE_14,
    color: COLORS.whiteColor,
    lineHeight: FONT_SIZE_20,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
  },
  cardAddDes: {
    flex: 1,
    fontSize: FONT_SIZE_14,
    lineHeight: 16,
    paddingLeft: 10,
    fontFamily: FONT_ARIAL_REGULAR,
    letterSpacing: 0,
    color: COLORS.textColor,
  },
  mapIcon: {
    margin: 0,
    width: 20,
    height: 20,
    transform: [
      {
        scale: 0.7,
      },
    ],
  },
  cardInfo: {
    backgroundColor: COLORS.lightYellowColor,
    borderRadius: 6,
    padding: 16,
    marginTop: 16,
  },
  cardInfoHeading: {
    fontSize: FONT_SIZE_14,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    color: COLORS.textColor,
    margin: 0,
    lineHeight: 14,
    marginBottom: 10,
  },
  cardInfoPara: {
    fontSize: FONT_SIZE_12,
    fontFamily: FONT_ARIAL_REGULAR,
    color: COLORS.textColor,
    margin: 0,
    lineHeight: 14,
  },
  detailsCardBodyWrap: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  cardActionsWrap: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
});
