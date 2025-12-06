import * as React from 'react';

export const navigationRef = React.createRef(null);

function navigate(name, params) {
  navigationRef.current.navigate(name, params);
}

function goBack() {
  navigationRef.current.goBack();
  //console.log('navigationRef', navigationRef.current);
}

function goBackParams(params) {
  navigationRef.current.goBack(params);
}

export default {
  navigate,
  goBack,
  goBackParams,
};
