import styled from 'styled-components';

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 7px 10px;

  ${props => props.header ? 'font-size: 1.1em;' : null}
  ${props => props.header ? 'color: white;' : null}
  ${props => props.header ? 'background-color: #15857e !important;' : null}
  ${props => props.header ? `
    & > :last-child {
      visibility: hidden;
    }
  ` : null}

  &:nth-child(odd) {
    background-color: #f2f2f2;
  }
`;

export const Lp = styled.span`
  font-style: italic;
  font-weight: 200;
  width: 30px;
`;

export const Cell = styled.span`
  flex: ${props => props.flex || 'none'};
  width: ${props => props.width || 'auto'}px;
  padding: 10px 0;
`;

export const ItemControls = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  flex: ${props => props.flex || 'none'};
  width: ${props => props.width || 'auto'}px;
`;

export const Control = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #15857e;
  font-size: 1.3em;
  color: white;

  margin-left: 5px;
`;


ListItem.Lp = Lp;
ListItem.Cell = Cell;
ListItem.ItemControls = ItemControls;
ListItem.Control = Control;

export default ListItem;