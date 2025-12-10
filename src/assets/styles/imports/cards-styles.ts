import { StyleSheet } from 'react-native';
import { COLORS } from './variables';
import {
  FONT_ARIAL_REGULAR,
  FONT_SIZE_12,
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_18,
  FONT_SIZE_20,
  FONT_SIZE_24,
} from './typography';

export const CARD_STYLE = StyleSheet.create({
  flatCardWrap: {
    marginBottom: 15,
    backgroundColor: COLORS.whiteColor,
  },
  flatCardHeaderWrap: {
    padding: 20,
  },
  flatCardShadow: {
    shadowColor: COLORS.borderColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 6,
    marginHorizontal: -5,
  },

  cardWrap: {
    paddingVertical: 20,
    paddingHorizontal: 14,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 8,
    marginBottom: 15,
  },
  shadowColor: {
    shadowColor: COLORS.borderColor,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 8,
  },
  cardContentWrap: {},
  cardHeaderWrap: {},
  cardFooterWrap: {},
  description: {
    fontSize: FONT_SIZE_14,
    color: COLORS.blackColor,
    fontFamily: FONT_ARIAL_REGULAR,
    lineHeight: FONT_SIZE_18,
    letterSpacing: 0.1,
    paddingTop: 10,
    paddingBottom: 15,
  },
  descriptionLong: {
    fontSize: FONT_SIZE_14,
    color: COLORS.blackColor,
    fontFamily: FONT_ARIAL_REGULAR,
    lineHeight: FONT_SIZE_20,
    letterSpacing: 0.1,
    marginBottom: 10,
  },
  overline: {
    fontSize: FONT_SIZE_12,
    color: COLORS.blackColor,
    fontFamily: FONT_ARIAL_REGULAR,
    lineHeight: FONT_SIZE_18,
    letterSpacing: 0.1,
  },

  // event card
  eventTitle: {
    fontSize: FONT_SIZE_18,
    color: COLORS.primaryColor,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    lineHeight: FONT_SIZE_24,
    letterSpacing: 0.1,
  },
  eventSubtitle: {
    fontSize: FONT_SIZE_16,
    color: COLORS.blackColor,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    lineHeight: FONT_SIZE_18,
    letterSpacing: 0.1,
  },
  eventBtnWrap: {
    width: 112,
  },
  cardCloseBtn: {
    margin: 0,
    position: 'absolute',
    top: 7,
    right: 5,
    zIndex: 1,
  },

  // notification card
  notificationCard: {
    marginBottom: 0,
    borderBottomColor: COLORS.greyColor,
    borderBottomWidth: 1,
  },
  notificationCardNew: {
    marginBottom: 0,
    backgroundColor: COLORS.lightSkyBlueColor,
    borderBottomColor: COLORS.skyBlueColor,
    borderBottomWidth: 1,
  },
  notificationCardContent: {
    paddingLeft: 10,
  },

  // info card
  infoCard: {
    backgroundColor: COLORS.lightMustiardColor,
    borderWidth: 1,
    borderColor: COLORS.mustuardColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  infoContentWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: -8,
  },
  infoAvtarWrap: {
    width: 80,
    height: 80,
    marginRight: 18,
  },
  infoAvtarImg: {
    width: '100%',
    height: '100%',
  },
  infoAvtarDescriptonWrap: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  infoTitle: {
    fontSize: FONT_SIZE_14,
    lineHeight: FONT_SIZE_18,
    color: COLORS.primaryColor,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
  },
  infoBtnWrap: {
    width: 160,
    marginTop: 8,
  },
  infoDescriptonWrap: {
    width: '90%',
  },
  infoActionWrap: {
    marginTop: -10,
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noNotificationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  loaderWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
