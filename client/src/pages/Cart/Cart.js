import React from 'react';
import { useSelector } from 'react-redux';

import { TestList, TotalPrice } from './components';


const Cart = () => {
  const productsInBasket = useSelector(state => state.basket.products);

  return (
    <div>
      <h2>Koszyk wybranych badań</h2>
      <TestList items={productsInBasket} />
      <TotalPrice products={productsInBasket}/>
    </div>
  )
}

export default Cart;