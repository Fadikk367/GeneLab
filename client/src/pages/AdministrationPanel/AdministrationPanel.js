import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { 
  BiologicalMaterialsPanel, 
  DiagnosticLaboratoriesPanel, 
  TestCategoriesPanel,
  TestPanel,
  EmployeePositionPanel,
} from '../';
import { PanelTile } from './components';
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
            <PanelTile panelName='Badania' link='/admin-panel/tests'/>
            <PanelTile panelName='Materiały biologiczne' link='/admin-panel/materials'/>
            <PanelTile panelName='Pracownie diagnostyczne' link='/admin-panel/laboratories'/>
            <PanelTile panelName='Kategorie badań' link='/admin-panel/test-categories'/>
            <PanelTile panelName='Stanowiska' link='/admin-panel/positions'/>
          </PanelsSection>
        </Route>
        <Route path='/admin-panel/tests' component={TestPanel}/>
        <Route path='/admin-panel/materials' component={BiologicalMaterialsPanel}/>
        <Route path='/admin-panel/laboratories' component={DiagnosticLaboratoriesPanel}/>
        <Route path='/admin-panel/test-categories' component={TestCategoriesPanel}/>
        <Route path='/admin-panel/positions' component={EmployeePositionPanel}/>
      </Switch>
    </div>
  )
}

export default AdministrationPanel
