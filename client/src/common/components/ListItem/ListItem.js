import styled from 'styled-components';

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;

  font-size: 1.1.em;

  ${props => props.header ? 'font-weight: bold;' : null}
  ${props => props.header ? 'background-color: lightskyblue !important;' : null}
  ${props => props.header ? `
    & > :last-child {
      visibility: hidden;
    }
  ` : null}

  &:nth-child(odd) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: lightgrey;
  }
`;

export const Lp = styled.span`
  font-style: italic;
  font-weight: 200;
  width: 20px;
`;

export const Cell = styled.span`
  flex: ${props => props.flex || 'none'};
  width: ${props => props.width || 'auto'}px;
  padding: 0 10px;
`;

export const ItemControls = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  /* padding: 10px; */
`;

export const Control = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: grey;
  font-size: 1.3em;

  margin-left: 5px;
`;


ListItem.Lp = Lp;
ListItem.Cell = Cell;
ListItem.ItemControls = ItemControls;
ListItem.Control = Control;

export default ListItem;