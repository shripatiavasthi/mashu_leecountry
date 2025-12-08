module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-worklets/plugin', {}, 'rn-worklets'],
    ['react-native-reanimated/plugin', {}, 'rn-reanimated'], // keep last
  ],
};
