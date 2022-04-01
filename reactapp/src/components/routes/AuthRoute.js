import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ children, currentUser, ...rest }) => {
    return <Route {...rest}>{currentUser ? children : <Redirect to='/signin' />}</Route>;
};

export default AuthRoute;
