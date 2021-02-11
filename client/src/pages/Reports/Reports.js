import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';

import { Layout, NavList, NavItem, ActionButton } from './Reports.css';
import { PaymentsReport, EmployeesReport, LaboratoriesReport } from './components';


const Reports = () => {
  return (
    <Layout>

      <NavList>
        <NavItem>
          <NavLink to='/reports/payments'>
            <ActionButton>Płatności</ActionButton>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to='/reports/employees'>
            <ActionButton>Wyniki pracownikow</ActionButton>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to='/reports/laboratories'>
            <ActionButton>Podsumowanie laboratoriów</ActionButton>
          </NavLink>
        </NavItem>
      </NavList>

      <Switch>
        <Route exact path='/reports' render={() => (<Redirect to='/reports/payments'/>)}/>
        <Route path='/reports/payments' component={PaymentsReport}/>
        <Route path='/reports/employees' component={EmployeesReport}/>
        <Route path='/reports/laboratories' component={LaboratoriesReport}/>
      </Switch>
    </Layout>
  )
}

export default Reports;
