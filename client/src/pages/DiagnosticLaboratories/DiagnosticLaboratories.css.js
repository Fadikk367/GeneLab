import styled from 'styled-components';


export const Layout = styled.section`
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 30px;
`;

export const CardFooter = styled.div`
  border-top: 1px solid grey;
  padding-top: 10px;
`;