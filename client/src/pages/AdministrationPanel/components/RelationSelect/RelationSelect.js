import React from 'react';
import { Select } from './RelationSelect.css';

const RelationSelect = ({ register, options = [], ...rest }) => {
  const renderedOptions = options.map(option => (
    <option key={option.id} value={option.id}>{option.name}</option>
  ))
  return (
    <Select ref={register} {...rest}>
      {renderedOptions}
    </Select>
  )
}

export default RelationSelect;
