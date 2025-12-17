module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Remove this entirely: ['react-native-reanimated/plugin', {}, 'rn-reanimated'],
    'react-native-worklets/plugin',  // This must be the very last plugin!
  ],
};