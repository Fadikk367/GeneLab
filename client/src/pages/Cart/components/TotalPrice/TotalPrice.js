import React from 'react';

import { FlexRow } from './TotalPrice.css';


const TotalPrice = ({ products = [] }) => {
  const sum = products.reduce((total, product) => {
    return total + parseFloat(product.price);
  }, 0);

  return (
    <FlexRow>
      Suma:
      <span>{sum.toFixed(2)}</span>
    </FlexRow>
  )
}

export default TotalPrice;
