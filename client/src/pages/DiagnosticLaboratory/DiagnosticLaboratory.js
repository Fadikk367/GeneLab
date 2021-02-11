import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Headline } from 'common/components';
import { DoExaminationForm, PendingExaminationsList } from './components';

import { getPendingExaminations } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';



const DiagnosticLaboratory = () => {
  const laboratoryId = useSelector(state => state.auth.user.laboratoryId);
  const pendingExaminations = useSelector(state => state.diagnosticLaboratory.pendingExaminations);
  const laboratory = useSelector(state => state.diagnosticLaboratory.laboratoryList).find(lab => lab.id === laboratoryId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingExaminations());
  }, [laboratoryId, dispatch]);


  return (
    <>
      <Headline color="#454545">
        Laboratorium: {laboratory && `${laboratory.city}, ${laboratory.street} ${laboratory.number}`}<br />
        Liczba aparatów: {laboratory && `${laboratory.numberOfDevices}`}
      </Headline>
      <PendingExaminationsList pendingExaminations={pendingExaminations}/>
      <Switch>
        <Route path='/laboratory/examinations/:examinationId/do'>
          <Modal title={'Wynik badania'}>
            <DoExaminationForm />
          </Modal>
        </Route>
      </Switch>
    </>
  )
}

export default DiagnosticLaboratory
