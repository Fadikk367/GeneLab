import React from 'react';

import { Head, BackLink } from './Headline.css';


const Headline = ({ children, ...rest }) => {
  return (
    <Head {...rest}>
      {children}
    </Head>
  )
}

Headline.BackLink = BackLink;

export default Headline;
