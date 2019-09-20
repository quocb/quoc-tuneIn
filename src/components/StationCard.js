import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

import { setCurrentStationId } from 'redux/tunein';

const Station = styled.div`
  width: 200px;
  text-align: center;
  img,
  p {
    cursor: pointer;
  }
`;

export default function StationCard({ imgUrl, name, id }) {
  const dispatch = useDispatch();
  const setStation = () => {
    dispatch(setCurrentStationId(id));
  };
  return (
    <Station>
      <Link to='/listen' onClick={setStation}>
        <img src={imgUrl} alt={name} />
        <p>{name}</p>
      </Link>
    </Station>
  );
}

StationCard.propTypes = {
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};
