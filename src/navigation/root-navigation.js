import React, {useEffect} from 'react';
import 'react-native-gesture-handler';

// plugin
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import ServiceSelectionScreen from '../screens/on-boarding-screen/service-selection-screen';
import LanguageSelectionScreen from '../screens/on-boarding-screen/language-selection-screen';

// navigation
import {navigationRef} from './navigation-service';

const Stack = createStackNavigator();

const RootStack = props => {
  useEffect(() => {}, []);

  return (
    <NavigationContainer ref={navigationRef} theme={props.theme}>
      {/* <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} /> */}
      <Stack.Navigator initialRouteName="language-selection">
        <Stack.Screen
          name="language-selection"
          component={LanguageSelectionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="service-selection"
          component={ServiceSelectionScreen}
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
        />
        <Stack.Screen
          name="mobile-pantries-screen"
          component={MobilePantriesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="food-pantries-screen"
          component={FoodPantriesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="event-listing-screen"
          component={EventListingScreenScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        {/* <Stack.Screen
          name="event-details-screen"
          component={EventDetailsScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        {/* <Stack.Screen
          name="notification-listing-screen"
          component={NotificationListingScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        {/* <Stack.Screen
          name="notification-details-screen"
          component={NotificationDetailsScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        {/* drawer navigation */}
        {/* <Stack.Screen
          name="home-drawer"
          component={DrawerStack}
          options={{
            headerShown: false,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
