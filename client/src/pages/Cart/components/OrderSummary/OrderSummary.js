import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { confirmOrder } from 'state/clientBasket/clientBasketActions';


const OrderSummary = ({ products }) => {
  const dispatch = useDispatch();
  const personalData = useSelector(state => state.basket.personalData);
  return (
    <div>
      <h3>Zamawiane badania:</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
      <h3>Dane osobowe:</h3>
      {personalData 
        ? (<>
            <p>{personalData.lastName} {personalData.firstName}</p>
            <p>Data urodzenia: {personalData.dateOfBirth}</p>
            <p>PESEL: {personalData.pesel}</p>
          </>) 
        : (<p>Nie wprowadzono!</p>)
      }

      <button disabled={personalData ? false : true} onClick={() => dispatch(confirmOrder())}>Złóż zamówienie</button>
    </div>
  )
}

export default OrderSummary;
