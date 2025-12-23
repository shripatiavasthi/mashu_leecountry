import { Dimensions } from 'react-native';
import { scaleFont } from './mixin';

const windowWidth = Dimensions.get('window').width;

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_SEMIBOLD = '500';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_28 = windowWidth <= 400 ? scaleFont(26) : scaleFont(28);
export const FONT_SIZE_26 = windowWidth <= 400 ? scaleFont(24) : scaleFont(26);
export const FONT_SIZE_24 = windowWidth <= 400 ? scaleFont(22) : scaleFont(24);
export const FONT_SIZE_22 = windowWidth <= 400 ? scaleFont(20) : scaleFont(22);
export const FONT_SIZE_20 = windowWidth <= 400 ? scaleFont(18) : scaleFont(20);
export const FONT_SIZE_18 = windowWidth <= 400 ? scaleFont(16) : scaleFont(18);
export const FONT_SIZE_16 = windowWidth <= 400 ? scaleFont(14) : scaleFont(16);
export const FONT_SIZE_14 = windowWidth <= 400 ? scaleFont(12) : scaleFont(14);
export const FONT_SIZE_12 = windowWidth <= 400 ? scaleFont(10) : scaleFont(12);
export const FONT_SIZE_10 = windowWidth <= 400 ? scaleFont(9) : scaleFont(10);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_ARIAL_REGULAR = 'Arial';
export const FONT_SEGOUI_REGULAR = 'Segoe UI';
