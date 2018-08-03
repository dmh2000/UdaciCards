import React from 'react';
import {AsyncStorage} from 'react-native';
import { Notifications, Permissions} from 'expo';

const NOTIFICATION_KEY = 'Udacicards:notifications';

/**
 * clear the notification
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
      sticky:false,
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
    console.log('setLocalNotification',data);
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then( ( {status} ) => {
        console.log('notification status',status);
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync();

          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(8);
          tomorrow.setMinutes(0);
          console.log('tomorrow',tomorrow);

          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repeat: 'day',
            }
          );
          AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true));
        }
      });
    }
  });
}