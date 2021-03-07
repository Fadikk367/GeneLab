import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import lodash from 'lodash';

import { Cart, PersonalDataForm, LocationForm, OrderSummary, OrderConfirmation, PaymentMethodForm } from './components';
import { Layout, OrderStepper, StepContent, ControlButtons } from './Order.css';
import { Button } from 'common/components';

import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { confirmOrder, clearOrderInformations } from 'state/clientBasket/clientBasketActions';


const stepLabels = ['Koszyk', 'Uzupełnij dane personalne', 'Wybierz punkt', 'Wybierz metodę płatności', 'Potwierdź zamówienie'];

function getStepContent(stepIndex, formContent) {
  switch(stepIndex) {
    case 0: return <Cart />;
    case 1: return <PersonalDataForm {...{ formContent }}/>;
    case 2: return <LocationForm {...{ formContent }}/>;
    case 3: return <PaymentMethodForm {...{ formContent }}/>;
    case 4: return <OrderSummary {...{ formContent }}/>;
    case 5: return <OrderConfirmation />;
    default: return <div>Error</div>;
  }
}

function getNextButtonText(stepIndex) {
  switch(stepIndex) {
    case 4: return 'Złóż zamówienie';
    case 5: return 'OK';
    default: return 'kolejny krok'
  }
}


const Order = () => {
  const formMethods = useFormContext();
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const { errors, watch, trigger } = formMethods;
  const activeStepForm = watch();


  const handleNextStep = async () => {
    let isStepFinished = true;

    switch(activeStepIndex) {
      case 0:
        isStepFinished = await trigger('products');
        setFormData({ ...formData, ...activeStepForm});
        break;
      case 1:
        isStepFinished = await trigger(['firstName', 'lastName', 'pesel', 'birthDate']);
        setFormData({ ...formData, personalData: activeStepForm});
        break;
      case 2:
        isStepFinished = await trigger('selectedPoint');
        setFormData({ ...formData, ...activeStepForm});
        break;
      case 3:
        isStepFinished = await trigger(['paymentMethod']);
        setFormData({ ...formData, ...activeStepForm});
        break;
      case 4:
        isStepFinished = lodash.isEmpty(errors);

        if (isStepFinished) {
          console.log('SUBMIT ORDER FORM', { formData });
          dispatch(confirmOrder(formData));
        }
        break;
      case 5:
        dispatch(clearOrderInformations());
        history.push('/test-catalog');
        break;
      default:
        isStepFinished = false;
    }

    if (isStepFinished) {
      setActiveStepIndex(prev => prev + 1);
    }
  }


  const handlePreviousStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);

      switch(activeStepIndex) {
        case 1:
          setFormData({ ...formData, personalData: activeStepForm});
          break;
        case 2:
          setFormData({ ...formData, ...activeStepForm});
          break;
        case 3:
          setFormData({ ...formData, ...activeStepForm});
          break;
        case 4:
          break;
        default:
          return 'Invalid step'
      }
    }
  }


  return (
    <Layout>
      <OrderStepper activeStep={activeStepIndex} alternativeLabel>
        {stepLabels.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </OrderStepper>
      <StepContent>
        {getStepContent(activeStepIndex, formData)}
      </StepContent>
      <ControlButtons>
        <Button onClick={handlePreviousStep} style={{ display: `${activeStepIndex === stepLabels.length ? 'none' : 'block'}`}}>Cofnij</Button>
        <Button onClick={handleNextStep}>{getNextButtonText(activeStepIndex)}</Button>
      </ControlButtons>
    </Layout>
  )
}

const OrderWrapper = () => {
  const formMethods = useForm({ mode: 'onBlur' });

  return (
    <FormProvider {...formMethods}>
      <Order />
    </FormProvider>
  )
}

export default OrderWrapper;
