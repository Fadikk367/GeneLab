import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormContext  } from 'react-hook-form';

import { ListTitle,LocationSelect, Form } from './LocationForm.css';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import { getAllBloodCollectionPoints } from 'state/bloodCollectionPoint/bloodCollectionPointActions';


const LocationForm = ({ formContent }) => {
  const { register, errors, reset, setValue, getValues } = useFormContext();
  const [selectedCity, setSelectedCity] = useState((formContent.selectedPoint && formContent.selectedPoint.city) || '');
  const bloodCollectionPoints = useSelector(state => state.bloodCollectionPoints);
  const dispatch = useDispatch();

  const cities = [...new Set(bloodCollectionPoints.map(point => point.city)).values()];
  const filteredPoints = selectedCity ? bloodCollectionPoints.filter(point => point.city === selectedCity ) : [];

  const findPointById = pointId => {
    const point = bloodCollectionPoints.find(point => point.id === pointId);

    return point;
  }

  useEffect(() => {
    dispatch(getAllBloodCollectionPoints());
    reset({ ...formContent.selectedPoint }, { errors: true });
    register({ 
      name: 'selectedPoint', 
      type: 'custom',
      value: formContent.selectedPoint
    }, { 
      required: 'Nie można kontynuowac bez wyboru punktu'
    });
  }, []);

  console.log(errors);
  console.log(getValues());


  return (
    <>
      <ListTitle variant='h6' style={{ marginBottom: '20px' }}>Wybierz punkt</ListTitle>
      <Form>
        <FormControl style={{ width: '200px' }}>
          <InputLabel>Miasto</InputLabel>
            <LocationSelect 
              name='city'
              value={selectedCity}
              onChange={e => {
                setSelectedCity(e.target.value);
                setValue('selectedPoint', undefined)
              }}
            >
              {cities.map(city => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </LocationSelect>
        </FormControl>
        <FormControl style={{ flex: 1 }}>
          <InputLabel>Adres</InputLabel>
            <LocationSelect 
              name='selectedPoint' 
              onChange={e => {
                const point = findPointById(parseInt(e.target.value));
                setValue('selectedPoint', { ...point }, { shouldValidate: true });
              }}
              disabled={!selectedCity}
            >
              {filteredPoints.map(point => (
                <MenuItem key={point.id} value={point.id}>{point.street} {point.number}</MenuItem>
              ))}
            </LocationSelect>
            <FormHelperText>{errors.selectedPoint && errors.selectedPoint.message}</FormHelperText>
        </FormControl>
      </Form>
    </>
  )
}

export default LocationForm;
