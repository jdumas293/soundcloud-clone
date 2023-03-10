import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user);
  // console.log("USER==>", user);
  return (
    <Route {...props}>
        {(user)? props.children  : <Redirect to='/splash' />}
    </Route>
  )
};


export default ProtectedRoute;