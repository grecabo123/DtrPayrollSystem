import axios from 'axios';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import {FilterMatchMode, PrimeIcons} from 'primereact/api'
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'primereact/button';

function ListOfEmployee() {
    
    
    const [Employee, setEmployee] = useState([])
    const [loading, setloading] = useState(true)
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilter] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        specific_role: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        employee_code: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    })
    const history = useHistory();

    useEffect(() => {
        axios.get(`/api/ListofEmployee`).then(res => {
            if(res.data.status === 200) {
                setEmployee(res.data.employee)
            }
            setloading(false)
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning')
            }
        })
    },[]);


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
                    Employee.role == 1 ? <Tag className='text-center' severity="success" value="Admin" /> : Employee.role == 2 ? <Tag className='text-center' severity={'info'} value="Human Resources" /> : Employee.role == 3 ? <Tag severity={'warning'} value="Accountant" /> : <Tag severity={'danger'} value="Employee" />
                }
            </>
        )
    }

    const ActionByn = (Employee) => {
        return (
            <div>
                <Link className="m-2" to={`/hr/employee/details/refid=${Employee.id}`}><Button className='p-button-success p-button-sm' label='Details' icon={PrimeIcons.USER} /></Link>
                <Button className='m-2 p-button-sm p-button-warning' data-id={Employee.id} onClick={Feedback} label='Feedback' />
            </div>
        )
    }

    const Feedback = (e) => {
        history.push(`/hr/employee/feedback/refid=${e.currentTarget.getAttribute('data-id')}`)
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
            <Panel header="List of Employee">
                <DataTable title='Employee Data' loading={loading} emptyMessage="No Employee Found." header={header} dataKey='id' value={Employee} filters={filters} globalFilterFields={['name', 'specific_role', 'employee_code']} paginator paginatorLeft rows={10}>
                    <Column field='name' body={Image_Name} filterField='name' header="Name of Employee"></Column>
                    <Column field='company_code' filterField='employee_code' body={EmployeeCode} header="Employee ID"></Column>
                    <Column field='role' body={AccountRole} header="Account Role"></Column>
                    <Column field='specific_role' filterField='specific_role' header="Specific Role"></Column>
                    <Column field='status' body={StatusIndicator} header="Status"></Column>
                    <Column field='created_at' body={DateFormat} header="Employee Registered"></Column>
                    <Column field='id' body={ActionByn} header="Actions"></Column>
                </DataTable>
            </Panel>
        </div>
    )
}

export default ListOfEmployee