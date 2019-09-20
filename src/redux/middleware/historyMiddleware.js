import { startHistory, endHistory } from 'redux/history';

// Middleware to save history to local storage
const apiMiddleware = ({ getState }) => next => action => {
  next(action);

  // Execute this middle for history actions only
  if (action.type !== startHistory.toString() && action.type !== endHistory.toString()) return;

  // story history array in localstorage
  localStorage.setItem('tunein-history', JSON.stringify(getState().history));
};

export default apiMiddleware;
