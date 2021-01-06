import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
      <Card key={laboratory.id} title={laboratory.name} link={`/laboratories/${laboratory.name}`}>
        <CardFooter>Oczekujące badania: {laboratoryWorkOccupancy ? laboratoryWorkOccupancy.pending : 0}</CardFooter>
      </Card>
    )
  });

  return (
    <div>
      <h2>Podstrona tylko dla pracownikó z kartami poszczególnych pracowni wraz z informacjami o ich obłożeniu pracą</h2>
      <Layout>
        {laboratoryCards}
      </Layout>
    </div>
  )
}

export default DiagnosticLaboratories;
