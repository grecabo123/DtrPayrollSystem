import axios from 'axios';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel'
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
// import logo from '../../../../../public/vite.svg'
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputNumber } from 'primereact/inputnumber';

function Profile() {

    const [PersonDetails, setPerson] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        FetchPersonDetails();
        return () => {
            // setLoading(true)
        }
    }, [])

    const FetchPersonDetails = () => {
        axios.get(`/api/PersonDetails/${localStorage.getItem('auth_id')}`).then(res => {
            if (res.data.status === 200) {
                setPerson(res.data.data);
            }
            setLoading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    return (
        <div className='container-fluid'>
            <Panel header="My Profile">
            
                {
                    loading ?
                        <Skeleton />

                        :
                        <>
                        <div className="d-flex justify-content-center mb-5">
                        <h5>Employee ID: <small>{PersonDetails.company_code+''+PersonDetails.employee_code} </small> </h5>

                        </div>
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="d-flex justify-content-center border-1">
                                        <Image className='text-center' preview src={PersonDetails.image_capture} width={250} />
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <ul class="list-group">
                                        <li class="list-group-item border-0">
                                            <div className="row">
                                                <div className="col-lg-4 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        First Name
                                                    </label>
                                                    <InputText value={PersonDetails.first_name} readOnly className='w-100 p-inputtext-sm' />
                                                </div>
                                                <div className="col-lg-4 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Middle Name
                                                    </label>
                                                    <InputText readOnly value={PersonDetails.middle_name} className='w-100 p-inputtext-sm' />
                                                </div>
                                                <div className="col-lg-4 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Last Name
                                                    </label>
                                                    <InputText value={PersonDetails.last_name} readOnly className='w-100 p-inputtext-sm' />
                                                </div>
                                                <div className="col-lg-4 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Email
                                                    </label>
                                                    <InputText value={PersonDetails.email} readOnly className='w-100 p-inputtext-sm' />
                                                </div>
                                                <div className="col-lg-4 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Birthdate
                                                    </label>
                                                    <InputText value={PersonDetails.birthdate} readOnly className='w-100 p-inputtext-sm' />
                                                </div>
                                                <div className="col-lg-4 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Contact Number
                                                    </label>
                                                    <InputText value={PersonDetails.contact} readOnly className='w-100 p-inputtext-sm' />
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="mt-5 container">
                                <Divider>
                                    <span className='p-tag'>Employee Details</span>
                                </Divider>
                                <div className="row">
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            Department
                                        </label>
                                        <InputText className='p-inputtext-sm w-100' value={PersonDetails.department} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            Specific Role
                                        </label>
                                        <InputText className='p-inputtext-sm w-100' value={PersonDetails.specific_role} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            Basic Montly
                                        </label>
                                        <InputNumber className='w-100 p-inputtext-sm' value={PersonDetails.monthly} prefix='₱' readOnly />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            Per Day
                                        </label>
                                        <InputNumber className='w-100 p-inputtext-sm' value={PersonDetails.per_day} prefix='₱' readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 container">
                                <Divider>
                                    <span className='p-tag'>Contribution Details</span>
                                </Divider>
                                <div className="row">
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                            SSS Number
                                        </label>
                                        <InputText className='p-inputtext-sm w-100' value={PersonDetails.sss} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                        Philhealth Number
                                        </label>
                                        <InputText className='p-inputtext-sm w-100' value={PersonDetails.philhealth} />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                        TIN Number
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' value={PersonDetails.tin}  readOnly />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <label htmlFor="" className="form-label">
                                        Pag-Ibig Number
                                        </label>
                                        <InputText className='w-100 p-inputtext-sm' value={PersonDetails.pagibig}  readOnly />
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </Panel>
        </div>
    )
}

export default Profile