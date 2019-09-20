import { createSlice } from 'redux-starter-kit';

/**
 * * history - Redux Slice to store listen history
 *
 */

// reducer, action types, action creators all in 1 createSlice
const historySlice = createSlice({
  slice: 'history',
  initialState: [],
  reducers: {
    startHistory(state, { payload }) {
      state.push({ name: payload, start: new Date() });
    },
    endHistory(state, { payload }) {
      // get last object
      const lastHistory = state.pop();
      state.push({ ...lastHistory, end: new Date() });
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = historySlice;

// Extract and export action creators from slice by name
export const { startHistory, endHistory } = actions;

// Export the reducer as the default
export default reducer;
