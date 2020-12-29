import styled from 'styled-components';


export const CategoryListHeader = styled.h3`
  background-color: #15857e;
  font-weight: 400;
  font-size: 1.3em;
  padding: 10px;
  color: white;
`;

export const CategoryList = styled.ul`
  list-style-type: none;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const CategoryItem = styled.li`
  padding: 10px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s ease-in-out;
  transition: padding 0.2s ease-in-out;

  &:hover {
    background-color: #cbf7f1 !important;
    /* transform: translateX(20px); */
    padding-left: 20px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #cbf7f1;
  }
`;