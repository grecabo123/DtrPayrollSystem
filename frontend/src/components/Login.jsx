import React, { useState } from 'react'
import { Navigation } from '../utils/template'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import axios from 'axios';
import swal from 'sweetalert'

function Login() {

    const [LoginData, setLogin] = useState({
        email: "",
        password: "",
        error: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...LoginData, [e.target.name]: e.target.value });
    }


    const LoginForm = (e) => {
        e.preventDefault();

        const data = {
            email: LoginData.email,
            password: LoginData.password,
        };

        axios.post(`/api/Login`, data).then(res => {
            if (res.data.status === 200) {
                // admin
                if (res.data.role === 1) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_id", res.data.id);
                    localStorage.setItem('auth_name', res.data.name);
                    swal('Success', res.data.message, 'success')
                    history.push('/admin');
                }
                // Human Resources
                else if (res.data.role === 2) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_id", res.data.id);
                    localStorage.setItem('auth_name', res.data.name);
                    swal('Success', res.data.message, 'success')
                    history.push('/HR');
                }
                // Accountant
                else if (res.data.role === 3) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_id", res.data.id);
                    localStorage.setItem('auth_name', res.data.name);
                    swal('Success', res.data.message, 'success')
                    history.push('/accountant');
                }

                // Employee
                else {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_id", res.data.id);
                    localStorage.setItem('auth_name', res.data.name);
                    swal('Success', res.data.message, 'success')
                    history.push('/employee');
                }
            }
            else {
                setLogin({ ...LoginData, error: res.data.error });
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    return (
        <>
            <Navigation />
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-5">
                            <form onSubmit={LoginForm}>
                                <div className="container">
                                    <h1 className="text-center">Login</h1>
                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <label htmlFor="" className="form-label">
                                                Email
                                            </label>
                                            <InputText type='email' className='w-100 p-inputtext-sm' placeholder='Email Address' name='email' onChange={handleInput} />
                                            <span className='text-danger'>{LoginData.error.email}</span>
                                        </div>
                                        <div className="col-lg-12 mb-3">
                                            <label htmlFor="" className="form-label">
                                                Password
                                            </label>
                                            <InputText type='password' className='w-100 p-inputtext-sm' placeholder='Password' name='password' onChange={handleInput} />
                                            <span className='text-danger'>{LoginData.error.password}</span>
                                        </div>
                                        <div className="mt-3">
                                            <Button className='w-100 p-button-info p-button-sm' label='Login' />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login