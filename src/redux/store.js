import { configureStore } from 'redux-starter-kit';

// Reducers
import tunein from './tunein';
import history from './history';

// Middleware
import apiMiddleware from './middleware/apiMiddleware';
import historyMiddleware from './middleware/historyMiddleware';

const localStorageHistory = localStorage.getItem('tunein-history');

const store = configureStore({
  reducer: {
    tunein: tunein,
    history: history,
  },
  middleware: [apiMiddleware, historyMiddleware],
  preloadedState: {
    // load initial state from local storage
    history: localStorageHistory ? JSON.parse(localStorageHistory) : undefined,
  },
});

export default store;
