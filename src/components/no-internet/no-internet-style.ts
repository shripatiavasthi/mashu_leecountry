import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/styles/imports/variables';

export const NO_INTERNET_STYLE = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  upperContentWrap: {
    backgroundColor: COLORS.primaryColor,
    height: '50%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.3,
  },
  alertWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryColor,
    height: '50%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  imageWrap: {
    width: 100,
    height: 100,
    color: '#000',
  },
  textWrapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: COLORS.whiteColor,
    marginTop: 48,
    textAlign: 'center',
    width: '70%',
    lineHeight: 22,
  },
  btnWrap: {
    width: 200,
    marginTop: 48,
  },
});
