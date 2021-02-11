import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddBloodCollectionPointForm, BloodCollectionPointList } from './components';

import { getAllBloodCollectionPoints } from 'state/bloodCollectionPoint/bloodCollectionPointActions';


const BloodCollectionPoint = () => {
  const points = useSelector(state => state.bloodCollectionPoints);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBloodCollectionPoints());
  }, [dispatch])
  
  return (
    <>
      <AddBloodCollectionPointForm />
      <BloodCollectionPointList points={points}/>
    </>
  )
}

export default BloodCollectionPoint;
