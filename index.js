/**
 * @format
 */

import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';

if (Platform.OS === 'android') {
  console.log('Platform Detected: ANDROID');
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  function HeadlessCheck({isHeadless}) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }

    return <App />;
  }

  AppRegistry.registerComponent(appName, () => HeadlessCheck);
} else {
  console.log('Platform Detected: iOS');
  AppRegistry.registerComponent(appName, () => App);
}
