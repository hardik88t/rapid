import React from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';

const withAuth = (Component) => {
    return function AuthComponent(props) {
        const [cookies] = useCookies(['access_token']);
        const isAuthenticated = cookies.access_token !== undefined;

        if (!isAuthenticated) {
            return <Redirect to="/login" />;
        }

        return <Component {...props} />;
    };
};

export default withAuth;
