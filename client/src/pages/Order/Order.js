import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import lodash from 'lodash';

import { Cart, PersonalDataForm, LocationForm, OrderSummary, PaymentMethodForm } from './components';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';



const stepLabels = ['Koszyk', 'Uzupełnij dane personalne', 'Wybierz punkt', 'Wybierz metodę płatności', 'Potwierdź zamówienie'];

function getStepContent(stepIndex, formContent) {
  switch(stepIndex) {
    case 0: return <Cart />;
    case 1: return <PersonalDataForm {...{ formContent }}/>;
    case 2: return <LocationForm {...{ formContent }}/>;
    case 3: return <PaymentMethodForm {...{ formContent }}/>;
    case 4: return <OrderSummary {...{ formContent }}/>;
    default: return <div>Error</div>;
  }
}

const InnerOrder = () => {
  // const examinationsInCart = useSelector(state => state.basket.products) || [];

  const formMethods = useFormContext();
  // const [formData, setFormData] = useState({ products: examinationsInCart });
  const [formData, setFormData] = useState({});
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const { errors, watch, trigger } = formMethods;
  const activeStepForm = watch();

  console.log(errors);

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
        isStepFinished = await trigger(['selectedPoint', 'selectedPoint.city']);
        setFormData({ ...formData, ...activeStepForm});
        break;
      case 3:
        isStepFinished = await trigger(['paymentMethod']);
        setFormData({ ...formData, ...activeStepForm});
        break;
      case 4:
        isStepFinished = lodash.isEmpty(errors);

        if (isStepFinished) {
          console.log('SUBMIT ORDER FORM', { formData })
        }
        break;
      default:
        return 'Invalid step';
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
    <>
      <h2>Order page</h2>
      <Stepper activeStep={activeStepIndex} alternativeLabel>
        {stepLabels.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {getStepContent(activeStepIndex, formData)}
      </div>
      <div>
        <Button onClick={handlePreviousStep}>Cofnij</Button>
        <Button onClick={handleNextStep}>{activeStepIndex === stepLabels.length - 1? 'Złóż zamówienie' : 'Dalej'}</Button>
      </div>
    </>
  )
}

const Order = () => {
  const formMethods = useForm({ mode: 'onBlur' });

  return (
    <FormProvider {...formMethods}>
      <InnerOrder />
    </FormProvider>
  )
}

export default Order;
