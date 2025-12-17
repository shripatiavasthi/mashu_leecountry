import messaging from '@react-native-firebase/messaging';
import NotificationHandler from './NotificationHandler';

export default class NotifService {
  constructor(onRegister, onNotification) {
    // Attach handlers if provided
    if (onRegister) {
      NotificationHandler.attachRegister(onRegister);
    }
    if (onNotification) {
      NotificationHandler.attachNotification(onNotification);
    }

    // Optional: Clear badge on app start (iOS)
    messaging().setBadge(0);
  }

  // Request permission (mainly for iOS)
  async requestPermissions() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  }

  // Check current permission status
  async checkPermission() {
    const authStatus = await messaging().hasPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  }

  // Get current FCM token
  async getToken() {
    try {
      const token = await messaging().getToken();
      return token;
    } catch (error) {
      console.log('Error getting FCM token:', error);
      return null;
    }
  }

  // Abandon permissions (iOS only)
  abandonPermissions() {
    messaging().deleteToken().catch(console.log);
  }
}