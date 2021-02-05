import styled from 'styled-components';


export const Image = styled.img`
  display: block;
  width: ${props => props.width + 'px' || '100%'};
  height: 100%;
  flex: 1;
`;

export const Paragraph = styled.p`
  text-align: justify;
  font-size: 1.1em;
  padding: 20px 0;
`;


