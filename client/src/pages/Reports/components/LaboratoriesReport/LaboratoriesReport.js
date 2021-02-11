import React, { useState, useEffect } from 'react';
import axios from 'api/axiosInstance';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const PaymentsReport = () => {
  const [laboratoriesResults, setLaboratoriesResults] = useState([]);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await axios.get('/reports/laboratories');
        setLaboratoriesResults(response.data);
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
            <TableCell align="left">Lokalizacja</TableCell>
            <TableCell align="right">Pracownicy</TableCell>
            <TableCell align="right">Punkty pobrań</TableCell>
            <TableCell align="right">Wykonane badania</TableCell>
            <TableCell align="right">Całkowity przychód</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {laboratoriesResults.map(lab => (
            <TableRow key={lab.id}>
              <TableCell align="left">{lab.address}</TableCell>
              <TableCell align="right">{lab.employeesCount}</TableCell>
              <TableCell align="right">{lab.pointsCount}</TableCell>
              <TableCell align="right">{lab.examinationOrdersCount}</TableCell>
              <TableCell align="right">{lab.income}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PaymentsReport
