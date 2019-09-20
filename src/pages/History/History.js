import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

const Main = styled.main`
  h1 {
    margin: 0;
    padding: 1rem;
  }
`;

const HistoryWrap = styled.ul`
  li {
    list-style-type: none;
  }
`;

export default function Stations() {
  const history = useSelector(state => state.history);

  // Render loading if not yet fetched
  if (!history) return <div>Loading...</div>;

  return (
    <Main>
      <h1>Listen History</h1>
      <HistoryWrap>
        {history.map(session => {
          const startDate = new Date(session.start);
          const endDate = new Date(session.end);

          return (
            <li key={startDate}>{`${startDate.toDateString()} - ${session.name} ${session.end ? `(${endDate - startDate}ms)` : ''}`} </li>
          );
        })}
      </HistoryWrap>
    </Main>
  );
}
