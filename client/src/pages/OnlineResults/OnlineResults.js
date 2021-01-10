import React from 'react';
import axios from 'axios';

import { ProgressBar } from './OnlineResults.css';


const OnlineResults = () => {
  const [orderId, setOrderId] = React.useState(0);
  const [progres, setProgress] = React.useState(0);
  const [fetched, setFetched] = React.useState(false);

  const checkOrderStatus = () => {
    fetch(`/orders/${orderId}/status`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProgress(data.progres);
        setFetched(true);
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <input type="number" value={orderId} onChange={e => setOrderId(e.target.value)}/>
      <button onClick={checkOrderStatus}>Sprawdź</button>
      {fetched && (
        <>
          <h3>Postęp zamówienia nr {orderId}:</h3>
          <ProgressBar max='100' value={progres}/>
        </>
      )}
    </div>
  )
}

export default OnlineResults;
