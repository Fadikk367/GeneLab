import styled from 'styled-components';

export const CardWrapper = styled.article`
  /* text-decoration: none; */
  color: black;

  box-shadow: 6px 7px 14px -3px rgba(0,0,0,0.73);
  /* border-radius: 5px; */

  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;


export const Title = styled.h3`
  background-color: #2fad98;
  font-size: 1.3em;
  color: white;
  font-weight: 500;
  padding: 10px;
`;


export const CardContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;