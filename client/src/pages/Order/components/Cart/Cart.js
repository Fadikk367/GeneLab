import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { ListTitle, ListItem, ListItemText } from './Cart.css';

import { removeProductFromBasket } from 'state/clientBasket/clientBasketActions';


const Cart = () => {
  const { register, setValue } = useFormContext();
  const dispatch = useDispatch();
  const examinationsInCart = useSelector(state => state.basket.products) || [];

  useEffect(() => {
    register({ name: 'products', type: 'custom' }, { validate: items => items.length !== 0 });
    setValue('products', examinationsInCart);
  }, [examinationsInCart]);

  return (
    <>
      <ListTitle variant='h6'>
        Twoje badania: ({examinationsInCart.length})
      </ListTitle>
      <List>
        {examinationsInCart.map(item => (
          <ListItem key={item.id} divider>
            <ListItemText flex={5}>{item.name}</ListItemText>
            <ListItemText flex={1}>{item.price} PLN</ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon onClick={() => dispatch(removeProductFromBasket(item.id))}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {examinationsInCart.length === 0 ? (
          <ListItem>
            <ListItemText>Koszyk jest pusty, aby kontynuować, wybierz badania z dostępnej oferty</ListItemText>
          </ListItem>
        ) : (
          <ListItem key={-1} divider>
            <ListItemText flex={5} textAlign='right'>Suma:</ListItemText>
            <ListItemText flex={1}>
              {examinationsInCart.reduce((total, item) => total += parseFloat(item.price), 0.0).toFixed(2)} PLN
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" disabled style={{ visibility: 'hidden' }}>
                <DeleteIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </>
  )
}

export default Cart;
