import { createSlice, createSelector } from 'redux-starter-kit';

/**
 * * Stations - Redux Slice to store / fetch stations list
 *
 */

// reducer, action types, action creators all in 1 createSlice
const stationsSlice = createSlice({
  slice: 'tunein',
  initialState: {
    stations: undefined,
    currentStationId: '',
  },
  reducers: {
    // set fetched data into store
    setStations(state, { payload }) {
      state.stations = payload.data;
    },
    setCurrentStationId(state, { payload }) {
      state.currentStationId = payload;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = stationsSlice;

// Extract and export action creators from slice by name
export const { setStations, setCurrentStationId } = actions;

// Export the reducer as the default
export default reducer;

// Async Action Types
export const FETCH_STATIONS = 'tunein/FETCH_STATIONS';

// Async action creator for fetching contentful data
export const fetchStations = () => ({
  type: FETCH_STATIONS,
  payload: {
    url: 'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json',
    method: 'GET',
    onSuccess: setStations,
  },
});

// Selector for Top 6 stations
export const getTopStations = createSelector(
  [state => state.tunein.stations],
  stations => {
    if (!stations) return null;
    return stations.sort((a, b) => b.popularity - a.popularity).slice(0, 6);
  }
);

// Selector for all unique tags
export const getStationTags = createSelector(
  [state => state.tunein.stations],
  stations => {
    if (!stations) return null;
    const tagsArr = stations.reduce((tags, station) => {
      // go through each tag of each station and add to tag count for station
      station.tags.forEach(tag => {
        if (tags[tag]) {
          // tag exists. Update numStation
          tags[tag] += 1;
        } else {
          // add new tag to object
          tags[tag] = 1;
        }
      });
      return tags;
    }, {});
    return tagsArr;
  }
);

// Selector for stations that match tag
export const getStationsByTag = createSelector(
  [state => state.tunein.stations, (_, tag) => tag],
  (stations, tag) => {
    if (!stations) return null;
    return stations.filter(station => station.tags.includes(tag));
  }
);

// Selector to get current station
export const getSelectedStation = createSelector(
  [state => state.tunein.stations, state => state.tunein.currentStationId],
  (stations, currentStationId) => {
    if (!stations) return null;
    return stations.find(station => station.id === currentStationId);
  }
);
