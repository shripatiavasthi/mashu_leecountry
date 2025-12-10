// ENVIRONMENT VARIABLE
import {REACT_APP_ENVIRONMENT} from '../../config/env';

// BASE URL
import URL from '../../config/constants';

//LOCAL STORAGE CALL
import {getData} from '../../helper/localStorage';

const getUrl = async () => {
  let baseURL = URL['API_URL_' + REACT_APP_ENVIRONMENT];

  // get api version from local-storage
  let apiVersion = await getData('api_version');
  return REACT_APP_ENVIRONMENT === 'NOTHING'
    ? `${baseURL}${apiVersion}/mock`
    : `${baseURL}${apiVersion}/mobile`;
};

export default getUrl;
