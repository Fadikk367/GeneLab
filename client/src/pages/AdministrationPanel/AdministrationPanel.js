import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { 
  BiologicalMaterialsPanel, 
  DiagnosticLaboratoriesPanel, 
  TestCategoriesPanel,
  TestPanel,
  EmployeePositionPanel,
  EmployeePanel,
} from '../';

import { Card } from 'common/components';
import { PanelsSection } from './AdministrationPanel.css';

import { getAllBiologicalMaterials } from 'state/biologicalMaterial/biologicalMaterialActions';
import { getAllDiagnosticLaboratories } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';
import { getAllTestCategories } from 'state/testCategory/testCategoryActions';
import { getAllTests } from 'state/test/testActions';


const AdministrationPanel = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [suffix, setSuffix] = useState('');

  useEffect(() => {
    dispatch(getAllBiologicalMaterials());
    dispatch(getAllDiagnosticLaboratories());
    dispatch(getAllTestCategories());
    dispatch(getAllTests());
  }, []);

  useEffect(() => {
    const suffixesBySubpages = {
      'tests': '/Badania',
      'laboratories': '/Pracownie diagnostyczne',
      'materials': '/Materiały biologiczne',
      'test-categories': '/Kategorie badań',
      'positions': '/Stanowiska',
      'employees': '/Pracownicy',
      'admin-panel': '',
    }

    const index = location.pathname.lastIndexOf('/');
    setSuffix(suffixesBySubpages[location.pathname.substring(index+1)]);
  }, [location.pathname])

  return (
    <div>
      <h1><Link to='/admin-panel'>Panel Administracyjny</Link>{suffix}</h1>
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

export default AdministrationPanel
