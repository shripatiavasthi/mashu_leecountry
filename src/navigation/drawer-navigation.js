import React, {useEffect, useState, useContext} from 'react';
import {Platform} from 'react-native';
import {SvgUri} from 'react-native-svg';
import messaging from '@react-native-firebase/messaging';

// plugin
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// components
import CustomDrawer from '../components/drawer/drawer';
import {
  DRAWER_SCREEN_OPTIONS,
  DRAWER_STYLE,
} from '../components/drawer/drawer-style';

// screens
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

// utils
import {getData} from '../utils/helper/localStorage';

// redux
import {AuthContext} from '../redux/store';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const ServiceStackNavigator = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="service-list-screen"
        component={ServiceListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="service-listmap-screen"
        component={ServiceListMapScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="service-web-screen"
        component={ServiceWebScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

// For Drawer Navigation
const Home = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

// For Drawer Navigation
const Notification = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="notification-listing-screen"
        component={NotificationListingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

// For Drawer Navigation
const Event = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="event-listing-screen"
        component={EventListingScreen}
        options={{
          headerShown: false,
        }}
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
      return {...item, screenType: name};
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
  const {loginState} = useContext(AuthContext);
  const navigation = useNavigation();

  const lang = loginState.language;

  const msgHandlerAndroid = () => {
    console.log('***** GET_INITIAL _NOTIFICATION INVOKED *****');
    messaging()
      .getInitialNotification()
      .then(res => {
        if (res) {
          navigation.navigate('notification-details-screen', {
            data: res,
            isRedirectFrom: 'notification-invoked',
          });
        }
      })
      .catch(err => console.error('getInitialNotification() failed', err));

    messaging().onNotificationOpenedApp(msg => {
      if (msg) {
        navigation.navigate('notification-details-screen', {
          data: msg,
          isRedirectFrom: 'notification-invoked',
        });
      }
      });
  };

  const msgHandlerIOS = () => {
    console.log('***** GET_INITIAL _NOTIFICATION INVOKED *****');
    messaging()
      .getInitialNotification()
      .then(notification => {
        if (notification) {
          navigation.navigate('notification-details-screen', {
            data: notification,
            isRedirectFrom: 'notification-invoked',
          });
        }
      })
      .catch(err => console.error('getInitialNotification() failed', err));

    messaging().onNotificationOpenedApp(msg => {
      if (msg) {
        navigation.navigate('notification-details-screen', {
          data: msg,
          isRedirectFrom: 'notification-invoked',
        });
      }
    });
  };

  useEffect(() => {
    Platform.OS === 'android' ? msgHandlerAndroid() : msgHandlerIOS();
  }, []);

  useEffect(() => {
    getData('settings')
      .then(res => {
        let data = res.sidebar.menus;
        let newArr = newMenus(data);
        setMenus(newArr);
      })
      .catch(error => console.log(error));
  }, []);

  const returnScreen = screenType => {
    switch (screenType) {
      case 'home':
        return Home;
        break;
      case 'notifications':
        return NotificationListingScreen;
        break;
      case 'events':
        return EventListingScreen;
        break;
      case 'services':
        return ServiceListScreen;
        break;
      default:
        return ServiceListScreen;
        break;
    }
  };

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      screenOptions={DRAWER_SCREEN_OPTIONS}
      drawerContent={props => <CustomDrawer {...props} />}
      options={{headerShown: false}}>
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
              drawerIcon: ({color}) => (
                <SvgUri
                  style={DRAWER_STYLE.drawerIcon}
                  width={18}
                  height={18}
                  color={color}
                  uri={service.iconUrl}
                />
              ),
            }}
          />
        ))
      ) : (
        <Drawer.Screen
          name={'Home'}
          component={Home}
          options={{
            drawerItemStyle: {display: 'none'},
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
export default function NavigationStack({theme}) {
  return (
    //<SafeAreaProvider>
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{headerShown: false}}
        />

        {/* For normal navigation */}
        <Stack.Screen
          name="notification-listing-screen"
          component={NotificationListingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notification-details-screen"
          component={NotificationDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notification-update-screen"
          component={NotificationUpdateScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* For Normal Navigation */}
        {/* <Stack.Screen
          name="event-listing-screen"
          component={EventListingScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="event-details-screen"
          component={EventDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
            name="service-list-screen"
            component={ServiceListScreen}
            options={{
              headerShown: false,
            }}
          /> */}
        <Stack.Screen
          name="service-listmap-screen"
          component={ServiceListMapScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="service-web-screen"
          component={ServiceWebScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="service-map-details-screen"
          component={ServiceMapDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    //</SafeAreaProvider>
  );
}
