import axios from 'axios';

// ENVIRONMENT VARIABLE
import {REACT_APP_ENVIRONMENT, REACT_APP_TOKEN} from '../../config/env';

// BASE URL
import getUrl from './api-util';

console.log('Linked in events:', REACT_APP_ENVIRONMENT);
console.log('Link:', `${URL['BASE_URL_' + REACT_APP_ENVIRONMENT]}/events`);

// Get all events
const getAllEventsAPI = async () => {
  let baseUrl = await getUrl();
  return axios({
    method: 'get',
    url: `${baseUrl}/events`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: REACT_APP_TOKEN,
    },
    validateStatus: false,
  });
};

export default EVENT = {
  GET_ALL_EVENTS: getAllEventsAPI,
};
