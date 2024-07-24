import axios from 'axios';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel'
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import { motion } from "framer-motion";
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { FcClock } from 'react-icons/fc';
import { FaClock } from 'react-icons/fa';
import { DataTable } from 'primereact/datatable';
import Announcement from '../../../Users/pages/Calendar/Announcement';
import QRCode from 'qrcode.react';
import { Dialog } from 'primereact/dialog';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { PrimeIcons } from 'primereact/api';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import ReactToPrint from 'react-to-print'
import AccountControls from './AccountControls';

function DetailsEmployee(props) {

    const [PersonDetails, setPerson] = useState([]);
    const [loading, setLoading] = useState(true)
    const history = useHistory();
    const [activeIndex, setActiveIndex] = useState(0);
    const [qrshow, setshowQR] = useState(false)
    const [qrscan, setqrscan] = useState("")
    const [printload, setload] = useState(false);
    useEffect(() => {
        axios.get(`/api/PersonDetails/${props.match.params.id}`).then(res => {
            if (res.data.status === 200) {
                setPerson(res.data.data)
            }
            setLoading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning')
            }
        })
    }, [props.match.params.id]);

    const component = useRef();

    const handleinput = () => {
        window.print();
    }

    const Return = () => {
        history.push(`/admin/employee/list`)
    }
    return (
        <div className='container-fluid'>
            {
                loading ?
                    <Skeleton />
                    :
                    <>
                        <Panel header="Employee Record">
                        <div className="d-flex justify-content-end mb-1">
                            <Button className='p-button-info p-button-sm' label='Return Page' onClick={Return} />
                        </div>
                            <TabView className='p-tabview' activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                                <TabPanel header="Account">
                                    <div className="row mt-2">
                                        <div className="col-lg-3 mb-2">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: 0.4,
                                                    ease: [0, 0.71, 0.2, 1.01]
                                                }}
                                            >
                                                <Card subTitle="Total Render Time">
                                                    <div className="d-flex justify-content-between">
                                                        <span><FaClock className='text-primary' /></span>
                                                        <span>42</span>
                                                    </div>
                                                </Card>

                                            </motion.div>
                                        </div>
                                        <div className="col-lg-3 mb-2">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: 0.4,
                                                    ease: [0, 0.71, 0.2, 1.01]
                                                }}
                                            >
                                                <Card subTitle="Total Present">
                                                    <div className="d-flex justify-content-between">
                                                        <span><FaClock className='text-primary' /></span>
                                                        <span>42</span>
                                                    </div>
                                                </Card>

                                            </motion.div>
                                        </div>
                                        <div className="col-lg-3 mb-2">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: 0.4,
                                                    ease: [0, 0.71, 0.2, 1.01]
                                                }}
                                            >
                                                <Card subTitle="Total Absent">
                                                    <div className="d-flex justify-content-between">
                                                        <span><FaClock className='text-primary' /></span>
                                                        <span>42</span>
                                                    </div>
                                                </Card>

                                            </motion.div>
                                        </div>
                                        <div className="col-lg-3 mb-2">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: 0.4,
                                                    ease: [0, 0.71, 0.2, 1.01]
                                                }}
                                            >
                                                <Card subTitle="Total Late">
                                                    <div className="d-flex justify-content-between">
                                                        <span><FaClock className='text-primary' /></span>
                                                        <span>42</span>
                                                    </div>
                                                </Card>

                                            </motion.div>
                                        </div>
                                        <div className="mt-2">
                                            <DataTable header="Task Status" paginator paginatorLeft rows={10}>

                                            </DataTable>
                                        </div>

                                        <div className="mt-2">
                                            <h6>
                                                Performance Rate
                                            </h6>
                                        </div>
                                        <div className="mt-2">
                                            <Announcement />

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel header="201 File">
                                    <div className='personal_details' ref={component}>
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
                                                    <InputText className='w-100 p-inputtext-sm' value={PersonDetails.tin} readOnly />
                                                </div>
                                                <div className="col-lg-6 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Pag-Ibig Number
                                                    </label>
                                                    <InputText className='w-100 p-inputtext-sm' value={PersonDetails.pagibig} readOnly />
                                                </div>
                                                <div className="col-lg-6 mb-2">

                                                    <QRCode value={PersonDetails.id} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Allowances">
                                </TabPanel>
                                <TabPanel header="Schedule">
                                </TabPanel>
                                <TabPanel header="QR Code">
                                </TabPanel>
                                <TabPanel header="Account Settings">
                                    <AccountControls data={PersonDetails.id} />
                                </TabPanel>
                            </TabView>
                        </Panel>

                        <Dialog visible={qrshow} position='top' onHide={(e) => setshowQR(false)} draggable={false} style={{ width: "50vw" }}>
                            <div className="container">
                                <div className="row">
                                    <div className="text-center">
                                        {PersonDetails.name} - QR CODE
                                    </div>
                                    <QRCode value={PersonDetails.id} />
                                </div>
                                <div id='reader'></div>
                            </div>
                        </Dialog>


                    </>
            }
        </div>
    )
}

export default DetailsEmployee