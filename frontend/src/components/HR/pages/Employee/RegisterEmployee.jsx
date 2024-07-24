import axios from 'axios';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import Webcam from 'react-webcam';
import swal from 'sweetalert';

function RegisterEmployee() {

    const [Department, setDepartment] = useState([]);
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [captureperson, setcapture] = useState(true);
    const [Register, setRegister] = useState({
        fname: "",
        mname: "",
        lname: "",
        current_adr: "",
        perma_adr: "",
        contact: "",
        email: "",
        specific_role: "",
        monthly: "",
        sss: "",
        philhealth: "",
        tin: "",
        pagibig: "",
    })
    const toast = useRef();
    const [Salary, setSalary] = useState()
    const [deparmtnepick, setDepartmentpick] = useState([])
    const [birthdatedata, setbirthdate] = useState();
    const [days, setdays] = useState([])
    const [loading, setLoading] = useState(true)
    const handleinput = (e) => {
        e.persist();
        setRegister({...Register, [e.target.name] : e.target.value});
    }

    useEffect(() => {
        axios.get(`/api/FetchDataStatus`).then(res => {
            if (res.data.status === 200) {
                setDepartment(res.data.data);
                setdays(res.data.days);
            }
            setLoading(false)
        }).catch((error) => {
            if (error.response.status === 500) {

            }
        })
    }, []);

    const ListDept = Department.map((data) => {
        return (
            { label: data.department, value: data.id }
        )
    })

    const capture = async (e) => {
        e.preventDefault();
        setcapture(false)
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        setcapture(true)

      };
    const Done = (e) => {
        e.preventDefault();
        setcapture(true)
    }

    const RemoveImage = () => {
        setCapturedImage(null)
    }

    const RegisterEmployee = (e) => {
        e.preventDefault();

        const form = new FormData;

        form.append('fname',Register.fname);
        form.append('mname',Register.mname);
        form.append('lname',Register.lname);
        form.append('current_adr',Register.current_adr);
        form.append('perma_adr',Register.perma_adr);
        form.append('contact',Register.contact);
        form.append('email',Register.email);
        form.append('specific_role',Register.specific_role);
        form.append('monthly',Salary);
        form.append('sss',Register.sss);
        form.append('philhealth',Register.philhealth);
        form.append('pagibig',Register.pagibig);
        form.append('tin',Register.tin);
        form.append('salary',Salary * 12 / days.days);
        form.append('birthdate',moment(birthdatedata).format('MMM DD YYYY'));
        form.append('department',deparmtnepick);
        form.append('year',moment().format('YYYY'));
        form.append('user_fk',localStorage.getItem('auth_id'));
        form.append('capture',capturedImage);

        axios.post(`/api/RegisterEmployee`,form).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: "success", summary: "Employee Registered", detail: "Successfully"});
                document.getElementById('form').reset();
                setDepartmentpick([]);
                setSalary()
                setCapturedImage("");
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }



    return (
        <div className='container-fluid'>
            {
                loading ? <Skeleton />
                :
            <div className="row">
                <Panel header="Register Employee">
                    <Toast ref={toast} />
                    <div className="d-flex justify-content-end">
                    <Button onClick={capture} className='p-button-info me-2 p-button-sm' icon="pi pi-camera" />
                    {
                        capturedImage == null ? "" : 
                    <Button className='p-button-danger p-button-sm me-2' icon="pi pi-trash" onClick={RemoveImage} />
                    }
                    {/* <Button className='p-button-danger p-button-sm me-2' icon="pi pi-times" onClick={Done} /> */}
                    </div>
                    <form onSubmit={RegisterEmployee} id='form'>
                        <Divider>
                            <span className='p-tag'>Personal Details</span>
                        </Divider>
                        <div className="row">
                            <div className="d-flex justify-content-end">
                                {
                                    captureperson  ? ""
                                    : 
                                    <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width={200}
                                />
                                }
                                {capturedImage && (
                                    <div className=''>
                                        <img src={capturedImage} className='w-100' alt="Captured" />
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>First Name
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='fname' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Middle Name
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='mname' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Last Name
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='lname' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Current Address
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='current_adr' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Permanent Address
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='perma_adr' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Contact Number
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='contact' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Email Address
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='email' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Birthdate
                                </label>
                                <Calendar value={birthdatedata} className='w-100 p-inputtext-sm' onChange={(e) => setbirthdate(e.value)} showIcon />
                            </div>
                            <Divider>
                                <span className='p-tag'>Employeement Details</span>
                            </Divider>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Department
                                </label>
                                <Dropdown value={deparmtnepick} onChange={(e) => setDepartmentpick(e.value)} options={ListDept} className='w-100 p-inputtext-sm' placeholder='Choose Department' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Specific Role
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='specific_role' />
                            </div>
                            {/* <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Basic Monthly
                                </label>
                                <InputNumber className='w-100 p-inputtext-sm' onChange={(e) => setSalary(e.value)} prefix='₱' name='monthly' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Per Day
                                </label>
                                <InputNumber disabled className='w-100' value={typeof Salary === "undefined" ? 0.00 : Salary * 12 / days.days} readOnly minFractionDigits={2} prefix='₱' />
                            </div> */}
                            <Divider>
                                <span className='p-tag'>Contribution Details</span>
                            </Divider>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>SSS Number
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='sss' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Philhealth Number
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='philhealth' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>TIN Number
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='tin' />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Pag-Ibig Number
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='pagibig' />
                            </div>
                            <div className="mt-3">
                                <Button className='p-button-info p-button-sm' label='Register Employee' />
                            </div>

                        </div>
                    </form>
                </Panel>
            </div>
            }
        </div>
    )
}

export default RegisterEmployee