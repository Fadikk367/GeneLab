import styled from 'styled-components';

export const Layout = styled.div`
  height: 100vh;
  display: flex;
`;

export const Sidebar = styled.aside`
  width: 300px;
  min-width: 300px;
  background-color: lightblue;
`;

export const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  height: 60px;
  background-color: lightcyan;
  display: flex;
  justify-content: space-between;
`;

export const Page = styled.main`
  flex-grow: 1;
  overflow-y: scroll;
`;

export const Footer = styled.footer`
  background-color: lightsteelblue;
`;