import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Home, TestCatalog, About, Cart, OnlineResults, AdministrationPanel, NotFound, DiagnosticLaboratories, Login } from './pages';

import { BasketPreview, ProtectedRoute } from 'common/components';
import { Layout, Sidebar, Center, Page, Header, Footer } from './Layout.css';
import GlobalStyles from'./index.css.js';


const App = () => {
  const auth = useSelector(state => state.auth);

  const publicLinks = [
    <li><Link to='/'>Strona główna</Link></li>,
    <li><Link to='/test-catalog'>Katalog Badań</Link></li>,
    <li><Link to='/results'>Wyniki online</Link></li>,
    <li><Link to='/about'>O nas</Link></li>
  ]
  const privateLinks = [
    <li><Link to='/admin-panel'>Panel Administracyjny</Link></li>,
    <li><Link to='/laboratories'>Pracownie</Link></li>,
  ]

  const navLinks = auth.isAuthentificated ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <Layout>
      <GlobalStyles />
      <Sidebar>
        <h1>GeneLab</h1>
        <nav>
          <ul>
            {navLinks}
          </ul>
        </nav>
      </Sidebar>
      <Center>
        <Header>
          Górny pasek kontrolny
          <BasketPreview />
        </Header>
        <Page>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/test-catalog' exact component={TestCatalog} />
            <Route path='/results' exact component={OnlineResults} />
            <ProtectedRoute path='/laboratories' auth={auth} component={DiagnosticLaboratories} />
            <ProtectedRoute path='/admin-panel' auth={auth} component={AdministrationPanel} />
            <Route path='/login' component={Login} />
            <Route path='/cart' component={Cart} />
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
