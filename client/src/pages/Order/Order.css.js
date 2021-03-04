import styled from 'styled-components';
import { styled as styledMui } from '@material-ui/styles';

import Stepper from '@material-ui/core/Stepper';


export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-template-rows: 100px 1fr;
  grid-gap: 30px;
  padding: 30px;
  height: calc(100vh - 60px);

  justify-content: center;
  /* align-items: center; */

  & > :nth-child(1) {
    grid-column: 1/-1;
  }

  & > :nth-child(2) {
    grid-column: 1;
  }

  & > :nth-child(3) {
    grid-column: 2;
  }
`;


export const OrderStepper = styled(Stepper)`
  & .MuiStepIcon-root.MuiStepIcon-active {
    color: #2fad98;
    /* width: 1.3em;
    height: 1.3em; */
  }

  & .MuiStepIcon-root.MuiStepIcon-completed {
    color: #2fad98;
  }

  & .MuiStepIcon-root {
    color: #cccccc;
    width: 1.1em;
    height: 1.1em;
  }
`;


export const StepContent = styled.div`

`;


export const ControlButtons = styled.div`
  display: flex;
  position: sticky;
  flex-direction: column;
  gap: 5px;
`;