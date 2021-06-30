import {getModel, getVersion, getUniqueId} from 'react-native-device-info';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

import {
  NOTIFICATION_SAVE_TOKEN,
  FETCHING_DATA,
  FETCHING_DATA_FAILURE,
  FETCHING_DATA_SUCCESS,
  CHANGE_TAB_COLOR,
  APP_STATE,
} from '../../constants';

import {registerDeviceAPI, unregisterDeviceAPI} from '../../api';

let appname = `seco_${APP_STATE}`;
if (Platform.OS === 'ios') {
  appname += '_ios';
} else {
  appname += '_android';
}

const onAppRegistered = (token, dispatch) => {
  // PushNotificationIOS.requestPermissions();
  const name = `${getModel()}[${Platform.OS} ${getVersion()}]`;
  const registration = {
    registration_id: token,
    uuid: getUniqueId(),
    name,
    appname,
    platform: Platform.OS,
  };
  dispatch({type: NOTIFICATION_SAVE_TOKEN, payload: registration});
};

const onAppFailedRegistration = (error, dispatch) => {
  dispatch({type: 'NOTIFICATION_FAILED_TOKEN_REGISTRATION', payload: error});
};

const onNotificationReceived = (notification, dispatch) => {
  dispatch({type: CHANGE_TAB_COLOR, payload: true});
  // const badge = notification.badge;
  // if (badge) {
  //   setApplicationIconBadgeNumber(badge);
  //   dispatch({type: 'NOTIFICATION_COUNT_CHANGED', payload: badge});
  // }
  // dispatch({type: 'NOTIFICATION_RECEIVED', payload: notification});
};

export const configurePushNotification = () => {
  return (dispatch) => {
    if (Platform.OS === 'android') {
      PushNotification.configure({
        onRegister: (notification) => {
          onAppRegistered(notification.token, dispatch);
        },

        onNotification: (notification) => {
          onNotificationReceived(notification, dispatch);
        },

        senderID: '723872198300',

        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        requestPermissions: true,
      });
    } else {
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (notification) {
          onAppRegistered(notification.token, dispatch);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          onNotificationReceived(notification, dispatch);
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
          console.error(err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
      });
    }
  };
};

export const removePushNotificationListeners = () => {
  return (dispatch) => {
    // PushNotificationIOS.removeEventListener('register', token =>
    //   onAppRegistered(token, dispatch),
    // );

    // PushNotificationIOS.removeEventListener('registrationError', error =>
    //   onAppFailedRegistration(error, dispatch),
    // );

    // PushNotificationIOS.removeEventListener('notification', notification =>
    //   onNotificationReceived(notification, dispatch),
    // );

    dispatch({type: 'PUSHNOT_SUBSCRIPTIONS_REMOVED'});
  };
};

export const registerPushNotificationToken = (token, infoDeviceWithTokenPN) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    try {
      const response = await registerDeviceAPI(token, infoDeviceWithTokenPN);

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error},
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
      }
    } catch (e) {
      dispatch({
        type: FETCHING_DATA_FAILURE,
        payload: {error: e.message},
      });
    }
  };
};

export const unregisterPushNotificationToken = (
  token,
  infoDeviceWithTokenPN,
) => {
  return async (dispatch) => {
    dispatch({type: FETCHING_DATA});

    try {
      const response = await unregisterDeviceAPI(token, infoDeviceWithTokenPN);

      if (response.error) {
        dispatch({
          type: FETCHING_DATA_FAILURE,
          payload: {error: response.error},
        });
      } else {
        dispatch({type: FETCHING_DATA_SUCCESS, payload: ''});
      }
    } catch (e) {
      dispatch({
        type: 'REGISTER_PN_FAIL',
        payload: 'Error al conectarse con el servidor',
      });
    }
  };
};

const setApplicationIconBadgeNumber = (num) => {
  PushNotification.setApplicationIconBadgeNumber(num);
};

export const notificationChanged = (token, num) => {
  return async (dispatch) => {
    try {
      const response = await API.resetNotificationCount(token);

      if (response.hasOwnProperty('error')) {
        if (!response.error) {
          setApplicationIconBadgeNumber(num);
          dispatch({
            type: 'NOTIFICATION_COUNT_CHANGED',
            payload: num,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
};
