import styled from 'styled-components';

export const Tile = styled.article`
  /* text-decoration: none; */
  color: black;

  box-shadow: 6px 7px 14px -3px rgba(0,0,0,0.73);
  /* border-radius: 5px; */

  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;


export const TileHeader = styled.h3`
  background-color: #2fad98;
  font-size: 1.3em;
  color: white;
  font-weight: 500;
  padding: 10px;
`;

export const TileContent = styled.div`
  padding: 10px;
`;