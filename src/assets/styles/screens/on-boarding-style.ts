import { StyleSheet } from 'react-native';
import { COLORS } from '../imports/variables';
import { FONT_ARIAL_REGULAR, FONT_SIZE_16, FONT_SIZE_24 } from '../imports/typography';

export const ON_BOARDING_STYLE = StyleSheet.create({
  bgColor: {
    backgroundColor: COLORS.tertiaryColor,
  },
  logoWrap: {
    marginTop: 48,
    marginBottom: 72,
    paddingHorizontal: 20,
  },
  logoImg: {
    width: '100%',
    resizeMode: 'contain',
    height: 110,
  },
  titleWrap: {
    alignItems: 'center',
    marginBottom: 5,
  },
  headline: {
    fontSize: FONT_SIZE_16,
    fontFamily: FONT_ARIAL_REGULAR,
    fontWeight: '700',
    color: COLORS.secondaryColor,
    textAlign: 'center',
    lineHeight: FONT_SIZE_24,
    width: 220,
  },
  listWrap: {
    marginVertical: 22,
    width: '85%',
    alignSelf: 'center',
    
  },
  btnWrap: {
    alignItems: 'center',
    marginVertical: 44,
    
  },
  btn: {
    width: 156,
    
  },
  loaderWrap: {
    flex: 1,
    height: 250,
    
  },
});
