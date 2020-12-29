import styled from 'styled-components';

export const StyledSVG = styled.svg`
  width: ${props => props.size || 20}px;
  height: ${props => props.size || 20}px;
  fill: ${props => props.fill || 'black'};
  stroke: ${props => props.stroke || 'transparent'};
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
`;