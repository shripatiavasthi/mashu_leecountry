import { configureFonts } from 'react-native-paper';
import { COLORS } from '../styles/imports/variables';
import { FONT_ARIAL_REGULAR } from '../styles/imports/typography';

const fontConfig = {
  default: {
    regular: {
      fontFamily: FONT_ARIAL_REGULAR,
      fontWeight: 'normal',
      fontSize: 16,
    },
  },
};

export const inputTheme = {
  roundness: 8,
  colors: {
    primary: COLORS.primaryColor,
    placeholder: COLORS.borderColor,
    error: COLORS.secondaryColor,
  },
  fonts: configureFonts(fontConfig as any),
};
