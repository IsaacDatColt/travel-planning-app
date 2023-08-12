import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const ProtectedRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user) {
        return <Route {...props} />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
