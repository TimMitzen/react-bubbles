import React from 'react';
import {Route,Redirect} from 'react-router-dom';

export const Private = ({component: Component, ...rest}) =>{
   let loggedIn = localStorage.getItem('token');
   return(
      <Route {...rest} render={props=>{
         return loggedIn? <Component {...props}/> : <Redirect to={'/'}/>}}/>
   )
}