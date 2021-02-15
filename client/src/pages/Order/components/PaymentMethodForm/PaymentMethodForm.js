import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const PaymentMethodForm = ({ formContent }) => {
  const { register, trigger, reset } = useFormContext();

  useEffect(() => {
    reset({ ...formContent.paymentMethod }, { errors: true });
  }, []);

  return (
    <form>
      <select name="paymentMethod" ref={register({ required: true })} onBlur={() => trigger('paymentMethod')} autoFocus>
        <option value='gotowka'>gotowka</option>
        <option value='przelew'>przelew</option>
        <option value='blik'>blik</option>
      </select>
    </form>
  )
}

export default PaymentMethodForm;
