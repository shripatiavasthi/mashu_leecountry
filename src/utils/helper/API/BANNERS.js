import axios from 'axios';

// ENVIRONMENT VARIABLE
import {REACT_APP_ENVIRONMENT, REACT_APP_TOKEN} from '@env';

// BASE URL
import getUrl from './api-util';

console.log('Linked in banners:', REACT_APP_ENVIRONMENT);
console.log('Link:', `${URL['BASE_URL_' + REACT_APP_ENVIRONMENT]}/banners`);

// Get all banners.
const getAllBannersAPI = async () => {
  let baseUrl = await getUrl();
  console.log('Base Url', baseUrl);
  return axios({
    method: 'get',
    url: `${baseUrl}/banners`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: REACT_APP_TOKEN,
    },
    validateStatus: false,
  });
};

export default BANNERS = {
  GET_ALL_BANNERS: getAllBannersAPI,
};
