import React from 'react';
import { useSelector } from 'react-redux';


const OrderConfirmation = () => {
  const placedOrderDetails = useSelector(state => state.basket.placedOrderDetails);

  return (
    <div>
      <h1>Zamówienie zostało przyjęte</h1>
      <h3>Zapisz poniższy kod aby w późniejszym czasie móc sprawdzić wyniki na naszej stronie</h3>
      <p>
        {placedOrderDetails && placedOrderDetails.accessCode}
      </p>
    </div>
  )
}

export default OrderConfirmation
