import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { DiagnosticLaboratory } from 'pages';
import { Card } from 'common/components';
import { Layout, CardFooter } from './DiagnosticLaboratories.css';

import { getLaboratoriesWorkOccupancy, getAllDiagnosticLaboratories } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';


const DiagnosticLaboratories = () => {
  const { laboratoryList, workOccupancyByLaboratoryId } = useSelector(state => state.diagnosticLaboratory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiagnosticLaboratories());
    dispatch(getLaboratoriesWorkOccupancy());
  }, [dispatch]);

  const laboratoryCards = laboratoryList.map(laboratory => {
    const laboratoryWorkOccupancy = workOccupancyByLaboratoryId[laboratory.id];

    return (
      <Card 
        key={laboratory.id} 
        title={laboratory.name} 
        link={`/laboratories/${laboratory.id}`}
      >
        <CardFooter>Oczekujące badania: {laboratoryWorkOccupancy ? laboratoryWorkOccupancy.pending : 0}</CardFooter>
      </Card>
    )
  });

  return (
    <div>
      <Switch>
        <Route path='/laboratories' exact>
          <h1>Pracownie</h1>
          <Layout>
            {laboratoryCards}
          </Layout>
        </Route>
        <Route path='/laboratories/:laboratoryId' component={DiagnosticLaboratory}/>
      </Switch>
    </div>
  )
}

export default DiagnosticLaboratories;
