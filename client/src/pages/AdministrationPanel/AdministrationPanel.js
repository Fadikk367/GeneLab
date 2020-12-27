import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { 
  BiologicalMaterialsPanel, 
  DiagnosticLaboratoriesPanel, 
  TestCategoriesPanel,
  TestPanel,
} from '../';
import { } from './components';

import { getAllBiologicalMaterials } from 'state/biologicalMaterial/biologicalMaterialActions';
import { getAllDiagnosticLaboratories } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';
import { getAllTestCategories } from 'state/testCategory/testCategoryActions';


const AdministrationPanel = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [suffix, setSuffix] = useState('');

  useEffect(() => {
    dispatch(getAllBiologicalMaterials());
    dispatch(getAllDiagnosticLaboratories());
    dispatch(getAllTestCategories());
  }, []);

  useEffect(() => {
    const index = location.pathname.lastIndexOf('/');
    setSuffix('/' + location.pathname.substring(index+1));
  }, [location.pathname])

  return (
    <div>
      <h1><Link to='/admin-panel'>Panel Administracyjny</Link>{suffix}</h1>
      <hr/>
      <Switch>
        <Route path='/admin-panel' exact>
          <ul>
            <li><Link to='/admin-panel/tests'>Test Panel</Link></li>
            <li><Link to='/admin-panel/materials'>Materials Panel</Link></li>
            <li><Link to='/admin-panel/laboratories'>Laboratories Panel</Link></li>
            <li><Link to='/admin-panel/test-categories'>Test categoires panel</Link></li>
          </ul>
        </Route>
        <Route path='/admin-panel/tests' component={TestPanel}/>
        <Route path='/admin-panel/materials' component={BiologicalMaterialsPanel}/>
        <Route path='/admin-panel/laboratories' component={DiagnosticLaboratoriesPanel}/>
        <Route path='/admin-panel/test-categories' component={TestCategoriesPanel}/>
      </Switch>
    </div>
  )
}

export default AdministrationPanel
