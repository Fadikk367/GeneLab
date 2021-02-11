import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const Layout = styled.div`
  padding: 30px;
`;

export const NavList = styled.ul`
  display: flex;
  list-style-type: none;

  margin-bottom: 10px;
`;

export const NavItem = styled.li`
  a {
    color: black;
    text-decoration: none;
  }

  &:not(:last-child) {
    border-right: 2px solid #12a9a0;
  }
`;

export const ActionButton = styled(Button)`
  && {  
    border-radius: 0px;
    padding: 15px 20px;
    color: black;
    font-size: 1em;
    /* background-color: white; */

    &:hover {
      /* background-color: #2fad98; */
    }

    &:active {
      /* background-color: #2fad98; */
    }
  }
`;