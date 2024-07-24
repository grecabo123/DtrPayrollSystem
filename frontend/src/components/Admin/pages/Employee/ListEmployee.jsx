import axios from 'axios'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Image } from 'primereact/image'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import swal from 'sweetalert'

function ListEmployee() {

    const [Employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()

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

    return (
        <div className='container'>
            <div className="row">
                <Panel header="List of Employee">
                    <DataTable loading={loading} 
                    selectionMode={'small'}
                    size="small"
                    value={Employee}  paginator paginatorLeft rows={10}>
                        <Column body={(data,options) => options.rowIndex + 1} header="#"></Column>
                        <Column body={(Employee) => <Image src={Employee.image_capture} width='60' preview />} header="Image"></Column>
                        <Column field='' body={(Employee) => Employee.company_code+' '+Employee.employee_code} header="Employee ID"></Column>
                        <Column field='name' header="Name"></Column>
                        <Column header="Department"></Column>
                        <Column field='specific_role' header="Position"></Column>
                        <Column field='id' body={Details} header="Actions"></Column>
                    </DataTable>
                </Panel>
            </div>
        </div>
    )
}

export default ListEmployee