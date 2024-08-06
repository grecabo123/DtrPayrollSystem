import axios from 'axios'
import { PrimeIcons } from 'primereact/api'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert'

function CreateData() {

    const [loading, setloading] = useState(true)
    const [visible, setVisible] = useState(false);
    const [DepartmentAdd, setDepartmentAdd] = useState(false)
    const [btndis, setBtn] = useState(false)
    const [NameDepartment, setDepartment] = useState({
        department: "",
        error: [],
    })
    const [DepartmentFetch, setFetch] = useState([])
    const toast = useRef();
    useEffect(() => {
        DepartmentData();
        return () => {
            setloading(true)
        }
    }, [])


    const DepartmentData = () => {
        axios.get(`/api/FetchDataAll`).then(res => {
            if (res.data.status === 200) {
                setFetch(res.data.data)
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }


    const handleinput = (e) => {
        e.persist();
        setDepartment({...NameDepartment, [e.target.name] : e.target.value});
    }

    const DepartmentRegister = (e) => {
        e.preventDefault();
        setBtn(true)
        const data = {
            id: localStorage.getItem('auth_id'),
            department: NameDepartment.department
        }
        axios.post(`/api/AddDepartment`, data).then(res => {
            if (res.data.status === 200) {
                setVisible(false)
                toast.current.show({ severity: "success", summary: "Added Data", detail: "Successfully" });
                DepartmentData();
                document.getElementById('depart').reset();
                setBtn(false)
                setDepartment({
                    department: "",
                    error: [],
                });
            }
            else if(res.data.status === 404){
                setDepartment({...NameDepartment, error: res.data.error})
                setBtn(false)

            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
                setBtn(false)

            }
        })
    }

    const HideModal = () => {
        setVisible(false)
    }

    const StatusDepart = (DepartmentFetch) => {
        return (
            <>
                {DepartmentFetch.status === 1 ? <Badge value={'Active'} severity={'success'} /> : <Badge value={'Deactivate'} severity={'danger'} />}
            </>
        )
    }

    const ActionButton = (DepartmentFetch) => {
        return (
            <div>
                <Button 
                className={DepartmentFetch.status === 1 ? `m-2 p-button-sm p-button-warning` : `m-2 p-button-sm p-button-info`} 
                label={DepartmentFetch.status === 1 ? "Deactivate" : "Activate"} 
                data-id={DepartmentFetch.id} 
                data-indicator={1}
                data-status={DepartmentFetch.status === 1 ? 0 : 1}
                onClick={UpdateStatus} />

                {/* <Button className=' m-2 p-button-sm p-button-danger' 
                    onClick={DeleteData}
                    label='Delete Department'
                    data-id={DepartmentFetch.id}
                /> */}
            </div>
        )
    }

    const DeleteData = (e) => {
        axios.delete(`/api/DeleteDepartment/${e.currentTarget.getAttribute('data-id')}`).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: "success", summary: "Remove Department", detail: "Successfully"});
                DepartmentData();
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }
    const UpdateStatus = (e) => {
        const data = {
            id: e.currentTarget.getAttribute('data-id'),
            user_fk: localStorage.getItem('auth_id'),
            status: e.currentTarget.getAttribute('data-status'),
            
        }
        axios.put(`/api/UpdateStatus`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({ severity: "success", summary: "Update Status", detail: "Successfully" });
                DepartmentData();
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
            <div className="d-flex justify-content-end align-items-end">
                <Button className='p-button-sm p-button-info' icon={PrimeIcons.PLUS} onClick={(e) => setVisible(true)} label='Create Department' />
            </div>
            <div className="mt-3">
                <Panel header="Department List">
                    <DataTable
                        value={DepartmentFetch}
                        loading={loading}
                        rows={10}
                        paginator
                        paginatorLeft
                        size='small'
                        selectionMode={'single'}
                    >
                        <Column header="#" body={(data,options) => options.rowIndex +1}></Column>
                        <Column field='department' header="Department"></Column>
                        <Column field='status' body={StatusDepart} header="Status"></Column>
                        <Column field='id' body={ActionButton} header="Action"></Column>
                    </DataTable>
                </Panel>
            </div>

            <Dialog onHide={HideModal} header="Add Department" draggable={false} position='top' visible={visible}
                 style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
                <form onSubmit={DepartmentRegister} id='depart'>
                    <div className="row">
                        <div className="col-lg-12 mb-2">
                            <label htmlFor="" className="form-label">
                                <span className='text-danger'>*</span>Department Name
                            </label>
                            <InputText onChange={handleinput} className={`p-inputtext-sm w-100 ${NameDepartment.error.department ? 'p-invalid' : ''}`} name='department' />
                            <small className='text-danger'>{NameDepartment.error.department}</small>
                        </div>
                        <div className="mt-3 d-flex justify-content-end">
                            <Button  className='p-button-info p-button-sm' label='Register Department' loading={btndis} />
                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default CreateData