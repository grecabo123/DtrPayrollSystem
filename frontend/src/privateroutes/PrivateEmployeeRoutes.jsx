import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import Employee from '../components/Users/Employee';

function PrivateEmployeeRoutes({ ...rest }) {
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setloading] = useState(true);
    const history = useHistory();
    useEffect(() => {
        axios.get(`/api/employee`).then(res => {
            if (res.data.status === 200 && res.data.role === 4) {
                setAuthenticated(true)
            }
            setloading(false);
        }).catch((err) => {
            if (err.response.status === 500) {
                swal("Warning", err.response.statusText, 'warning');
                history.push('/');
            }
        });

        return () => {
            setAuthenticated(false);
        }
        // eslint-disable-next-line
    }, []);


    // Unauthorized code
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            swal("Unauthorized", err.response.data.message, 'warning');
            history.push('/');
        }
        return Promise.reject(err);
    });
    axios.interceptors.response.use(function (response) {
        return response
    }, function (error) {

        // Forbidden
        if (error.response.status === 403) {
            // Accountant
            if (error.response.data.token === 2) {
                swal("Warning", error.response.data.message, "warning");
                history.push('/accountant')
            }
            // HR
            else if(error.response.data.token === 3) {
                swal("Warning",error.response.data.message, 'warning');
                history.push(`/HR`)
            }
            // Admin
            else if(error.response.data.token === 1) {
                swal("Warning",error.response.data.message,'warning');
                history.push(`/admin`);
            }
        }
        // Page Not Found
        else if (error.response.status === 404) {
            swal('Error', "Page Not Found", 'error');
            history.push('/admin')
        }
        return Promise.reject(error);
    }
    );


    if (loading) {
        return <h4></h4>
    }

    return (
        <Route {...rest}
            render={({ props, location }) =>
                Authenticated ?
                    (<Employee {...rest} />) :
                    (<Redirect to={{ pathname: '/', state: { from: location } }} />)
            }

        />
    )
}

export default PrivateEmployeeRoutes