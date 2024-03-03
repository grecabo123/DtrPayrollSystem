import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { motion } from "framer-motion";
import { DataTable } from 'primereact/datatable';
import BarChartData from './BarChartData';
import { Panel } from 'primereact/panel';
import EventsCalendar from './EventsCalendar';
import axios from 'axios';
import swal from 'sweetalert';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import moment from 'moment';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { PrimeIcons, FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



function Dashboard() {

    const [Employee, setEmployee] = useState([])
    const [loading, setloading] = useState(true)
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilter] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        specific_role: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        employee_code: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    })

    useEffect(() => {
        axios.get(`/api/AdminDashboard`).then(res => {
            if (res.data.status === 200) {
                setEmployee(res.data.employee);
            }
            setloading(false)
        }).catch((error) => {
            swal("Warning", error.response.statusText, 'warning');
        })
    }, []);

    const StatusIndicator = (Employee) => {
        return (
            <>
                <Badge severity={Employee.status == 2 ? "danger" : 'success'} value={Employee.status == 2 ? "Deactivate" : "Active"} />
            </>
        )
    }
    const DateFormat = (Employee) => {
        return (
            <>
                <span>{moment(Employee.created_at).format('MMM DD YYYY')}</span>
            </>
        )
    }

    const AccountRole = (Employee) => {
        return (
            <>
                {
                    Employee.role == 1 ? <Tag severity="success" value="Admin" /> : Employee.role == 2 ? <Tag severity={'info'} value="Human Resources" /> : Employee.role == 3 ? <Tag severity={'warning'} value="Accountant" /> : <Tag severity={'danger'} value="Employee" />
                }
            </>
        )
    }

    const ActionByn = (Employee) => {
        return (
            <>
                <Link to={`/admin/employee/details/refid=${Employee.id}`}><Button className='p-button-info p-button-sm' label='Details' icon={PrimeIcons.USER} /></Link>
            </>
        )
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilter(_filters);
        setGlobalFilterValue(value);
    };

    const header = () => {
        return (
            <div className="d-flex justify-content-end">
                {/* <h4>Employee Data</h4> */}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
                </span>
            </div>
        );
    };

    const EmployeeCode = (Employee) => {
        return (
            <>
                <span>{Employee.company_code}{Employee.employee_code}</span>
            </>
        )
    }

    const Image_Name = (Employee) => {
        return (
            <>
                <div className="d-flex align-items-center gap-2">
                    <img src={Employee.image_capture} width={50} height={40} style={{ borderRadius: "50%" }} alt="" />
                    <span>{Employee.name}</span>
                </div>
            </>
        )
    }

    

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-lg-3 col-sm-12 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="All Users">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers size={20} /></span>
                                <span>321</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                <div className="col-lg-3 col-sm-12 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.6,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Department">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers size={20} /></span>
                                <span>321</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                <div className="col-lg-3 col-sm-12 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.8,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Active Users">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers size={20} /></span>
                                <span>321</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                <div className="col-lg-3 col-sm-12 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.0,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Not Active Users">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers size={20} /></span>
                                <span>321</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                <div className="col-lg-12 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <DataTable title='Employee Data' loading={loading}   emptyMessage="No Employee Found." header={header} dataKey='id' value={Employee} filters={filters} globalFilterFields={['name', 'specific_role','employee_code']} paginator paginatorLeft rows={10}>
                            <Column field='name' body={Image_Name} filterField='name' header="Name of Employee"></Column>
                            <Column field='company_code' filterField='employee_code' body={EmployeeCode} header="Employee ID"></Column>
                            <Column field='role' body={AccountRole} header="Account Role"></Column>
                            <Column field='specific_role' filterField='specific_role' header="Specific Role"></Column>
                            <Column field='status' body={StatusIndicator} header="Status"></Column>
                            <Column field='created_at' body={DateFormat} header="Employee Registered"></Column>
                            <Column field='id' body={ActionByn} header="Actions"></Column>
                        </DataTable>
                    </motion.div>
                </div>
                <div className="col-lg-3 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Panel header="Weather Forecast">

                        </Panel>

                    </motion.div>
                </div>
                <div className="col-lg-9 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Panel header="All Events">
                            <EventsCalendar />
                        </Panel>

                    </motion.div>
                </div>

                <div className="mb-3 col-lg-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <BarChartData />
                    </motion.div>
                </div>
                <div className="mb-3 col-lg-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <BarChartData />
                    </motion.div>
                </div>
                <div className="col-lg-4 mb-3">
                    <Panel header="File Reports">

                    </Panel>
                </div>
                <div className="col-lg-8 mb-3">
                    <Panel header="Activity">

                    </Panel>
                </div>
            </div>
        </div>
    )
}

export default Dashboard