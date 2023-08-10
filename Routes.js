import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './src/components/Login';
import Register from './src/components/Register';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />

                {/* Add more routes as needed */}
            </Switch>
        </Router>
    );
};

export default Routes;
