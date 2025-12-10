export const COLORS = {
  primaryColor: '#095479',
  secondaryColor: '#D53C27',
  tertiaryColor: '#E3F5FA',

  violetColor: '#177493',
  darkVioletColor: '#085076',
  pitchVioletColor: '#04283B',

  textColor: '#313030',

  blackColor: '#1C1D1D',
  whiteColor: '#FFFFFF',
  greenColor: '#42B926',
  greyColor: '#F6F6F6',
  skyBlueColor: '#E4F1FE',

  lightYellowColor: '#FEFCE5',
  lightSkyBlueColor: '#F8FBFE',

  mustuardColor: '#FBF2A0',
  lightMustiardColor: '#F9F5C9',

  borderColor: '#9E9D9D',

  rippleColor: 'rgba(0,0,0,0.08)',

  lightGrey: 'rgba(0,0,0,0.08)',
} as const;

export type ColorKeys = keyof typeof COLORS;
