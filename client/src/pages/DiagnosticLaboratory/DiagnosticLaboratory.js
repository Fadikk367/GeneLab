import React, { useEffect } from 'react';
import { useParams, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Headline } from 'common/components';
import { Icon } from 'common/icons';
import { DoExaminationForm, PendingExaminationsList } from './components';

import { getPendingExaminations } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';



const DiagnosticLaboratory = () => {
  const { laboratoryId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingExaminations(laboratoryId));
  }, [laboratoryId, dispatch]);

  const laboratory = useSelector(state => state.diagnosticLaboratory.laboratoryList).find(lab => lab.id === parseInt(laboratoryId));

  const pendingExaminations = useSelector(state => (
    state.diagnosticLaboratory.pendingExaminationsByLaboratoryId[laboratoryId]
  )) || [];

  
  return (
    <>
      <Headline>
        <Headline.BackLink to='/laboratories' underline>
          Pracownie 
          <Icon.GoBack  hide={!laboratory} size={30}/>
        </Headline.BackLink>
        {laboratory && ( '/ ' + laboratory.name)}
      </Headline>
      <PendingExaminationsList pendingExaminations={pendingExaminations} laboratoryId={laboratoryId}/>
      <Switch>
        <Route path='/laboratories/:laboratoryId/examinations/:examinationId/do'>
          <Modal title={'Wynik badania'}>
            <DoExaminationForm />
          </Modal>
        </Route>
      </Switch>
    </>
  )
}

export default DiagnosticLaboratory
