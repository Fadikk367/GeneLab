import styled from 'styled-components';


export const List = styled.ul`
  list-style-type: none;
  padding: 0 10px;
`;

export const ListContainer = styled.div`
  width: ${props => props.width || '600'}px;
`;

export const ListTitle = styled.h3`
  font-size: 1.3em;
  padding: 10px;
  border-bottom: 1px solid black;
  margin: 10px;
`;

List.Container = ListContainer;
List.Title = ListTitle;

export default List;