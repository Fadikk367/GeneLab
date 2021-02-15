import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { 
  Home, 
  TestCatalog,  
  Cart, 
  OnlineResults,
  AdministrationPanel, 
  NotFound, 
  DiagnosticLaboratory, 
  Login, 
  Reports,
  Order,
} from './pages';

import { BasketPreview, ProtectedRoute, Navigation, Logo, EmployeeInfoBox } from 'common/components';
import { Layout, Sidebar, Center, Page, Header, Footer } from './Layout.css';
import GlobalStyles from'./index.css.js';

import { getAllExaminationCategories } from 'state/examination/examinationActions';
import { getAllDiagnosticLaboratories } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';

import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExaminationCategories());
    dispatch(getAllDiagnosticLaboratories());
  }, [dispatch]);

  const publicLinks = [
    { path: '/', text: 'Strona główna'},
    { path: '/test-catalog', text: 'Katalog badań'},
    { path: '/results', text: 'Wyniki online'},
    { path: '/order', text: 'Zamówienie'},
  ]

  const loginLink = { path: '/login', text: 'Zaloguj się'}

  const privateLinks = [
    { path: '/admin-panel', text: 'Panel Administracyjny'},
    { path: '/laboratory', text: 'Laboratorium'},
    { path: '/reports', text: 'Raporty'},
  ]

  const links = auth.isAuthentificated ? [...publicLinks, ...privateLinks] : [...publicLinks, loginLink];

  return (
    <Layout>
      <GlobalStyles />
      <Sidebar>
        <Navigation links={links}/>
        {auth.isAuthentificated ? <EmployeeInfoBox user={auth.user}/> : null}
      </Sidebar>
      <Center>
        <Header>
          <Logo />
          <BasketPreview />
        </Header>
        <Page>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/test-catalog' exact component={TestCatalog} />
            <Route path='/cart' component={Cart} />
            <Route path='/results' exact component={OnlineResults} />
            <Route path='/order' exact component={Order} />
            <Route path='/login' component={Login} />
            <ProtectedRoute path='/admin-panel' auth={auth} component={AdministrationPanel} />
            <ProtectedRoute path='/laboratory' auth={auth} component={DiagnosticLaboratory} />
            <ProtectedRoute path='/reports' auth={auth} component={Reports} />
            <Route component={NotFound} />
          </Switch>
        </Page>
      </Center>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  );
}

export default App;
