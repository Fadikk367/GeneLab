import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';


export const ListTitle = styled(Typography)`
  padding: 10px 16px;
  border-radius: 5px;
  background-color: #f0f0f0;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  gap: 20px;
`;

export const LocationSelect = styled(Select)`
  padding: 10px; 
  font-size: 1em;
`;

