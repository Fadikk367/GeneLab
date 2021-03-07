import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';


export const ListTitle = styled(Typography)`
  padding: 10px 16px;
  border-radius: 5px;
  background-color: #f0f0f0;
`;

export const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 30px;
  padding: 30px 0;
`;

export const MethodCard = styled.div`
  background-color: #ededed;
  height: 200px;
  cursor: pointer;
  border: 4px solid ${props => props.isSelected ? '#2fad98' : 'transparent'};
  transition: background-color 0.15s ease-in-out;
  font-size: 1.1em;
  font-weight: 300;
  letter-spacing: 1px;

  -webkit-box-shadow: 3px 3px 5px -1px rgba(135,135,135,1);
  -moz-box-shadow: 3px 3px 5px -1px rgba(135,135,135,1);
  box-shadow: 3px 3px 5px -1px rgba(135,135,135,1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  

  &:hover {
    background-color: #dddddd;
  }

  &:active {
    background-color: #cdcdcd;
  }
`;