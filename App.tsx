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
import { Platform } from 'react-native';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Arial',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Arial',
      fontWeight: 'medium',
    },
    bold: {
      fontFamily: 'Arial',
      fontWeight: 'bold',
    },
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

  const saveStatusToStorage = async (key: string, value: boolean) => {
    try {
      await storeData(key, value);
      dispatch({ type: 'UPDATE_BADGE_STATUS', badgeStatus: value });
    } catch (err) {
      console.log('Failed to update badge status', err);
    }
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
          notifications: services,
        });
      }
    } catch (err) {
      console.log(err);
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

      // Trigger language fetch only after settings are stored locally.
      dispatch({ type: 'SET_LANGUAGE', setLang: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocalData('selected_services', 'selected_language');

    getData<string | null>('settings_version')
      .then(res => {
        checkForSettingsVersion(res ?? null);
      })
      .catch(error => console.log(error));
  }, []);

  // Foreground/notification-open handlers
  useEffect(() => {
    const handleNotificationUpdate = () => {
      dispatch({
        type: 'NOTIFICATION_UPDATE',
        notificationUpdate: new Date(),
      });
      saveStatusToStorage('badgeStatus', true);
    };

    const unsubscribeOnMessage = messaging().onMessage(async () => {
      handleNotificationUpdate();
    });

    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      () => {
        handleNotificationUpdate();
      },
    );

    // Cold-start notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleNotificationUpdate();
        }
      })
      .catch(err => console.log('getInitialNotification error', err));

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  }, []);

  // Permission + token capture (APNs/FCM)
  useEffect(() => {
    const registerForPushNotifications = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          console.log('Push permission not granted:', authStatus);
          return;
        }

        if (Platform.OS === 'ios') {
          await messaging().registerDeviceForRemoteMessages();
        }

        const apnsToken =
          Platform.OS === 'ios' ? await messaging().getAPNSToken() : null;
        const fcmToken = await messaging().getToken();
        const tokenToStore =
          Platform.OS === 'ios' ? apnsToken || fcmToken : fcmToken;

        if (tokenToStore) {
          dispatch({ type: 'APN_TOKEN', apnsToken: tokenToStore });
          await storeData('apnsToken', tokenToStore);
        }
      } catch (error) {
        console.log('Push notification setup error:', error);
      }
    };

    registerForPushNotifications();
  }, []);


  return (
    <PaperProvider theme={paperTheme}>
      <AuthContext.Provider value={{ state: loginState, loginState, dispatch }}>
        {loginState.language != null && loginState.notifications != null ? (
          authLoading ? (
            <Loader bgColor={COLORS.tertiaryColor} />
          ) : (
            <NavigationStack theme={combinedTheme as any} />
          )
        ) : (
          <RootStack theme={combinedTheme as any} />
        )}
        {!isNetConnected && <NoInternet />}
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
