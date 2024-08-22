
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { user } = useContext(AuthContext);

  
    if (!user) {
        return <Navigate to="/login" replace />;
    }

   
    return <Element {...rest} />;
};

export default PrivateRoute;

