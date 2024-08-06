import React from 'react'
import Landing from './components/Landing'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import PrimeReact from 'primereact/api';
import PrivateAdminRoutes from './privateroutes/PrivateAdminRoutes';
import PrivateEmployeeRoutes from './privateroutes/PrivateEmployeeRoutes';
import PrivateHumanResourceRoutes from './privateroutes/PrivateHumanResourceRoutes';
import QRScan from './components/QRScan';


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
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
                    <Route path="/QR" component={QRScan} />

                    {/* Admin */}
                    <PrivateAdminRoutes path="/admin" name="admin" />
                    {/* Employee */}
                    <PrivateEmployeeRoutes path="/employee" name="employee" />

                    {/* Human Resources */}
                    <PrivateHumanResourceRoutes path="/hr" name="hr" />
                </Switch>
            </Router>
    )
}

export default App