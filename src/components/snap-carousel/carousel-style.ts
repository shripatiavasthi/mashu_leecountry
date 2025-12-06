import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/styles/imports/variables';
import { FONT_ARIAL_REGULAR, FONT_SIZE_16, FONT_SIZE_24 } from '../../assets/styles/imports/typography';

export const CAROUSEL_STYLE = StyleSheet.create({
  carouselWrap: {
    backgroundColor: COLORS.whiteColor,
    position: 'relative',
  },
  carouselItem: {
    height: 212,
    width: '100%',
    zIndex: 0,
  },
  carouselImageWrap: {
    flex: 1,
  },
  description: {
    fontSize: FONT_SIZE_16,
    color: COLORS.whiteColor,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    lineHeight: FONT_SIZE_24,
    zIndex: 2,
  },
  dotStyle: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: COLORS.whiteColor,
  },
  linearGradientWrap: {
    height: 212,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textWrap: {
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 55,
    zIndex: 2,
  },
  btnWrap: {
    position: 'absolute',
    bottom: 20,
    zIndex: 2,
    right: 20,
  },
  btnContent: {
    marginVertical: -1,
    marginHorizontal: -5,
  },
  paginationWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
