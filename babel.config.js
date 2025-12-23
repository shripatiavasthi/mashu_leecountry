module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
      'rn-dotenv',
    ],
    ['react-native-worklets/plugin', {}, 'rn-worklets'],
    ['react-native-reanimated/plugin', {}, 'rn-reanimated'], // keep last
  ],
};
