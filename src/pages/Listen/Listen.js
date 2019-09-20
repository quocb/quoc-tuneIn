import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { Redirect } from 'react-router-dom';

import useStations from 'components/hooks/useStations';
import { getSelectedStation } from 'redux/tunein';
import { startHistory, endHistory } from 'redux/history';
import ReactPlayer from 'react-player';

const Main = styled.main`
  h1 {
    margin: 0;
    padding: 1rem;
  }
`;

const StationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .info {
    text-align: left;
    padding: 1rem;
    width: 80%;
  }
  .image {
    padding: 1rem;
  }
  @media (min-width: 500px) {
    flex-direction: row-reverse;
  }
`;

const PlayerWrap = styled.div`
  height: 100px;
`;

export default function Stations() {
  const dispatch = useDispatch();
  // Make sure we fetch stations from api
  const stations = useStations();
  const station = useSelector(state => getSelectedStation(state));

  useEffect(() => {
    // History start
    if (station) dispatch(startHistory(station.name));
    return () => {
      // History End
      if (station) dispatch(endHistory(station.name));
    };
    // eslint-disable-next-line
  }, [station]);

  // Render loading if not yet fetched
  if (!stations) return <div>Loading...</div>;
  if (!station) return <Redirect to='/' />;

  return (
    <Main>
      <StationInfo>
        <div className='image'>
          <img src={station.imgUrl} alt={station.name} />
        </div>
        <div className='info'>
          <h2>{station.name}</h2>
          <p>{station.description}</p>
          <PlayerWrap>
            <ReactPlayer width='100%' height='100%' url={station.streamUrl} playing controls />
          </PlayerWrap>
        </div>
      </StationInfo>
    </Main>
  );
}
