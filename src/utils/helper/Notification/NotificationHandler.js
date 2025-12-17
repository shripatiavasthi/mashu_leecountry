import messaging from '@react-native-firebase/messaging';

class NotificationHandler {
  constructor() {
    this._onNotification = null;
    this._onRegister = null;

    this.setupMessaging();
  }

  setupMessaging() {
    // Token received/refreshed
    messaging().onTokenRefresh(token => {
      console.log('FCM Token Refreshed:', token);
      if (typeof this._onRegister === 'function') {
        this._onRegister({ token });
      }
    });

    // Get initial token
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
        if (typeof this._onRegister === 'function') {
          this._onRegister({ token });
        }
      })
      .catch(err => console.log('Error getting FCM token:', err));

    // Foreground notifications
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground Notification:', remoteMessage);
      if (typeof this._onNotification === 'function') {
        this._onNotification(remoteMessage);
      }
    });

    // Background / Quit state - notification opened
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened app from background:', remoteMessage);
      if (typeof this._onNotification === 'function') {
        this._onNotification(remoteMessage);
      }
    });

    // App opened from quit state via notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification opened app from quit state:', remoteMessage);
          if (typeof this._onNotification === 'function') {
            this._onNotification(remoteMessage);
          }
        }
      });
  }

  attachRegister(handler) {
    this._onRegister = handler;
  }

  attachNotification(handler) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

export default handler;