import axios from 'axios';
import {getUniqueId} from 'react-native-device-info';

// ENVIRONMENT VARIABLE
import {REACT_APP_ENVIRONMENT, REACT_APP_TOKEN} from '@env';

// BASE URL
import getUrl from './api-util';

console.log('Linked in service:', REACT_APP_ENVIRONMENT);
console.log('Link:', `${URL['BASE_URL_' + REACT_APP_ENVIRONMENT]}/notifications`);

// Get all Notifications.
const getAllNotificationsAPI = async () => {
  const uniqueDeviceId = await getUniqueId();
  let baseUrl = await getUrl();
  return axios({
    method: 'get',
    url: `${baseUrl}/notifications?deviceId=${uniqueDeviceId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: REACT_APP_TOKEN,
    },
    validateStatus: false,
  });
};

const getNotificationsDetailsAPI = async (id) => {
  let baseUrl = await getUrl();
  // console.log(id, baseUrl, "id")
  return axios({
    method: 'get',
    url: `${baseUrl}/notifications/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: REACT_APP_TOKEN,
    },
    validateStatus: false,
  });
};

const registerDeviceTokenAPI = async data => {
  let baseUrl = await getUrl();
  return axios({
    method: 'post',
    url: `${baseUrl}/device/register`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: REACT_APP_TOKEN,
    },
    data: data,
  });
};

export default NOTIFICATIONS = {
  GET_ALL_NOTIFICATIONS: getAllNotificationsAPI,
  GET_NOTIFICATIONS_DETAILS: getNotificationsDetailsAPI,
  REGISTER_DEVICE_TOKEN: registerDeviceTokenAPI,
};
