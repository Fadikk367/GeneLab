import React from 'react';
import axios from 'api/axiosInstance';

import { Layout, AccessCodeInput, SubmitButton, Headline } from './OnlineResults.css';
import { OrderResults } from './components';


const OnlineResults = () => {
  const [accessCode, setAccessCode] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [metadata, setMetadata] = React.useState(null);

  const checkOrderStatus = () => {
    setMessage('');
    setMetadata(null);

    axios.get(`/orders/${accessCode}/results`)
      .then(res => {
        console.log(res.data);
        setResults(res.data.results);
        setMetadata(res.data.metadata);
      })
      .catch(err => {
        if (err.response) {
          setMessage(err.response.data.message);
        }
      })
  }

  return (
    <Layout>
      <Headline>
        Sprawdź swoje wyniki bez wychodzenia z domu!
      </Headline>
      <AccessCodeInput 
        value={accessCode} 
        placeholder='Wprowadź swój kod dostępu...' 
        onChange={e => setAccessCode(e.target.value)}
      />
      <SubmitButton onClick={checkOrderStatus}>Pobierz</SubmitButton>
      <p>{message && message}</p>
      {(results && metadata) && <OrderResults results={results} metadata={metadata}/>}
    </Layout>
  )
}

export default OnlineResults;
