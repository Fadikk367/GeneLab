import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Home, TestCatalog, About, Cart, OnlineResults, AdministrationPanel, NotFound, DiagnosticLaboratories, Login } from './pages';

import { BasketPreview, ProtectedRoute, Navigation, Logo } from 'common/components';
import { Layout, Sidebar, Center, Page, Header, Footer } from './Layout.css';
import GlobalStyles from'./index.css.js';

import { getAllTestCategories } from 'state/testCategory/testCategoryActions';



const App = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTestCategories());
  }, [dispatch]);

  const publicLinks = [
    { path: '/', text: 'Strona główna'},
    { path: '/test-catalog', text: 'Katalog badań'},
    { path: '/results', text: 'Wyniki online'},
    { path: '/about', text: 'O nas'},
  ]
  const privateLinks = [
    { path: '/admin-panel', text: 'Panel Administracyjny'},
    { path: '/laboratories', text: 'Pracownie'},
  ]

  const links = auth.isAuthentificated ? [...publicLinks, ...privateLinks] : publicLinks;

  return (
    <Layout>
      <GlobalStyles />
      <Sidebar>
        <Logo />
        <Navigation links={links}/>
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
