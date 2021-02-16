import React from 'react';


const OrderSummary = ({ formContent }) => {
  const { products, personalData, selectedPoint, paymentMethod } = formContent;

  return (
    <div>
      <h3>Podsumowanie zamówienia:</h3>
      <h4>Zamawiane badania:</h4>
      <ul>
        {products.map(item => (
          <li key={item.id}>{item.name} - {item.price}</li>
        ))}
      </ul>
      <br/>
      <hr/>
      <br/>
      <h4>Dane osobowe:</h4>
      <p>Nazwisko: {personalData.lastName}</p>
      <p>Imię: {personalData.firstName}</p>
      <p>PESEL: {personalData.pesel}</p>
      <p>Data urodzenia: {personalData.birthDate}</p>
      <br/>
      <hr/>
      <br/>
      <h4>Miejsce pobrania materiału:</h4>
      <p>{selectedPoint.city}, {selectedPoint.street} {selectedPoint.number}</p>
      <br/>
      <hr/>
      <br/>
      <p>Metoda płtności: {paymentMethod}</p>
    </div>
  )
}

export default OrderSummary;
