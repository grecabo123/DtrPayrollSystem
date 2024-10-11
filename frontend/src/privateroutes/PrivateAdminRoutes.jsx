import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Redirect, Route, useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import Dashboard from '../components/Dashboard/Dashboard';

function PrivateAdminRoutes({ ...rest }) {
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setloading] = useState(true);
    const history = useHistory();
    const [UserData, setUserData] = useState({
        role: "",
        uid: "",
        user_uid: "",
    })
    useEffect(() => {
        axios.get(`/api/checking`).then(res => {
            if (res.data.status === 200 && res.data.role === 1) {
                setAuthenticated(true)
                setUserData({
                    role: res.data.role,
                    uid: res.data.uid,
                    user_uid: res.data.user_id,
                })
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
            // Users
            if (error.response.data.token === 2) {
                swal("Warning", error.response.data.message, "warning");
                history.push('/user')
            }
            else if(error.response.data.token === 4) {
                swal("Warning",error.response.data.message,'warning');
                history.push(`/employee`);
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
                    (<Dashboard {...rest} user={UserData} />) :
                    (<Redirect to={{ pathname: '/', state: { from: location } }} />)
            }

        />
    )
}

export default PrivateAdminRoutes