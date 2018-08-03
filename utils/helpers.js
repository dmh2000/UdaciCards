import React from 'react';
import {AsyncStorage} from 'react-native';
import { Notifications, Permissions} from 'expo';

const NOTIFICATION_KEY = 'Udacicards:notifications';

/**
 * clear the notificatino
 */
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then( Notifications.cancelAllScheduledNotificationsAsync);
}

/**
 * create the notification object
 */
export function createNotification() {
  return {
    title: 'Do A Quiz!',
    body: 'Don\'t forget to do a Quiz today!',
    ios: {
      sound:true
    },
    android: {
      sound:true,
      priority: 'high',
      sticky:false,
      vibrate:true
    }
  };
}

/**
 * set the notification
 */
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then( (data) => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then( ( {status} ) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync();

          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate());
          tomorrow.setHours(16);
          tomorrow.setMinutes(0);

          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repease: 'day',
            }
          );
          AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true));
        }
      });
    }
  });
}