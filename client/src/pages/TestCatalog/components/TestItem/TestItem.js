import React from 'react';
import { useDispatch } from 'react-redux';

import { ListItem } from 'common/components';
import { Icon } from 'common/icons';

import { addProductToBasket } from 'state/clientBasket/clientBasketActions';
import { Button } from './TestItem.css'

const { Lp, Cell, ItemControls, Control } = ListItem;


const TestItem = ({ lp, ...test }) => {
  const { id, name, price } = test;
  const dispatch = useDispatch();

  return (
    <ListItem>
      <Lp>{lp}.</Lp>
      <Cell flex={1}>{name}</Cell>
      <Cell width={140}>{price} PLN</Cell>
      <ItemControls>
        <Button onClick={() => dispatch(addProductToBasket(test))}>
          Do koszyka
        </Button>
      </ItemControls>
    </ListItem>
  )
}

export default TestItem;