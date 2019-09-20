import axios from 'axios';
import { FETCH_STATIONS } from 'redux/tunein';

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  // Execute this middle for FETCH_STATIONS action
  if (action.type !== FETCH_STATIONS) return;

  // Get variables from payload
  const { url, method, onSuccess } = action.payload;

  // Needed this to get around cors issues...
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';

  // make the request
  axios
    .request({
      url: proxyurl + url,
      method,
    })
    .then(({ data }) => {
      // store the data in redux
      dispatch(onSuccess(data));
    })
    .catch(error => {
      console.error(error);
    });
};

export default apiMiddleware;
