import React from 'react';

import { NavigationContainer, NavList, NavItem, NavLink } from './Navigation.css';


const Navigation = ({ links }) => {
  const linkItems = links.map(link => (
    <NavItem key={link.text}>
      <NavLink to={link.path}>{link.text}</NavLink>
    </NavItem>
  ))

  return (
    <NavigationContainer>
      <NavList>
        {linkItems}
      </NavList>
    </NavigationContainer>
  )
}

export default Navigation
