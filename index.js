/**
 * @format
 */

import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';

// Android background/quit state handler
if (Platform.OS === 'android') {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  function HeadlessCheck({isHeadless}) {
    if (isHeadless) {
      // App has been launched in the background by the OS, ignore render
      return null;
    }
    return <App />;
  }

  AppRegistry.registerComponent(appName, () => HeadlessCheck);
} else {
  AppRegistry.registerComponent(appName, () => App);
}
