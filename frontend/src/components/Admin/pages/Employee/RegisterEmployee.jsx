import axios from 'axios';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
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
import img_empty from '../../../../assets/images/profile.png'
import { PrimeIcons } from 'primereact/api';

function RegisterEmployee() {

    const [Department, setDepartment] = useState([]);
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [captureperson, setcapture] = useState(true);
    const [qrData, setQrData] = useState(3);
    const [btndis, setBtn] = useState(false)
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

        error: [],
    })
    const toast = useRef();
    const [Salary, setSalary] = useState()
    const [deparmtnepick, setDepartmentpick] = useState([])
    const [birthdatedata, setbirthdate] = useState(null);
    const [days, setdays] = useState([])
    const [loading, setLoading] = useState(true)
    const handleinput = (e) => {
        e.persist();
        setRegister({ ...Register, [e.target.name]: e.target.value });
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
        setCapturedImage("")
    }

    const RegisterEmployee = (e) => {
        e.preventDefault();

        const form = new FormData;
        const salar = Salary || 0 * 12 / days.days
        setBtn(true)

        form.append('fname', Register.fname);
        form.append('mname', Register.mname);
        form.append('lname', Register.lname);
        form.append('current_adr', Register.current_adr);
        form.append('perma_adr', Register.perma_adr);
        form.append('contact', Register.contact);
        form.append('email', Register.email);
        form.append('specific_role', Register.specific_role);
        form.append('monthly', Salary || "");
        form.append('sss', Register.sss);
        form.append('philhealth', Register.philhealth);
        form.append('pagibig', Register.pagibig);
        form.append('tin', Register.tin);
        form.append('salary', salar == 0 ? "" : salar);
        form.append('birthdate', birthdatedata == null ? "" : moment(birthdatedata).format('MMM DD YYYY') );
        form.append('department', deparmtnepick);
        form.append('year', moment().format('YYYY'));
        form.append('user_fk', localStorage.getItem('auth_id'));
        form.append('capture', capturedImage == null ? "" : capturedImage);

        axios.post(`/api/RegisterEmployee`, form).then(res => {
            if (res.data.status === 200) {
                toast.current.show({ severity: "success", summary: "Employee Registered", detail: "Successfully" });
                document.getElementById('form').reset();
                setDepartmentpick([]);
                setSalary(null)
                setCapturedImage("");

               

            }
            else {
                setRegister({...Register, error: res.data.error})
            }
            setBtn(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            setBtn(false)

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
                            <div className="row">
                                <div className="col-lg-3 mb-2 text-center">
                                    <Card subTitle="Person Picture">
                                        {
                                            captureperson ? ""
                                                :
                                                <Webcam
                                                    audio={false}
                                                    ref={webcamRef}
                                                    screenshotFormat="image/jpeg"
                                                    width={130}
                                                    height={100}
                                                />
                                        }
                                        {capturedImage ? (
                                            <div>
                                                <img src={capturedImage} width={130} height={100} alt="Captured" />
                                            </div>
                                        ) : (
                                            captureperson === false ? "" : <img src={img_empty} alt="" width={150} height={150} />
                                        )}
                                        <div className="mt-4">
                                            <Button onClick={capture} className='p-button-sm me-2' icon={PrimeIcons.CAMERA} />
                                            {
                                                capturedImage === null ? "" :
                                                    <Button className='p-button-danger p-button-sm me-2' icon="pi pi-trash" onClick={RemoveImage} />
                                            }
                                        </div>
                                    </Card>
                                </div>
                                <div className="col-lg-9 mb-2">
                                    <form onSubmit={RegisterEmployee} id='form'>
                                        <Divider>
                                            <span className='p-tag'>Personal Details</span>
                                        </Divider>
                                        <div className="row">

                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>First Name
                                                </label>
                                                <InputText className={Register.error.fname ? "p-invalid p-inputtext-sm w-100" : "w-100 p-inputtext-sm"} onChange={handleinput} name='fname' />
                                                <small className='text-danger'>{Register.error.fname}</small>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Middle Name
                                                </label>
                                                <InputText className={`w-100 p-inputtext-sm`} onChange={handleinput} name='mname' />
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Last Name
                                                </label>
                                                <InputText className={`w-100 p-inputtext-sm ${Register.error.lname ? 'p-invalid' : ''} `} onChange={handleinput} name='lname' />
                                                <small className='text-danger'>{Register.error.lname}</small>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Current Address
                                                </label>
                                                <InputText className={`w-100 p-inputtext-sm ${Register.error.current_adr ? 'p-invalid' : ''}   `} onChange={handleinput} name='current_adr' />
                                                <small className="text-danger">{Register.error.current_adr}</small>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Permanent Address
                                                </label>
                                                <InputText className={`w-100 p-inputtext-sm ${Register.error.perma_adr ? 'p-invalid' : ''} ` } onChange={handleinput} name='perma_adr' />
                                                <small className='text-danger'>{Register.error.perma_adr}</small>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Contact Number
                                                </label>
                                                <InputText maxLength={11} className={`w-100 p-inputtext-sm ${Register.error.contact ? 'p-invalid' : ''}`} onChange={handleinput} name='contact' />
                                                <small className='text-danger'>{Register.error.contact}</small>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Email Address
                                                </label>
                                                <InputText className={`w-100 p-inputtext-sm ${Register.error.email ? 'p-invalid' : ''}`} onChange={handleinput} name='email' />
                                                <small className='text-danger'>{Register.error.email}</small>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Birthdate
                                                </label>
                                                <Calendar value={birthdatedata} showButtonBar className={`w-100 p-inputtext-sm ${Register.error.birthdate ? 'p-invalid' : ''}`} onChange={(e) => setbirthdate(e.value)} showIcon />
                                                <small className='text-danger'>{Register.error.birthdate}</small>
                                            </div>
                                            <Divider>
                                                <span className='p-tag'>Employeement Details</span>
                                            </Divider>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Department
                                                </label>
                                                <Dropdown value={deparmtnepick} onChange={(e) => setDepartmentpick(e.value)} options={ListDept} className={`w-100 p-inputtext-sm ${Register.error.department ? 'p-invalid' : ''}`} placeholder='Choose Department' />
                                                <small className='text-danger'>{Register.error.department}</small>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Specific Role
                                                </label>
                                                <InputText className={`w-100 p-inputtext-sm ${Register.error.specific_role ? 'p-invalid' : ''}`} onChange={handleinput} name='specific_role' />
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Basic Monthly
                                                </label>
                                                <InputNumber className={`w-100 p-inputtext-sm ${Register.error.salary ? 'p-invalid' : ''}`} onChange={(e) => setSalary(e.value)} prefix='₱' name='monthly' />
                                                <small className='text-danger'>{Register.error.salary}</small>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    <span className='text-danger'>*</span>Per Day
                                                </label>
                                                <InputNumber disabled className='w-100' value={typeof Salary === "undefined" ? 0.00 : Salary * 12 / days.days} readOnly minFractionDigits={2} prefix='₱' />
                                            </div>
                                            <Divider>
                                                <span className='p-tag'>Contribution Details</span>
                                            </Divider>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    SSS Number
                                                </label>
                                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='sss' />
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Philhealth Number
                                                </label>
                                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='philhealth' />
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    TIN Number
                                                </label>
                                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='tin' />
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-sm-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Pag-Ibig Number
                                                </label>
                                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='pagibig' />
                                            </div>
                                            <div className="mt-3">
                                                <Button loading={btndis} className='p-button-info p-button-sm' label='Register Employee' />
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>

                        </Panel>
                    </div>
            }
        </div>
    )
}

export default RegisterEmployee