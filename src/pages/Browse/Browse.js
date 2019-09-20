import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import useStations from 'components/hooks/useStations';
import StationCard from 'components/StationCard';
import { getStationTags, getStationsByTag } from 'redux/tunein';

const Main = styled.main`
  background-color: #1c203c;
  h1 {
    margin: 0;
    padding: 1rem;
    color: white;
  }
`;

const BrowseStations = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  text-align: left;
  font-weight: bold;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 500px) {
    padding: 3rem 1rem;
    flex-direction: column;
    min-width: 160px;
  }
`;

const Stations = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
  padding: 3rem 0.5rem;
  @media (min-width: 500px) {
    width: 100%;
  }
`;

const Tag = styled.span`
  padding: 0.5rem;
  color: ${props => (props.selected ? 'rgb(20, 216, 204)' : 'white')};
  cursor: pointer;
  &:hover {
    color: rgb(20, 216, 204);
  }
`;

export default function Browse() {
  // Make sure we fetch stations from api
  const stations = useStations();

  const [currTag, setCurrTag] = useState();
  const tags = useSelector(state => getStationTags(state));
  const matchedStations = useSelector(state => getStationsByTag(state, currTag));

  // Render loading if not yet fetched
  if (!stations || !tags) return <div>Loading...</div>;

  return (
    <Main>
      <BrowseStations>
        <Tags>
          {Object.keys(tags).map(tag => (
            <Tag
              key={tag}
              onClick={() => {
                setCurrTag(tag);
              }}
              selected={tag === currTag}
            >{`${tag} (${tags[tag]})`}</Tag>
          ))}
        </Tags>
        <Stations>
          {matchedStations.map(station => (
            <StationCard key={station.id} imgUrl={station.imgUrl} name={station.name} id={station.id} />
          ))}
        </Stations>
      </BrowseStations>
    </Main>
  );
}
