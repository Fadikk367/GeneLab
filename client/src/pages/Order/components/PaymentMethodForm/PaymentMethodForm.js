import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ListTitle, PaymentMethods, MethodCard } from './PaymentMethodForm.css';


const PaymentMethodForm = ({ formContent }) => {
  const { register, reset, setValue, errors } = useFormContext();
  const [selectedMethod, setSelectedMethod] = useState(formContent.paymentMethod);

  useEffect(() => {
    reset({ ...formContent.paymentMethod }, { errors: true });
    register({ name: 'paymentMethod', type: 'custom', value: formContent.paymentMethod }, { required: 'Wybierz metodę płatności'});
  }, []);

  const handleSelectPaymentMethod = method => {
    setValue('paymentMethod', method);
    setSelectedMethod(method);
  }

  console.log(formContent.paymentMethod === 'gotowka');

  return (
    <>
      <ListTitle variant='h6'>Wybierz metodę płatności:</ListTitle>
      <PaymentMethods>
        <MethodCard 
          onClick={() => handleSelectPaymentMethod('gotowka')}
          isSelected={selectedMethod === 'gotowka'}
        >
          gotowka
        </MethodCard>
        <MethodCard 
          onClick={() => handleSelectPaymentMethod('przelew')}
          isSelected={selectedMethod === 'przelew'}
        >
          przelew
        </MethodCard>
        <MethodCard 
          onClick={() => handleSelectPaymentMethod('karta')}
          isSelected={selectedMethod === 'karta'}
        >
          karta
        </MethodCard>
      </PaymentMethods>
      <div>{errors.paymentMethod && errors.paymentMethod.message}</div>
    </>
  )
}

export default PaymentMethodForm;
