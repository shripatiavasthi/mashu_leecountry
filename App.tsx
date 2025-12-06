import 'react-native-gesture-handler';
import 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import axios from 'axios';
import { getDistance, getRhumbLineBearing } from 'geolib';
import moment from 'moment';
import { API_BASE_URL, APP_NAME } from '@env';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { NewAppScreen } from '@react-native/new-app-screen';
import {
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DeviceInfo from 'react-native-device-info';
import { Provider as PaperProvider } from 'react-native-paper';
import openMap from 'react-native-open-maps';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { runOnJS, runOnUI } from 'react-native-worklets';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import './i18n';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [status, setStatus] = useState('Waiting to check AsyncStorage...');
  const [geoStatus, setGeoStatus] = useState('Waiting to check location...');
  const [netStatus, setNetStatus] = useState('Waiting to check network...');
  const [netDetails, setNetDetails] = useState<NetInfoState | null>(null);
  const [workletStatus, setWorkletStatus] = useState(
    'Waiting to run worklet...',
  );
  const [axiosStatus, setAxiosStatus] = useState('Waiting to call axios...');
  const [geoLibStatus, setGeoLibStatus] = useState('Waiting to compute...');
  const [i18nStatus, setI18nStatus] = useState('Waiting to translate...');
  const [momentStatus, setMomentStatus] = useState('Waiting to format time...');
  const [deviceInfoStatus, setDeviceInfoStatus] =
    useState('Waiting for device info...');
  const [envStatus, setEnvStatus] = useState('Waiting to read env...');
  const [mapStatus, setMapStatus] = useState('Waiting to render map...');
  const [mapLaunchStatus, setMapLaunchStatus] =
    useState('Waiting to open maps...');
  const [messagingStatus, setMessagingStatus] = useState(
    'Waiting to check FCM...',
  );
  const htmlSample = `
    <h2>Sample HTML</h2>
    <p>This is rendered via <strong>react-native-htmlview</strong>.</p>
    <ul>
      <li>Supports basic tags</li>
      <li>Inline styles are ignored by default</li>
      <li>Use for lightweight content</li>
    </ul>
  `;
  const { t, i18n } = useTranslation();

  const checkAsyncStorage = useCallback(async () => {
    try {
      setStatus('Writing sample value...');
      await AsyncStorage.setItem('sample-key', 'hello-storage');
      const value = await AsyncStorage.getItem('sample-key');
      setStatus(`Read value: ${value ?? 'null'}`);
    } catch (err) {
      setStatus(`AsyncStorage error: ${String(err)}`);
    }
  }, []);

  useEffect(() => {
    checkAsyncStorage();
  }, [checkAsyncStorage]);

  useEffect(() => {
    // No-op placeholder; kept to mirror previous splash hook.
  }, []);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }, []);

  const checkGeolocation = useCallback(async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setGeoStatus('Location permission denied');
      return;
    }

    setGeoStatus('Fetching current position...');
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setGeoStatus(
          `Lat ${latitude.toFixed(4)}, Lon ${longitude.toFixed(4)}`,
        );
      },
      error => {
        setGeoStatus(`Geolocation error: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    );
  }, [requestLocationPermission]);

  useEffect(() => {
    checkGeolocation();
  }, [checkGeolocation]);

  const formatNetInfo = useCallback((info: NetInfoState | null) => {
    if (!info) return 'No data yet';
    const parts = [
      `Connected: ${info.isConnected ? 'yes' : 'no'}`,
      `Type: ${info.type}`,
    ];
    if (info.isWifiEnabled !== null && info.isWifiEnabled !== undefined) {
      parts.push(`WiFi enabled: ${info.isWifiEnabled ? 'yes' : 'no'}`);
    }
    if (info.details && 'strength' in info.details && info.details.strength) {
      parts.push(`Strength: ${info.details.strength}%`);
    }
    return parts.join(' | ');
  }, []);

  const checkNetInfo = useCallback(async () => {
    setNetStatus('Fetching network state...');
    try {
      const current = await NetInfo.fetch();
      setNetDetails(current);
      setNetStatus(formatNetInfo(current));
    } catch (err) {
      setNetStatus(`NetInfo error: ${String(err)}`);
    }
  }, [formatNetInfo]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(info => {
      setNetDetails(info);
      setNetStatus(formatNetInfo(info));
    });
    checkNetInfo();
    return unsubscribe;
  }, [checkNetInfo, formatNetInfo]);

  const runWorkletCheck = useCallback(() => {
    setWorkletStatus('Running worklet on UI runtime...');
    runOnUI(() => {
      'worklet';
      const sum = 2 + 2;
      runOnJS(setWorkletStatus)(`Worklet ran on UI; 2 + 2 = ${sum}`);
    })();
  }, []);

  useEffect(() => {
    runWorkletCheck();
  }, [runWorkletCheck]);

  const checkAxios = useCallback(async () => {
    setAxiosStatus('Requesting todo item...');
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1',
        { timeout: 8000 },
      );
      setAxiosStatus(
        `Status ${response.status}: ${response.data?.title ?? 'No title'}`,
      );
    } catch (err: any) {
      setAxiosStatus(`Axios error: ${err?.message ?? String(err)}`);
    }
  }, []);

  useEffect(() => {
    checkAxios();
  }, [checkAxios]);

  const checkGeoLib = useCallback(() => {
    // Using sample coords: NYC and SF
    const nyc = { latitude: 40.7128, longitude: -74.006 };
    const sf = { latitude: 37.7749, longitude: -122.4194 };
    const distanceMeters = getDistance(nyc, sf);
    const bearing = getRhumbLineBearing(nyc, sf);
    setGeoLibStatus(
      `NYC→SF distance: ${Math.round(distanceMeters / 1000)} km, bearing: ${bearing.toFixed(1)}°`,
    );
  }, []);

  useEffect(() => {
    checkGeoLib();
  }, [checkGeoLib]);

  const checkI18n = useCallback(() => {
    const current = i18n.language;
    const next = current === 'en' ? 'es' : 'en';
    setI18nStatus(`${t('greeting')} (${current})`);
    i18n.changeLanguage(next);
  }, [i18n, t]);

  useEffect(() => {
    setI18nStatus(`${t('greeting')} (${i18n.language})`);
  }, [i18n.language, t]);

  const checkDeviceInfo = useCallback(async () => {
    try {
      const [brand, model, systemName, systemVersion] = await Promise.all([
        DeviceInfo.getBrand(),
        DeviceInfo.getModel(),
        DeviceInfo.getSystemName(),
        DeviceInfo.getSystemVersion(),
      ]);
      setDeviceInfoStatus(`${brand} ${model} • ${systemName} ${systemVersion}`);
    } catch (err: any) {
      setDeviceInfoStatus(`DeviceInfo error: ${err?.message ?? String(err)}`);
    }
  }, []);

  useEffect(() => {
    checkDeviceInfo();
  }, [checkDeviceInfo]);

  const checkEnv = useCallback(() => {
    setEnvStatus(`APP_NAME=${APP_NAME ?? 'undefined'} | API_BASE_URL=${API_BASE_URL ?? 'undefined'}`);
  }, []);

  useEffect(() => {
    checkEnv();
  }, [checkEnv]);

  const checkMoment = useCallback(() => {
    const now = moment();
    const iso = now.toISOString();
    const relative = now.clone().subtract(90, 'minutes').fromNow();
    setMomentStatus(`Now: ${iso}\n90 minutes ago: ${relative}`);
  }, []);

  useEffect(() => {
    checkMoment();
  }, [checkMoment]);

  const checkMap = useCallback(() => {
    setMapStatus('Map ready');
  }, []);

  const checkOpenMaps = useCallback(() => {
    setMapLaunchStatus('Opening maps to SF...');
    try {
      openMap({
        latitude: 37.7749,
        longitude: -122.4194,
        query: 'San Francisco',
        provider: 'google',
      });
    } catch (err: any) {
      setMapLaunchStatus(`Open maps error: ${err?.message ?? String(err)}`);
    }
  }, []);

  const checkMessaging = useCallback(async () => {
    setMessagingStatus('Requesting permission...');
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (!enabled) {
        setMessagingStatus('FCM permission not granted');
        return;
      }
      setMessagingStatus('Fetching FCM token...');
      const token = await messaging().getToken();
      setMessagingStatus(
        token ? `FCM token: ${token.slice(0, 12)}...` : 'No token returned',
      );
    } catch (err: any) {
      setMessagingStatus(
        `Messaging error: ${err?.message ?? String(err)}`,
      );
    }
  }, []);

  useEffect(() => {
    checkMessaging();
  }, [checkMessaging]);

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Checks">
            <Drawer.Screen name="Checks">
              {() => (
                <ChecksScreen
                  status={status}
                  geoStatus={geoStatus}
                  netStatus={netStatus}
                  checkAsyncStorage={checkAsyncStorage}
                  checkGeolocation={checkGeolocation}
                  checkNetInfo={checkNetInfo}
                  workletStatus={workletStatus}
                  runWorkletCheck={runWorkletCheck}
                  axiosStatus={axiosStatus}
                  geoLibStatus={geoLibStatus}
                  i18nStatus={i18nStatus}
                  momentStatus={momentStatus}
                  deviceInfoStatus={deviceInfoStatus}
                  envStatus={envStatus}
                  mapStatus={mapStatus}
                  mapLaunchStatus={mapLaunchStatus}
                  messagingStatus={messagingStatus}
                  checkAxios={checkAxios}
                  checkGeoLib={checkGeoLib}
                  checkI18n={checkI18n}
                  checkMoment={checkMoment}
                  checkDeviceInfo={checkDeviceInfo}
                  checkEnv={checkEnv}
                  checkMap={checkMap}
                  checkOpenMaps={checkOpenMaps}
                  checkMessaging={checkMessaging}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Network details">
              {() => (
                <NetworkDetailsScreen
                  netDetails={netDetails}
                  netStatus={netStatus}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Stack demo" component={StackDemoNavigator} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

type ChecksScreenProps = {
  status: string;
  geoStatus: string;
  netStatus: string;
  workletStatus: string;
  axiosStatus: string;
  geoLibStatus: string;
  i18nStatus: string;
  momentStatus: string;
  deviceInfoStatus: string;
  envStatus: string;
  mapStatus: string;
  mapLaunchStatus: string;
  messagingStatus: string;
  htmlSample: string;
  checkAsyncStorage: () => void;
  checkGeolocation: () => void;
  checkNetInfo: () => void;
  runWorkletCheck: () => void;
  checkAxios: () => void;
  checkGeoLib: () => void;
  checkI18n: () => void;
  checkMoment: () => void;
  checkDeviceInfo: () => void;
  checkEnv: () => void;
  checkMap: () => void;
  checkOpenMaps: () => void;
  checkMessaging: () => void;
};

function ChecksScreen({
  status,
  geoStatus,
  netStatus,
  axiosStatus,
  geoLibStatus,
  i18nStatus,
  momentStatus,
  deviceInfoStatus,
  envStatus,
  mapStatus,
  mapLaunchStatus,
  messagingStatus,
  htmlSample,
  workletStatus,
  checkAsyncStorage,
  checkGeolocation,
  checkNetInfo,
  runWorkletCheck,
  checkAxios,
  checkGeoLib,
  checkI18n,
  checkMoment,
  checkDeviceInfo,
  checkEnv,
  checkMap,
  checkOpenMaps,
  checkMessaging,
}: ChecksScreenProps) {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#111827', '#0f172a']} style={styles.card}>
          <Text style={styles.title}>AsyncStorage quick check</Text>
          <Text style={styles.status}>{status}</Text>
          <Pressable onPress={checkAsyncStorage} style={styles.button}>
            <View style={styles.iconRow}>
              <Icon name="database-refresh" size={18} color="#ffffff" />
              <Text style={styles.buttonLabel}>Run again</Text>
            </View>
          </Pressable>
        </LinearGradient>
        <LinearGradient colors={['#0f172a', '#0b1220']} style={styles.card}>
          <Text style={styles.title}>Geolocation quick check</Text>
          <Text style={styles.status}>{geoStatus}</Text>
          <Pressable onPress={checkGeolocation} style={styles.button}>
            <Text style={styles.buttonLabel}>Check location</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient colors={['#0b1220', '#0a0f1b']} style={styles.card}>
          <Text style={styles.title}>Device Info quick check</Text>
          <Text style={styles.status}>{deviceInfoStatus}</Text>
          <Pressable onPress={checkDeviceInfo} style={styles.button}>
            <Text style={styles.buttonLabel}>Refresh device info</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient colors={['#0a0f1b', '#0b1220']} style={styles.card}>
          <Text style={styles.title}>Maps quick check</Text>
          <Text style={styles.status}>{mapStatus}</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              onMapReady={checkMap}
              initialRegion={{
                latitude: 37.7749,
                longitude: -122.4194,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}>
              <Marker
                coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
                title="San Francisco"
              />
            </MapView>
          </View>
        </LinearGradient>
        <LinearGradient colors={['#0a0f1b', '#0b1220']} style={styles.card}>
          <Text style={styles.title}>Open Maps quick check</Text>
          <Text style={styles.status}>{mapLaunchStatus}</Text>
          <Pressable onPress={checkOpenMaps} style={styles.button}>
            <Text style={styles.buttonLabel}>Launch native maps</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient colors={['#0a0f1b', '#0b1220']} style={styles.card}>
          <Text style={styles.title}>Dotenv quick check</Text>
          <Text style={styles.status}>{envStatus}</Text>
          <Pressable onPress={checkEnv} style={styles.button}>
            <Text style={styles.buttonLabel}>Reload env</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient colors={['#0b1220', '#0f172a']} style={styles.card}>
          <Text style={styles.title}>NetInfo quick check</Text>
          <Text style={styles.status}>{netStatus}</Text>
          <Pressable onPress={checkNetInfo} style={styles.button}>
            <Text style={styles.buttonLabel}>Refresh network state</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient colors={['#0f172a', '#111827']} style={styles.card}>
          <Text style={styles.title}>Firebase Messaging quick check</Text>
          <Text style={styles.status}>{messagingStatus}</Text>
          <Pressable onPress={checkMessaging} style={styles.button}>
            <Text style={styles.buttonLabel}>Request token</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient colors={['#0f172a', '#111827']} style={styles.card}>
          <Text style={styles.title}>Geolib quick check</Text>
          <Text style={styles.status}>{geoLibStatus}</Text>
          <Pressable onPress={checkGeoLib} style={styles.button}>
            <Text style={styles.buttonLabel}>Compute distance/bearing</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient colors={['#111827', '#0f172a']} style={styles.card}>
          <Text style={styles.title}>i18next quick check</Text>
          <Text style={styles.status}>{i18nStatus}</Text>
          <Pressable onPress={checkI18n} style={styles.button}>
            <Text style={styles.buttonLabel}>Toggle language</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient colors={['#0f172a', '#0b1220']} style={styles.card}>
          <Text style={styles.title}>Moment quick check</Text>
          <Text style={styles.status}>{momentStatus}</Text>
          <Pressable onPress={checkMoment} style={styles.button}>
            <Text style={styles.buttonLabel}>Refresh time</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient colors={['#0b1220', '#0a0f1b']} style={styles.card}>
          <Text style={styles.title}>Carousel quick check</Text>
          <SwiperFlatList
            data={[
              { title: 'Slide 1', caption: 'Hello from swiper carousel.' },
              { title: 'Slide 2', caption: 'You can swipe horizontally.' },
              { title: 'Slide 3', caption: 'Add your own items easily.' },
            ]}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Text style={styles.carouselTitle}>{item.title}</Text>
                <Text style={styles.carouselCaption}>{item.caption}</Text>
              </View>
            )}
            showPagination
            paginationStyle={styles.carouselPagination}
            paginationActiveColor="#2563eb"
            paginationDefaultColor="#4b5563"
            style={styles.carouselWrapper}
          />
        </LinearGradient>
        <LinearGradient colors={['#0b1220', '#0a0f1b']} style={styles.card}>
          <Text style={styles.title}>HTML render quick check</Text>
          <Text style={styles.status}>
            HTML rendering temporarily disabled to avoid library crash. Swap in your preferred HTML renderer when ready.
          </Text>
        </LinearGradient>
        <LinearGradient colors={['#0b1220', '#0a0f1b']} style={styles.card}>
          <Text style={styles.title}>Axios quick check</Text>
          <Text style={styles.status}>{axiosStatus}</Text>
          <Pressable onPress={checkAxios} style={styles.button}>
            <Text style={styles.buttonLabel}>Call axios</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient colors={['#0a0f1b', '#0b1220']} style={styles.card}>
          <Text style={styles.title}>Worklets quick check</Text>
          <Text style={styles.status}>{workletStatus}</Text>
          <Pressable onPress={runWorkletCheck} style={styles.button}>
            <Text style={styles.buttonLabel}>Run worklet</Text>
          </Pressable>
        </LinearGradient>
        <View style={{ height: safeAreaInsets.bottom + 24 }} />
      </ScrollView>
    </View>
  );
}

type NetworkDetailsScreenProps = {
  netDetails: NetInfoState | null;
  netStatus: string;
};

function NetworkDetailsScreen({
  netDetails,
  netStatus,
}: NetworkDetailsScreenProps) {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top + 16 }]}>
      <Text style={styles.title}>NetInfo status</Text>
      <Text style={styles.status}>{netStatus}</Text>
      <View style={styles.detailCard}>
        <Text style={styles.detailText}>
          {netDetails ? JSON.stringify(netDetails, null, 2) : 'No details yet'}
        </Text>
      </View>
    </View>
  );
}

function StackDemoNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StackHome"
        component={StackHomeScreen}
        options={{ title: 'Stack Home' }}
      />
      <Stack.Screen
        name="StackDetail"
        component={StackDetailScreen}
        options={{ title: 'Stack Detail' }}
      />
    </Stack.Navigator>
  );
}

type StackScreenProps = {
  navigation: {
    navigate: (route: string, params?: object) => void;
  };
};

function StackHomeScreen({ navigation }: StackScreenProps) {
  return (
    <View style={[styles.container, styles.stackContainer]}>
      <Text style={styles.title}>Stack navigator check</Text>
      <Text style={styles.status}>
        This screen pushes to a detail screen using @react-navigation/stack.
      </Text>
      <Pressable
        onPress={() => navigation.navigate('StackDetail')}
        style={styles.button}>
        <Text style={styles.buttonLabel}>Go to detail</Text>
      </Pressable>
    </View>
  );
}

function StackDetailScreen({ navigation }: StackScreenProps) {
  return (
    <View style={[styles.container, styles.stackContainer]}>
      <Text style={styles.title}>Detail screen</Text>
      <Text style={styles.status}>Stack navigation is working.</Text>
      <Pressable
        onPress={() => navigation.navigate('StackHome')}
        style={styles.button}>
        <Text style={styles.buttonLabel}>Back to home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#111827cc',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  status: {
    color: '#e5e7eb',
    marginBottom: 12,
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#2563eb',
  },
  buttonLabel: {
    color: '#ffffff',
    fontWeight: '700',
    marginLeft: 6,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scroll: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    top: 24,
  },
  scrollContent: {
    gap: 12,
    paddingBottom: 16,
  },
  detailCard: {
    marginTop: 12,
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#111827cc',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  detailText: {
    color: '#e5e7eb',
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
    fontSize: 12,
  },
  stackContainer: {
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  mapContainer: {
    marginTop: 12,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  map: {
    height: 200,
  },
  htmlHeader: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  htmlP: {
    color: '#e5e7eb',
    marginBottom: 6,
  },
  htmlLi: {
    color: '#e5e7eb',
  },
  carouselWrapper: {
    marginTop: 8,
  },
  carouselItem: {
    width: Dimensions.get('window').width - 80,
    alignSelf: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  carouselTitle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  carouselCaption: {
    color: '#e5e7eb',
  },
  carouselPagination: {
    marginTop: 8,
  },
});

export default App;
