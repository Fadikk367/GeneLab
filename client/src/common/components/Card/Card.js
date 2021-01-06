import React from 'react';

import { BlockLink } from 'common/components';
import { CardWrapper, Title, CardContent } from './Card.css';


const Card = ({ title, link, children }) => {
  return (
    <BlockLink to={link}>
      <CardWrapper>
        <Title>{title}</Title>
        <CardContent>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, veniam ratione qui incidunt inventore eos.</p>
          {children}
        </CardContent>
      </CardWrapper>
    </BlockLink>
  )
}

export default Card;
