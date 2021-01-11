import styled from 'styled-components';

export const Layout = styled.div`
  height: 100vh;
  display: flex;
`;

export const Sidebar = styled.aside`
  width: 300px;
  min-width: 300px;
  background-color: #15857e;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

export const Center = styled.div`
  flex: 1;
  width: calc(100vw - 300px);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  height: 60px;
  background-color: lightcyan;
  display: flex;
  justify-content: space-between;
  z-index: 99;

  -webkit-box-shadow: 0px 0px 21px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 21px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 21px 0px rgba(0,0,0,0.75);
`;

export const Page = styled.main`
  flex-grow: 1;
  overflow-y: scroll;
`;

export const Footer = styled.footer`
  background-color: lightsteelblue;
`;