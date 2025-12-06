import React from 'react';
import moment from 'moment';

const formatDateAndTime = (startDate, endDate) => {
  const start_date = moment(startDate).format('MMM DD, YYYY');
  const end_date = moment(endDate).format('MMM DD, YYYY');
  if (start_date === end_date) {
    const startTime = moment(startDate).format('h:mm a');
    const endTime = moment(endDate).format('h:mm a');
    return `${start_date} - ${startTime} - ${endTime}`;
  } else {
    const newStartDate = moment(startDate).format('MMMM DD');
    const newEndDate = moment(endDate).format('MMMM DD, YYYY');
    return `${newStartDate} - ${newEndDate}`;
  }
};

const formatDate = date => {
  const _date = moment(date).format('MMM DD, YYYY - h:mm a');
  return _date;
};

export {formatDateAndTime, formatDate};
