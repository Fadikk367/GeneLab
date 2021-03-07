import React from 'react';
import { Link } from 'react-router-dom';

import { TableContainer, TableCell } from './PendingExaminationsList.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';


const PendingExaminationsList = ({ pendingExaminations = [] }) => {
  return (
    <TableContainer>
      <Table dense>
        <TableHead style={{ backgroundColor: '#2fad98' }}>
          <TableRow>
            <TableCell>Lp.</TableCell>
            <TableCell>Nazwa</TableCell>
            <TableCell align='right'>Przedział</TableCell>
            <TableCell>Jednostka</TableCell>
            <TableCell>Materiał</TableCell>
            <TableCell>id</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingExaminations.map((row, i) => (
            <TableRow key={row.name} hover>
              <TableCell>{i}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align='right'>{row.min}-{row.max}</TableCell>
              <TableCell>{row.unit}</TableCell>
              <TableCell>{row.material}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell align='right'>
                <Link to={`/laboratory/examinations/${row.id}/do`} style={{ textDecoration: 'none' }}>
                  <Button endIcon={<CreateIcon />}>
                    wykonaj
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {pendingExaminations.length === 0 ? 'Brak oczekujących badań...' : null}
      </Table>
    </TableContainer>
  )
}

export default PendingExaminationsList
