import React from 'react';

import { ListTitle } from './OrderSummary.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PaymentIcon from '@material-ui/icons/Payment';


const OrderSummary = ({ formContent }) => {
  const { products, personalData, selectedPoint, paymentMethod } = formContent;

  return (
    <>
      <ListTitle variant='h6'>Zamawiane badania:</ListTitle>
      <p style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '20px 10px'}}>
        {products.map(product => (
          <Chip label={product.name} style={{ fontSize: '0.9em', padding: '5px' }}/>
        ))}
      </p>
      <ListTitle variant='h6'>Dane osobowe:</ListTitle>
      <List style={{ display: 'flex' }}>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText secondary='nazwisko i imię'>{personalData.lastName} {personalData.firstName}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FingerprintIcon />
          </ListItemIcon>
          <ListItemText secondary='pesel'>{personalData.pesel}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText secondary='data urodzenia'>{personalData.birthDate}</ListItemText>
        </ListItem>
      </List>
      <ListTitle variant='h6'>Pozostałe dane:</ListTitle>
      <List style={{ display: 'flex' }}>
        <ListItem>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText secondary='wybrany punkt pobrań'>{selectedPoint.city}, {selectedPoint.street} {selectedPoint.number}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText secondary='metoda płatności'>{paymentMethod}</ListItemText>
        </ListItem>
      </List>
    </>
  )
}

export default OrderSummary;
