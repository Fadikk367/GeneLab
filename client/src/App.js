import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { Home, TestCatalog, About, OnlineResults, AdministrationPanel, NotFound } from './pages';

import { Layout, Sidebar, Center, Page, Header, Footer } from './Layout.css';
import GlobalStyles from'./index.css.js';


const App = () => {
  return (
    <Layout>
      <GlobalStyles />
      <Sidebar>
        <h1>GeneLab</h1>
        <nav>
          <ul>
            <li><Link to='/'>Strona główna</Link></li>
            <li><Link to='/test-catalog'>Katalog Badań</Link></li>
            <li><Link to='/results'>Wyniki online</Link></li>
            <li><Link to='/admin-panel'>Panel Administracyjny</Link></li>
            <li><Link to='/about'>O nas</Link></li>
          </ul>
        </nav>
      </Sidebar>
      <Center>
        <Header>Górny pasek kontrolny</Header>
        <Page>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/test-catalog' exact component={TestCatalog} />
            <Route path='/results' exact component={OnlineResults} />
            <Route path='/admin-panel' component={AdministrationPanel} />
            <Route path='/about' component={About} />
            <Route component={NotFound} />
          </Switch>
        </Page>
        <Footer>
          Stopka
        </Footer>
      </Center>
    </Layout>
  );
}

export default App;
