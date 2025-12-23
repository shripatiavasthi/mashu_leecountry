import React from 'react';
import axios from 'axios';

// ENVIRONMENT VARIABLE
import {REACT_APP_ENVIRONMENT, REACT_APP_TOKEN} from '@env';

// BASE URL
import URL from '../../config/constants';

console.log('Linked in settings:', REACT_APP_ENVIRONMENT);
console.log('Link:', `${URL['BASE_URL_' + REACT_APP_ENVIRONMENT]}/settings`);

// Get all settings.
const getAllSettingsAPI = () =>
  axios({
    method: 'get',
    url: `${URL['BASE_URL_' + REACT_APP_ENVIRONMENT]}/settings`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: REACT_APP_TOKEN,
    },
    validateStatus: false,
  });

export default SETTINGS = {
  GET_ALL_SETTINGS: getAllSettingsAPI,
};
