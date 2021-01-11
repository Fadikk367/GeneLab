import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReplyIcon from '@material-ui/icons/Reply';

import { 
  BiologicalMaterialsPanel, 
  DiagnosticLaboratoriesPanel, 
  TestCategoriesPanel,
  TestPanel,
  EmployeePositionPanel,
  EmployeePanel,
} from '../';

import { Card, Headline } from 'common/components';
import { Icon } from 'common/icons';
import { PanelsSection } from './AdministrationPanel.css';


const AdministrationPanel = () => {
  const location = useLocation();
  const [suffix, setSuffix] = useState('');

  useEffect(() => {
    const suffixesBySubpages = {
      'tests': '/ Badania',
      'laboratories': '/ Pracownie diagnostyczne',
      'materials': '/ Materiały biologiczne',
      'test-categories': '/ Kategorie badań',
      'positions': '/ Stanowiska',
      'employees': '/ Pracownicy',
      'admin-panel': '',
    }

    const index = location.pathname.lastIndexOf('/');
    setSuffix(suffixesBySubpages[location.pathname.substring(index+1)]);
  }, [location.pathname])

  return (
    <div>
      <Headline>
        <Headline.BackLink to='/admin-panel' underline={suffix}>
          Panel Administracyjny 
          <Icon.GoBack  hide={!suffix} size={30}/>
        </Headline.BackLink>
        {suffix}
      </Headline>
      <hr/>
      <Switch>
        <Route path='/admin-panel' exact>
          <PanelsSection>
            <Card title='Badania' link='/admin-panel/tests'/>
            <Card title='Materiały biologiczne' link='/admin-panel/materials'/>
            <Card title='Pracownie diagnostyczne' link='/admin-panel/laboratories'/>
            <Card title='Kategorie badań' link='/admin-panel/test-categories'/>
            <Card title='Stanowiska' link='/admin-panel/positions'/>
            <Card title='Pracownicy' link='/admin-panel/employees'/>
          </PanelsSection>
        </Route>
        <Route path='/admin-panel/tests' component={TestPanel}/>
        <Route path='/admin-panel/materials' component={BiologicalMaterialsPanel}/>
        <Route path='/admin-panel/laboratories' component={DiagnosticLaboratoriesPanel}/>
        <Route path='/admin-panel/test-categories' component={TestCategoriesPanel}/>
        <Route path='/admin-panel/positions' component={EmployeePositionPanel}/>
        <Route path='/admin-panel/employees' component={EmployeePanel}/>
      </Switch>
    </div>
  )
}

export default AdministrationPanel;
