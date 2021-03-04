import React from 'react';
import { useSelector } from 'react-redux';

import { Icon } from 'common/icons';
import { PreviewContainer, ProductsCount } from './BasketPreview.css';


const BasketPreview = () => {
  const productsInBasket = useSelector(state => state.basket.products);

  return (
    <PreviewContainer to='/order'>
      KOSZYK
      <Icon.Basket size={30} clickable fill='white'/>
      <ProductsCount>{productsInBasket.length}</ProductsCount>
    </PreviewContainer>
  )
}

export default BasketPreview;
