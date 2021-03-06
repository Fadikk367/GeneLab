import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { Wrapper, Header, Offers, OfferCard } from './Home.css';



const Home = () => {
  return (
    <Wrapper>
      <Header>
        <Typography variant='h3' align='center'>Witaj w GeneLab</Typography>
        <Typography variant='h4' align='center'>Zadbaj o swoje zdrowie już teraz</Typography>
      </Header>
    </Wrapper>
  )
}

export default Home;
