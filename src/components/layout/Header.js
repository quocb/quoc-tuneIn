import React from 'react';
import styled from 'styled-components/macro';
import ResponsiveMenu from 'react-responsive-navbar';
import { Link } from 'react-router-dom';

// Header Styles
const Head = styled.header`
  padding-top: 1rem;
`;

// Menu Styles
const Menu = styled.ul`
  display: block;
  list-style-type: disc;
  padding: 0;
  margin: 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #1c203c;

  li {
    list-style-type: none;
  }
  /* Bigger than Mobile Styles */
  @media (min-width: 500px) {
    li {
      display: inline;
      margin: 0;
      margin-right: 30px;
    }
  }
`;

// Link Styles
const Links = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  font-size: 1.5rem;
  color: #1c203c;
  &:hover {
    color: rgb(20, 216, 204);
  }
`;

export default function Header() {
  return (
    <Head>
      <ResponsiveMenu
        menuOpenButton={<i className='material-icons'>menu</i>}
        menuCloseButton={<i className='material-icons'>clear</i>}
        changeMenuOn='500px'
        menu={
          <Menu>
            <li>
              <Links to='/'>Top Stations</Links>
            </li>
            <li>
              <Links to='/browse'>Browse</Links>
            </li>
          </Menu>
        }
      />
    </Head>
  );
}
