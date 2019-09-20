import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import useStations from 'components/hooks/useStations';
import StationCard from 'components/StationCard';
import { getTopStations } from 'redux/tunein';

const Main = styled.main`
  h1 {
    margin: 0;
    padding: 1rem;
  }
`;

const StationsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function Stations() {
  // Make sure we fetch stations from api
  const stations = useStations();
  const topStations = useSelector(state => getTopStations(state));

  // Render loading if not yet fetched
  if (!stations || !topStations) return <div>Loading...</div>;

  return (
    <Main>
      <h1>Top Stations</h1>
      <StationsWrap>
        {topStations.map(station => (
          <StationCard key={station.id} imgUrl={station.imgUrl} name={station.name} id={station.id} />
        ))}
      </StationsWrap>
    </Main>
  );
}
