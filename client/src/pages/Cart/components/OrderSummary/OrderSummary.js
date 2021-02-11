import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { confirmOrder } from 'state/clientBasket/clientBasketActions';


const OrderSummary = ({ products, point }) => {
  const dispatch = useDispatch();
  const personalData = useSelector(state => state.basket.personalData);
  const isLoading = useSelector(state => state.basket.isLoading);

  return (
    <div>
      <h3>Podsumowanie zamówienia:</h3>
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
      <h3>Punkt pobrań krwi:</h3>
      {point
        ? (
          <p>{point.city}, {point.sreet} {point.number}</p>)
        : (<p>Nie wybrano!</p>)

      }

      <button disabled={personalData && point ? false : true} onClick={() => dispatch(confirmOrder(personalData, products, point))}>Złóż zamówienie</button>
      {isLoading ? "Loading..." : null}
    </div>
  )
}

export default OrderSummary;
