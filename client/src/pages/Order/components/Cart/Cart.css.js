import styled from 'styled-components';

import RawListItem from '@material-ui/core/ListItem';
import RawListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


export const ListTitle = styled(Typography)`
  padding: 10px 16px;
  border-radius: 5px;
  background-color: #f0f0f0;
`;

export const ListItem = styled(RawListItem)`
  gap: 20px;
`;

export const ListItemText = styled(RawListItemText)`
  && {
    flex: ${props => props.flex || 1};
    text-align: ${props => props.textAlign || 'left'};
  }
`;


