import 'react-native-gesture-handler';

import React, { useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  Provider as PaperProvider,
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import NavigationStack from './src/navigation/drawer-navigation';
import RootStack from './src/navigation/root-navigation';
import { AuthContext, initialState, loginReducer } from './src/redux/store';
import NoInternet from './src/components/no-internet';
import { Loader } from './src/components';
import { getData, storeData } from './src/utils/helper/localStorage';
import SETTINGS from './src/utils/helper/API/SETTINGS';
import { COLORS } from './src/assets/styles/imports/variables';
import './src/i18n';

import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

const fontConfig = {
  default: {
    regular: { fontFamily: 'Arial', fontWeight: 'normal' },
    medium: { fontFamily: 'Arial', fontWeight: 'medium' },
    bold: { fontFamily: 'Arial', fontWeight: 'bold' },
  },
};

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  fonts: configureFonts(fontConfig as any),
};

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  fonts: configureFonts(fontConfig as any),
};

const App: React.FC = () => {
  const netInfo = useNetInfo();
  const isNetConnected = netInfo.isConnected ?? true;

  const isDark = false;
  const combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const paperTheme = isDark ? PaperDarkTheme : PaperDefaultTheme;

  const [loginState, dispatch] = useReducer(loginReducer, initialState);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Save badge status to storage + redux
  const saveBadgeStatus = async (value: boolean) => {
    try {
      await storeData('badgeStatus', value);
      dispatch({ type: 'UPDATE_BADGE_STATUS', badgeStatus: value });
    } catch (err) {
      console.log('Failed to update badge status', err);
    }
  };

  // Unified Firebase Messaging Setup (Android + iOS)
  const setupFirebaseMessaging = async () => {
    // Request permission (important for iOS)
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted');
    }


    // Register device for remote messages on iOS
    // if (Platform.OS === 'ios') {
    //   await messaging().registerDeviceForRemoteMessages();
    // }

    // // Get FCM token
    // try {
    //   const token = await messaging().getToken();
    //   console.log('FCM Token:', token);
    //   Alert.alert('FCM Token', token); 
    // } catch (error) {
    //   console.log('Error getting FCM token:', error);
    // }

    // Background message handler (app closed or in background)
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message:', remoteMessage);
      dispatch({
        type: 'NOTIFICATION_UPDATE',
        notificationUpdate: new Date(Date.now()),
      });
      await saveBadgeStatus(true);
    });

    // Foreground message handler
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage);
      dispatch({
        type: 'NOTIFICATION_UPDATE',
        notificationUpdate: new Date(Date.now()),
      });
      await saveBadgeStatus(true);
    });
  };

  const getLocalData = async (key1: string, key2: string) => {
    setAuthLoading(true);
    try {
      const data = await AsyncStorage.multiGet([key1, key2]);
      const services = data?.[0]?.[1];
      const language = data?.[1]?.[1];

      if (services != null && language != null) {
        dispatch({
          type: 'REGISTER',
          language,
          notifications: JSON.parse(services),
        });
      }
    } catch (err) {
      console.log('Error loading local data:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  const checkForSettingsVersion = async (apiVersion: string | null) => {
    try {
      const res = await SETTINGS.GET_ALL_SETTINGS();
      const data = res?.data?.data;
      if (!data) return;

      const settingsVersion = data?.version?.settings;

      if (apiVersion == null || settingsVersion !== apiVersion) {
        await storeData('api_version', data?.version?.api);
        await storeData('settings_version', settingsVersion);
        await storeData('settings', data);

        if (apiVersion !== settingsVersion) {
          await checkForSettingsVersion(settingsVersion);
        }
      }

      dispatch({ type: 'SET_LANGUAGE', setLang: true });
    } catch (error) {
      console.log('Error checking settings version:', error);
    }
  };

  useEffect(() => {
    // Setup Firebase Messaging
    setupFirebaseMessaging();

    // Load local data
    getLocalData('selected_services', 'selected_language');

    // Check settings version
    getData<string | null>('settings_version')
      .then(res => checkForSettingsVersion(res ?? null))
      .catch(() => checkForSettingsVersion(null));

  }, []);
  

  return (
    <PaperProvider theme={paperTheme}>
      <AuthContext.Provider value={{ loginState, dispatch }}>
        {loginState.language != null && loginState.notifications != null ? (
          authLoading ? (
            <Loader bgColor={COLORS.tertiaryColor} />
          ) : (
            <NavigationStack theme={combinedTheme} />
          )
        ) : (
          <RootStack theme={combinedTheme} />
        )}
        {!isNetConnected && <NoInternet />}
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;





