import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { TestList, TotalPrice, PersonalDataForm, OrderSummary } from './components';
import { Layout } from './Cart.css';

import { getAllBloodCollectionPoints } from 'state/bloodCollectionPoint/bloodCollectionPointActions';
import { selectBloodCollectionPoint, clearOrderInformations } from 'state/clientBasket/clientBasketActions';


const Cart = () => {
  const productsInBasket = useSelector(state => state.basket.products);
  const bloodCollectionPoints = useSelector(state => state.bloodCollectionPoints);
  const selectedPoint = useSelector(state => state.basket.selectedPoint);
  const placedOrderDetails = useSelector(state => state.basket.placedOrderDetails);
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBloodCollectionPoints());
  }, [dispatch]);

  const handleSelectPoint = e => {
    const id = parseInt(e.target.value);

    const point = bloodCollectionPoints.find(point => point.id === id);
    console.log(point);
    if(point) {
      dispatch(selectBloodCollectionPoint(point));
    }
  }

  const handleConfirmInformation = () => {
    dispatch(clearOrderInformations());
    history.push('/test-catalog');
  }

  return (
    <Layout>
      {!placedOrderDetails? (
        <>
          <h2>Koszyk wybranych badań:</h2>
          <br/>
          <TestList items={productsInBasket} />
          <TotalPrice products={productsInBasket}/>
          <hr />
          <br/>
          <h2>Dane osobowe:</h2>
          <PersonalDataForm />
          <hr />
          <h2>Punkt poborań metriału do badań:</h2>
          <form>
            <select name="bloodCollectionPointId" onChange={handleSelectPoint}>
              <option value="-1" selected >Wybierz punkt pobrań</option>
              {bloodCollectionPoints.map(point => (
                <option key={point.id} value={point.id}>{point.city}, {point.street} {point.number}</option>
              ))}
            </select>
          </form>
          <br />
          <hr />
          <br />
          <OrderSummary products={productsInBasket} point={selectedPoint}/>
        </>
      ) : (
        <>
          <h2>Zamówienie zostało złożone</h2>
          <h2>Kod dostępu: {placedOrderDetails.accessCode}</h2>
          <p>Kod dostępu należy zapisać aby móc później wyświetlić wyniki badań online</p>
          <button onClick={handleConfirmInformation}>OK</button>
        </>
      )}
    </Layout>
  )
}

export default Cart;