import { StyleSheet } from 'react-native';
import { FONT_SIZE_10, FONT_ARIAL_REGULAR } from '../../assets/styles/imports/typography';
import { COLORS } from '../../assets/styles/imports/variables';

export const MAP_STYLE = StyleSheet.create({
  mapViewContainer: {
    borderRadius: 8,
    borderWidth: 3,
    borderColor: COLORS.whiteColor,
    overflow: 'hidden',
  },
  mapView: {
    height: '100%',
    borderRadius: 8,
  },
  markerToolTipContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.whiteColor,
    borderRadius: 4,
    opacity: 1,
    width: 166,
    height: 76,
    paddingHorizontal: 3,
    paddingVertical: 2,
    marginTop: 26,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: COLORS.whiteColor,
    borderWidth: 12,
    alignSelf: 'center',
    marginTop: -24,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 12,
    alignSelf: 'center',
  },
  svg: {
    width: 54,
    height: 72,
    marginRight: 10,
  },
  textContainer: {
    marginVertical: 5,
    marginHorizontal: 7,
    flexShrink: 1,
  },
  title: {
    fontSize: FONT_SIZE_10,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    color: COLORS.darkVioletColor,
    textAlign: 'left',
    lineHeight: 10,
    marginBottom: 3,
  },
  address: {
    fontSize: FONT_SIZE_10,
    fontFamily: FONT_ARIAL_REGULAR,
    color: COLORS.textColor,
    textAlign: 'left',
    lineHeight: 12,
  },
});
