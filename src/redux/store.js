import { configureStore } from 'redux-starter-kit';

// Reducers
import tunein from './tunein';

// Middleware
import apiMiddleware from './middleware/apiMiddleware';

const store = configureStore({
  reducer: {
    tunein: tunein,
  },
  middleware: [apiMiddleware],
});

export default store;
