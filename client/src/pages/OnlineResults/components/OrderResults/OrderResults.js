import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { InfoMessage } from './OrderResults.css';


const OrderResults = ({ results, metadata }) => {
  const pickIconForResult = result => {
    if (result.wynik >= result.minValue && result.wynik <= result.maxValue)
      return 'OK';
    else {
      return result.wynik > result.maxValue ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
    }
  }
  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor: '#f0f0f0'}}>
            <TableCell align="left" colSpan="2">Nazwisko i Imię</TableCell>
            <TableCell align="right">PESEL</TableCell>
            <TableCell align="right" colSpan="2">Data urodzenia</TableCell>
          </TableRow>
          <TableRow>
          <TableCell align="left" colSpan="2">{metadata.lastName} {metadata.firstName}</TableCell>
            <TableCell align="right">{metadata.pesel}</TableCell>
            <TableCell align="right" colSpan="2">{metadata.birthDate.substring(0, 10)}</TableCell>
          </TableRow>
          <TableRow style={{backgroundColor: '#f0f0f0'}}>
            <TableCell align="left">Nazwa badania</TableCell>
            <TableCell align="right">Norma</TableCell>
            <TableCell align="left" style={{ width: '100px' }}>Jednostka</TableCell>
            <TableCell align="right" style={{ width: '120px' }}>Wynik</TableCell>
            <TableCell align="left" style={{ width: '40px' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map(result => (
            <TableRow key={result.id}>
              <TableCell align="left">{result.name}</TableCell>
              <TableCell align="right">{result.minValue} - {result.maxValue}</TableCell>
              <TableCell align="left">{result.unit}</TableCell>
              <TableCell align="right">{result.wynik}</TableCell>
              <TableCell align="left">{pickIconForResult(result)}</TableCell>
            </TableRow>
          ))}
          {results.length === 0 ? <InfoMessage>Żadne badania nie zostały jeszcze wykonane. <br />Prosimy o cierpliwość, robimy co możemy</InfoMessage> : null}
          <TableRow style={{backgroundColor: '#f0f0f0'}}>
            <TableCell align="left" colSpan="2">
              Jednostka odpowiedzialna: Laboratorium {metadata.city}, {metadata.address}
            </TableCell>
            <TableCell align="right" colSpan="3">Zamówienie z dnia: {metadata.date.substring(0, 10)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default OrderResults;