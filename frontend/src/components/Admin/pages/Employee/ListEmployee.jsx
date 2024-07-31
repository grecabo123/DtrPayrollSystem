import axios from 'axios'
import { PrimeIcons, FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Image } from 'primereact/image'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import swal from 'sweetalert'

function ListEmployee() {

    const [Employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilter] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company_code: {value: null, matchMode: FilterMatchMode.ENDS_WITH},
    })

    useEffect(() => {
        axios.get(`/api/ListofEmployee`).then(res => {
            if(res.data.status === 200) {
                setEmployee(res.data.employee)
            }
            setLoading(false)
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning')
            }
        })
    },[])

    const Details = (Employee) => {
        return (
            <>
                <Button data-id={Employee.id} onClick={EmployeeDetails} className='p-button-sm p-button-info' label='Details' icon={PrimeIcons.EYE} />
            </>
        )
    }

    const EmployeeDetails = (e) => {
        history.push(`/admin/employee/details/refid=${e.currentTarget.getAttribute('data-id')}`);
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
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
                </span>
            </div>
        );
    };

    return (
        <div className='container'>
            <div className="row">
                <Panel header="List of Employee">
                    <DataTable loading={loading} 
                    selectionMode={'small'}
                    header={header}
                    size="small"
                    filters={filters}
                    globalFilterFields={['company_code','name','department','specific_role']}
                    value={Employee}  paginator paginatorLeft rows={10}>
                        <Column body={(data,options) => options.rowIndex + 1} header="#"></Column>
                        <Column body={(Employee) => <Image src={Employee.image_capture} width='60' preview />} header="Image"></Column>
                        <Column field='' filterField='company_code' body={(Employee) => Employee.company_code+' '+Employee.employee_code} header="Employee ID"></Column>
                        <Column field='name' filterField='name' header="Name"></Column>
                        <Column field='department' filterField='department' header="Department"></Column>
                        <Column field='specific_role' filterField='specific_role' header="Position"></Column>
                        <Column field='id' body={Details} header="Actions"></Column>
                    </DataTable>
                </Panel>
            </div>
        </div>
    )
}

export default ListEmployee