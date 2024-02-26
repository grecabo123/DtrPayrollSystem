import React from 'react'
import Landing from './components/Landing'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import PrimeReact from 'primereact/api';
import PrivateAdminRoutes from './privateroutes/PrivateAdminRoutes';


axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";


axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})


function App() {

    PrimeReact.ripple = true;

    return (
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={Landing} />
                    <Route path="/login" component={Login} />

                    <PrivateAdminRoutes path="/admin" name="admin" />
                </Switch>
            </Router>
    )
}

export default App