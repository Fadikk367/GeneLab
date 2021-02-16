import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { removeProductFromBasket } from 'state/clientBasket/clientBasketActions';


const Cart = () => {
  const { register, setValue } = useFormContext();
  const dispatch = useDispatch();
  const examinationsInCart = useSelector(state => state.basket.products) || [];

  useEffect(() => {
    register({ name: 'products', type: 'custom' }, { validate: items => items.length !== 0 });
    setValue('products', examinationsInCart)
  }, [examinationsInCart]);

  return (
    <div>
      {examinationsInCart.length !== 0 
      ? (
        <>
          <h3>Twoje badania:</h3>
          <ul>
            {examinationsInCart.map(item => (
              <li key={item.id}>
                {item.name}, {item.price}
                <button onClick={() => dispatch(removeProductFromBasket(item.id))}>&times;</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h3>Koszyk jest pusty, wybierz badania dostepne w ofercie</h3>
      )}
    </div>
  )
}

export default Cart;
