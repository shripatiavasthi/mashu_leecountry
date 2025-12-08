import React from 'react';
import axios from 'axios';

// ENVIRONMENT VARIABLE
import {REACT_APP_ENVIRONMENT, REACT_APP_TOKEN} from '../../config/env';

// BASE URL
import getUrl from './api-util';

console.log('Linked in service:', REACT_APP_ENVIRONMENT);
console.log('Link:', `${URL['BASE_URL_' + REACT_APP_ENVIRONMENT]}/services`);

// Get all services.
const getAllServicesAPI = async () => {
  let baseUrl = await getUrl();
  return axios({
    method: 'get',
    url: `${baseUrl}/services`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: REACT_APP_TOKEN,
    },
    validateStatus: false,
  });
};

// Get SubCategory data
const getServiceAPI = async (type, subCategory) => {
  let baseUrl = await getUrl();

  return axios({
    method: 'get',
    url: `${baseUrl}/${type}/${subCategory}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: REACT_APP_TOKEN,
    },
    validateStatus: false,
  });
};

export default SERVICE = {
  GET_ALL_SERVICES: getAllServicesAPI,
  GET_SERVICE: getServiceAPI,
};
