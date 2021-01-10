import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const NavigationContainer = styled.nav`

`;

export const NavList = styled.ul`
  font-size: 1.2em;
  font-weight: 300;
  letter-spacing: 1px;
`;

export const NavItem = styled.li`
  display: flex;
`;

export const NavLink = styled(Link)`
  flex: 1;
  padding: 10px;
  color: white;
  text-decoration: none;
  transition: padding 0.2s ease-in-out;

  &:hover {
    background-color: #2fad98;
    padding-left: 30px;
    border-left: 4px solid white;
  }
`;
