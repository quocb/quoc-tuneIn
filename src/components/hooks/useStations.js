import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStations } from 'redux/tunein';

/**
 * * useStations - Custom hook to get station data from redux. Will fetch data from api if it hasn't been fetched yet
 *
 * */
export default function useStations() {
  // Get redux dispatch function
  const dispatch = useDispatch();

  // Get stations from Redux store
  const stations = useSelector(state => state.tunein.stations);
  // Only fetch for stations once if we haven't already
  useEffect(() => {
    if (!stations) dispatch(fetchStations());
    // eslint-disable-next-line
  }, []);

  return stations;
}
