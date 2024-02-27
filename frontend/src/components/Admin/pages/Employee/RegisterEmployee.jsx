import axios from 'axios';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import React, { useEffect, useState } from 'react'

function RegisterEmployee() {

    const [Department,setDepartment] = useState([]);
    

    useEffect(() => {
        axios.get(`/api/FetchDataStatus`).then(res => {
            if(res.data.status === 200) {
                setDepartment(res.data.data);
            }
        }).catch((error) => {
            if(error.response.status === 500) {

            }
        })
    },[]);

    const ListDept = Department.map((data) => {
        return (
            {label: data.department, value: data.id}
        )
    })

    const RegisterEmployee = (e) => {
        e.preventDefault();
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <Panel header="Register Employee">
                    <form onSubmit={RegisterEmployee}>
                        <Divider>
                            <span className='p-tag'>Personal Details</span>
                        </Divider>
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>First Name
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Middle Name
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Last Name
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Current Address
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Permanent Address
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Contact Number
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Email Address
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Birthdate
                                </label>
                                <Calendar className='w-100 p-inputtext-sm' showIcon />
                            </div>
                            <Divider>
                                <span className='p-tag'>Employeement Details</span>
                            </Divider>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Department
                                </label>
                                <Dropdown options={ListDept} className='w-100 p-inputtext-sm' placeholder='Choose Department' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Specific Role
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Basic Monthly
                                </label>
                                <InputNumber className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Per Day
                                </label>
                                <InputText className='w-100 p-inputtext-sm' readOnly />
                            </div>
                            <Divider>
                                <span className='p-tag'>Contribution Details</span>
                            </Divider>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>SSS Number
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Philhealth Number
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>TIN Number
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Pag-Ibig Number
                                </label>
                                <InputText className='w-100 p-inputtext-sm' />
                            </div>
                            <div className="mt-3">
                                <Button className='p-button-info p-button-sm' label='Register Employee' />
                            </div>
                            
                        </div>
                    </form>
                </Panel>
            </div>
        </div>
    )
}

export default RegisterEmployee