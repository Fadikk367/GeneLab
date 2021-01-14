import React from 'react'

const OrderResults = ({ examinationResults }) => {
  const listItems = examinationResults.map(result => (
    <li key={result.id}>
      {result.nazwa} / 
      {result.wartosc} / 
      {result.wartosc_min}-{result.wartosc_max}
    </li>
  ));

  return (
    <>
      <h3>Wyniki:</h3>
      <ul>
        {listItems}
      </ul>
    </>
  )
}

export default OrderResults
