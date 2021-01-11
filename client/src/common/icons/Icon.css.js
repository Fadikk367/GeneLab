import styled from 'styled-components';

export const StyledSVG = styled.svg`
  display: ${props => props.hide ? 'none' : 'default'};
  width: ${props => props.size || 20}px;
  height: ${props => props.size || 20}px;
  fill: ${props => props.fill || 'black'};
  stroke: ${props => props.stroke || 'transparent'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
`;