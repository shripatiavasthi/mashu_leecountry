import React, { useEffect, useState, useContext } from 'react';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { SvgUri } from 'react-native-svg';

// Navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Components
import CustomDrawer from '../components/drawer/drawer';
import {
  DRAWER_SCREEN_OPTIONS,
  DRAWER_STYLE,
} from '../components/drawer/drawer-style';

// Screens
import HomeScreen from '../screens/app-screen/home-screen/home-screen';

import ServiceListScreen from '../screens/app-screen/service-screen/service-list-screen';
import ServiceListMapScreen from '../screens/app-screen/service-screen/service-list-map-screen';
import ServiceWebScreen from '../screens/app-screen/service-screen/service-web-screen';
import ServiceMapDetailsScreen from '../screens/app-screen/service-screen/service-map-details-screen';

import EventListingScreen from '../screens/app-screen/events-screen/event-list-screen';
import EventDetailsScreen from '../screens/app-screen/events-screen/event-details-screen';

import NotificationListingScreen from '../screens/app-screen/notification-screen/notification-list-screen';
import NotificationDetailsScreen from '../screens/app-screen/notification-screen/notification-details-screen';
import NotificationUpdateScreen from '../screens/app-screen/notification-screen/notification-update-screen';

// Utils
import { getData } from '../utils/helper/localStorage';

// Redux
import { AuthContext } from '../redux/store';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigators for Drawer Items
const ServiceStackNavigator = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="service-list-screen"
        component={ServiceListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="service-listmap-screen"
        component={ServiceListMapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="service-web-screen"
        component={ServiceWebScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Home = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Notification = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="notification-listing-screen"
        component={NotificationListingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Event = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="event-listing-screen"
        component={EventListingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const newMenus = data => {
  let filteredServiceArr = data.filter(item => item.screenType === 'services');
  let filteredCustomArr = data.filter(item => item.screenType === 'custom');

  let customArr = filteredCustomArr.map(item => {
    if (item.screenType === 'custom') {
      let name = item.name;
      return { ...item, screenType: name };
    }
  });

  let tempArr = [];
  customArr.map((item, index) => {
    tempArr.push(item);
    if (item.id == 2) {
      filteredServiceArr.map((itemm, index) => {
        tempArr.push(itemm);
      });
    }
  });
  return tempArr;
};

function Root() {
  const [menus, setMenus] = useState([]);
  const { loginState } = useContext(AuthContext);
  const navigation = useNavigation();

  const lang = loginState.language;

  useEffect(() => {
    // Unified Firebase Messaging Handler (Android + iOS dono ke liye)
    const setupFirebaseMessaging = async () => {
      // Permission request (iOS pe prompt dikhaayega, Android pe automatic)
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted.');
      }

      // App quit state se notification pe click karne pe
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log('App opened from quit state by notification:', remoteMessage);
            navigation.navigate('notification-details-screen', {
              data: remoteMessage,
              isRedirectFrom: 'notification-invoked',
            });
          }
        });

      // App background mein ho aur notification pe click kare
      const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('App opened from background by notification:', remoteMessage);
        navigation.navigate('notification-details-screen', {
          data: remoteMessage,
          isRedirectFrom: 'notification-invoked',
        });
      });

      // Foreground mein notification aaye (yahan local display nahi kar rahe abhi, sirf log)
      messaging().onMessage(async remoteMessage => {
        console.log('Foreground notification received:', remoteMessage);
        // Future mein yahan Notifee add kar sakte ho local notification ke liye
      });

      return unsubscribe;
    };

    // Local storage se menus load karo
    getData('settings')
      .then(res => {
        let data = res.sidebar.menus;
        let newArr = newMenus(data);
        setMenus(newArr);
      })
      .catch(error => console.log('Error loading settings:', error));

    // Firebase messaging setup
    const unsubscribe = setupFirebaseMessaging();

    // Cleanup on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [navigation]);

  const returnScreen = screenType => {
    switch (screenType) {
      case 'home':
        return Home;
      case 'notifications':
        return NotificationListingScreen;
      case 'events':
        return EventListingScreen;
      case 'services':
        return ServiceListScreen;
      default:
        return ServiceListScreen;
    }
  };

  return (
    <Drawer.Navigator
      // useLegacyImplementation={true} → Remove kar diya (New Arch ke liye better)
      screenOptions={DRAWER_SCREEN_OPTIONS}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      {menus.length > 0 ? (
        menus.map((service, index) => (
          <Drawer.Screen
            key={index}
            name={service.name}
            component={returnScreen(service.screenType)}
            initialParams={service}
            options={{
              drawerLabel: service.displayName[lang],
              headerShown: false,
              drawerIcon: ({ color }) => (
                service.iconUrl ? (
                  <SvgUri
                    style={DRAWER_STYLE.drawerIcon}
                    width={18}
                    height={18}
                    color={color}
                    uri={service.iconUrl}
                  />
                ) : null // fallback agar iconUrl na ho
              ),
            }}
          />
        ))
      ) : (
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
      )}
    </Drawer.Navigator>
  );
}

export default function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />

        {/* Normal navigation screens */}
        <Stack.Screen
          name="notification-listing-screen"
          component={NotificationListingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="notification-details-screen"
          component={NotificationDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="notification-update-screen"
          component={NotificationUpdateScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="event-details-screen"
          component={EventDetailsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="service-listmap-screen"
          component={ServiceListMapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="service-web-screen"
          component={ServiceWebScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="service-map-details-screen"
          component={ServiceMapDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}