import React, { useEffect } from 'react';
import { useParams, Link, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Headline } from 'common/components';
import { Icon } from 'common/icons';
import { DoExaminationForm } from './components';

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

  const pendingExaminationsItems = pendingExaminations.map((item, i) => (
    <li key={item.id}>
      {i}. {item.name} \ {item.min}-{item.max} {item.unit} \ {item.id} \ {item.material} 
      <Link to={`/laboratories/${laboratoryId}/examinations/${item.id}/do`}>Wykonaj</Link>
    </li>
  ));
  
  return (
    <>
      <div>
        <Headline>
          <Headline.BackLink to='/laboratories' underline>
            Pracownie 
            <Icon.GoBack  hide={!laboratory} size={30}/>
          </Headline.BackLink>
          {laboratory && ( '/ ' + laboratory.name)}
        </Headline>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus iusto voluptatem eveniet exercitationem aperiam voluptatum molestiae qui laboriosam aliquid! Quia fuga voluptatem libero nemo, iure sed nam omnis dolor, iusto numquam nisi. Atque fugiat sit.</p>
        <ul>
          {pendingExaminationsItems}
        </ul>
      </div>
      <Switch>
        <Route path='/laboratories/:laboratoryId/examinations/:examinationId/do'>
          <Modal title={'wynik badania'}>
            <DoExaminationForm />
          </Modal>
        </Route>
      </Switch>
    </>
  )
}

export default DiagnosticLaboratory
