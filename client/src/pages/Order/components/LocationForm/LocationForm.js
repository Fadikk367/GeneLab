import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormContext  } from 'react-hook-form';

import { getAllBloodCollectionPoints } from 'state/bloodCollectionPoint/bloodCollectionPointActions';

const LocationForm = ({ formContent }) => {
  const { register, errors, reset, trigger, setError } = useFormContext();
  const [selectedCity, setSelectedCity] = useState('');
  const bloodCollectionPoints = useSelector(state => state.bloodCollectionPoints);
  const dispatch = useDispatch();

  const cities = [...new Set(bloodCollectionPoints.map(point => point.city)).values()];
  const filteredPoints = selectedCity ? bloodCollectionPoints.filter(point => point.city === selectedCity ) : [];

  useEffect(() => {
    dispatch(getAllBloodCollectionPoints());
    setError('selectedPoint', { message: 'To pole jest wymagane', type: 'selectedPoint'});
    reset({ ...formContent.selectedPoint }, { errors: true });
  }, []);

  const findPointById = pointId => {
    const point = bloodCollectionPoints.find(point => point.id === pointId);

    return point;
  }

  return (
    <form>
      <h3>Wybierz punkt</h3>
      <label>
        Wybierz miasto:<br />
        <select 
          name='selectedPoint.city' 
          ref={register({ required: 'To pole jest wymagane' })} 
          onChange={e => setSelectedCity(e.target.value)}
        >
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <p>{errors.city && errors.city.message}</p>
      </label><br />
      <label>
        Wybierz punkt:<br />
        <select 
          name='selectedPoint' 
          ref={register({ 
            required: 'To pole jest wymagane', 
            setValueAs: pointId =>  findPointById(parseInt(pointId))})} 
          disabled={!selectedCity}
        >
          {filteredPoints.map(point => (
            <option key={point.id} value={point.id}>{point.city}, {point.street} {point.number}</option>
          ))}
        </select>
        <p>{errors.bloodCollectionPointId && errors.bloodCollectionPointId.message}</p>
      </label><br />
    </form>
  )
}

export default LocationForm;
