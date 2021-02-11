import React from 'react';
import { Link } from 'react-router-dom';

import { Table, TableBody, TableHead, TableRow, TableCell } from './PendingExaminationsList.css';


const PendingExaminationsList = ({ pendingExaminations = [] }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width={30}>Lp.</TableCell>
          <TableCell flex={4}>Nazwa</TableCell>
          <TableCell flex={2} align='right'>Przedział</TableCell>
          <TableCell flex={2}>Jednostka</TableCell>
          <TableCell flex={2}>Materiał</TableCell>
          <TableCell flex={1}>id</TableCell>
          <TableCell flex={1}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pendingExaminations.map((row, i) => (
          <TableRow key={row.name}>
            <TableCell width={30}>{i}</TableCell>
            <TableCell flex={4}>{row.name}</TableCell>
            <TableCell flex={2} align='right'>{row.min}-{row.max}</TableCell>
            <TableCell flex={2}>{row.unit}</TableCell>
            <TableCell flex={2}>{row.material}</TableCell>
            <TableCell flex={1}>{row.id}</TableCell>
            <TableCell flex={1} align='right'>
              <Link to={`/laboratory/examinations/${row.id}/do`}>Wykonaj</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {pendingExaminations.length === 0 ? 'Brak oczekujących badań...' : null}
    </Table>
  )
}

export default PendingExaminationsList
