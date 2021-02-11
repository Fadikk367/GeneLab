import React, { useState, useEffect } from 'react';
import axios from 'api/axiosInstance';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

console.log({ axios });
const PaymentsReport = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await axios.get('/reports/payments');
        setPayments(response.data);
      } catch(err) {
        console.log(err);
      }
    }

    fetchPayments();
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor: '#f0f0f0'}}>
            <TableCell align="left">Identyfikator płatności</TableCell>
            <TableCell align="left">Data</TableCell>
            <TableCell align="right">Kwota&nbsp;(PLN)</TableCell>
            <TableCell align="left">Typ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map(payment => (
            <TableRow key={payment.id}>
              <TableCell align="left">{payment.id}</TableCell>
              <TableCell align="left">{new Date(payment.date).toLocaleString()}</TableCell>
              <TableCell align="right">{parseFloat(payment.amount).toFixed(2)}</TableCell>
              <TableCell align="left">{payment.type}</TableCell>
            </TableRow>
          ))}
          <TableRow style={{backgroundColor: '#f0f0f0'}}>
            <TableCell></TableCell>
            <TableCell align='right'>Suma:</TableCell>
            <TableCell align='right'>{payments.reduce((total, payment) => total += parseFloat(payment.amount), 0.0).toFixed(2)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PaymentsReport
