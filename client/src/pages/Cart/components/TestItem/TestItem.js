import React from 'react';
import { useDispatch } from 'react-redux';

import { ListItem } from 'common/components';
import { Icon } from 'common/icons';

import { removeProductFromBasket } from 'state/clientBasket/clientBasketActions';

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
        <button onClick={() => dispatch(removeProductFromBasket(id))}>
          &times;
        </button>
      </ItemControls>
    </ListItem>
  )
}

export default TestItem;