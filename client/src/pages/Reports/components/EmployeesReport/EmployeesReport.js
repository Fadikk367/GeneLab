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
  const [emploeesResults, setEmploeesResults] = useState([]);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await axios.get('/reports/employees');
        setEmploeesResults(response.data);
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
            <TableCell align="left">Nazwisko i Imie</TableCell>
            <TableCell align="left">Stanowisko</TableCell>
            <TableCell align="left">Data zatrudnienia</TableCell>
            <TableCell align="left">Miejsce pracy</TableCell>
            <TableCell align="right">Wykonane badania</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emploeesResults.map(employee => (
            <TableRow key={employee.id}>
              <TableCell align="left">{employee.lastName} {employee.firstName}</TableCell>
              <TableCell align="left">{employee.position}</TableCell>
              <TableCell align="left">{employee.employmentDate.substring(0, 10)}</TableCell>
              <TableCell align="left">{employee.address}</TableCell>
              <TableCell align="right">{employee.doneExaminations}</TableCell>
            </TableRow>
          ))}
          <TableRow style={{backgroundColor: '#f0f0f0'}}>
            <TableCell colSpan="3"></TableCell>
            <TableCell align='right'>Suma wykonanych badan:</TableCell>
            <TableCell align='right'>{emploeesResults.reduce((total, emp) => total += parseInt(emp.doneExaminations), 0)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PaymentsReport
