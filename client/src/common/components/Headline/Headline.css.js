import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const Head = styled.h2`
  margin: 20px 30px;

  font-size: 2em;
  letter-spacing: 1px;
  font-weight: 700;
  color: ${props => props.color || '#12a9a0'};
`;


export const BackLink = styled(Link)`
  color: ${props => props.color || '#454545'};
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
  font-weight: 700;
`;