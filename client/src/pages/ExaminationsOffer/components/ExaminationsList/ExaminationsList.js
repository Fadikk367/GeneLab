import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { List, ListItem } from 'common/components';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { ListWrapper, ActionButton } from './ExaminationsList.css';

import { addProductToBasket } from 'state/clientBasket/clientBasketActions';


const { Lp, Cell, ItemControls } = ListItem;


const ExaminationsList = ({ items, setPage }) => {
  const examinationsInCart = useSelector(state => state.basket.products);
  const dispatch = useDispatch();

  const listLabel = (
    <ListItem header>
      <Lp>Lp.</Lp>
      <Cell flex={1}>Nazwa</Cell>
      <Cell width={200}>Cena</Cell>
      <ItemControls>
        <IconButton>
          <AddShoppingCartIcon />
        </IconButton>
      </ItemControls>
    </ListItem>
  )

  const renderedItems = items.map((test, idx) => (
    <ListItem key={test.id}>
      <Lp>{idx}.</Lp>
      <Cell flex={1}>{test.name}</Cell>
      <Cell width={200}>{test.price} PLN</Cell>
      <ItemControls>
        <IconButton 
          onClick={() => dispatch(addProductToBasket(test))}
          disabled={examinationsInCart.find(item => item.examinationId === test.id)}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </ItemControls>
    </ListItem>
  ));

  return (
    <ListWrapper>
      <List>
        {listLabel}
        {renderedItems}
      </List>
      <ActionButton onClick={() => setPage(prev => prev + 1)}>
        Pokaż więcej
      </ActionButton>
    </ListWrapper>
  )
}

export default ExaminationsList;
