import styled from 'styled-components';
import Cell from '@material-ui/core/TableCell';


export const TableContainer = styled.table`
  padding: 30px;
  width: 100%;
  font-size: 1.1em;
`;

export const TableCell = styled(Cell)`
  && {
    font-size: 1em;
  }
`;