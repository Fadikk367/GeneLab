import React from 'react'
import { Redirect, Route } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, auth, ...rest}) => {
  return (
    <Route 
      {...rest} 
      render={props => 
        auth.isAuthentificated 
        ? <Component auth={auth} {...props}/> 
        : <Redirect to='/login' from={rest.to}/>
      }
    />
  )
}

export default ProtectedRoute;
