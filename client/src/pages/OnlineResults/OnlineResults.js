import React from 'react';
import axios from 'axios';

import { ProgressBar } from './OnlineResults.css';
import { OrderResults } from './components';


const OnlineResults = () => {
  const [orderId, setOrderId] = React.useState(0);
  const [pesel, setPesel] = React.useState('');
  const [progres, setProgress] = React.useState(0);
  const [fetched, setFetched] = React.useState(false);
  const [results, setResults] = React.useState([]);

  const checkOrderStatus = () => {
    fetch(`/orders/${orderId}/status`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProgress(data.progres);
        setFetched(true);
      })
      .catch(err => console.error(err));

    axios.get(`/orders/${orderId}/results?pesel=${pesel}`)
      .then(res => {
        console.log(res);
        setResults(res.data.results);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <input type="number" value={orderId} onChange={e => setOrderId(e.target.value)}/>
      <input type="text" value={pesel} onChange={e => setPesel(e.target.value)}/>
      <button onClick={checkOrderStatus}>Sprawdź</button>
      {fetched && (
        <>
          <h3>Postęp zamówienia nr {orderId}:</h3>
          <ProgressBar max='100' value={progres}/>
        </>
      )}
      {results && <OrderResults examinationResults={results} />}
    </div>
  )
}

export default OnlineResults;
