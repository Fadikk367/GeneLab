import styled from 'styled-components';


export const Table = styled.table`
  width: 1000px;
  padding: 30px;
  font-size: 1.1em;
`;

export const TableBody = styled.tbody`

`;

export const TableCell = styled.td`
  flex: ${props => props.flex || 'none'};
  width: ${props => props.width || 'default'};
  text-align: ${props => props.align || 'left'};
  padding: 12px;
`;

export const TableHead = styled.thead`
  background-color: #2fad98;;
`;

export const TableRow = styled.tr`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #AAAAAA;

  tbody &:nth-child(odd) {
    background-color: #f7f5f5;
  }
  
  tbody &:hover {
    background-color: #cbf7f1;;
  }
`;
