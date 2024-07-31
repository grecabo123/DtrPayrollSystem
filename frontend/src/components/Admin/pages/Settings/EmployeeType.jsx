import axios from 'axios'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'

function EmployeeType() {

    const [visible, setVisible] = useState(false)
    const [btndis, setBtn] = useState(false)
    const [EmployeeTypeData, setEmployeeData] = useState([])
    const [loading, setloading] = useState(true)
    const [DataEmployee, setData] = useState({
        employee_type: "",
        error: [],
    });
    const toast = useRef();

    useEffect(() => {
        FetchData()
        return () => {
            setloading(true)
        }
    },[])

    const FetchData = () => {
        axios.get(`/api/EmployeeTypeList`).then(res => {
            if(res.data.status === 200) {
                setEmployeeData(res.data.data);
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
                setBtn(false);
            }
            else if (error.response.status === 404) {
                swal("Warning",error.response.statusText,'warning');
                setBtn(false);
            }
        })
    }


    const handleinput = (e) => {
        e.persist();
        setData({ ...DataEmployee, [e.target.name]: e.target.value });
    }

    const AddEmployeeType = (e) => {
        e.preventDefault();
        setBtn(true);
        const data = {
            employee_type: DataEmployee.employee_type,
            user_fk: localStorage.getItem('auth_id'),
        };

        axios.post(`/api/AddEmployeeType`, data).then(res => {
            if (res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Added Data",
                    detail: "Successfully",
                })
                FetchData();
                setBtn(false);
                setData({
                    employee_type: "",
                    error: [],
                });
                document.getElementById('form_reset').reset();
                setVisible(false)

            }
            else  {
                setData({ ...DataEmployee, error: res.data.error });
                setBtn(false);

            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
                setBtn(false);

            }
            else if (error.response.status === 404) {
                swal("Warning",error.response.statusText,'warning');
                setBtn(false);
            }
        })
    }

    const ActionBtn = (rowData) => {
        return (
            <div>
                <Button className='p-button-sm p-button-danger' label='Deactivate' />
            </div>
        )
    }

    return (
        <div>
            <div className="container">
                <Toast ref={toast} />
                <div className="row">
                    <Panel header="Employee Type">
                        <div className="d-flex justify-content-end">
                            <Button onClick={(e) => setVisible(true)} className='p-button-sm p-button-info' icon={PrimeIcons.PLUS} label='Register Emplyee Type' />
                        </div>
                        <DataTable size='small' selectionMode={'single'} loading={loading} value={EmployeeTypeData} paginator paginatorLeft rows={10}>
                            <Column body={(data,options) => options.rowIndex + 1} header="#"></Column>
                            <Column field='employee_type' header="Employee Type"></Column>
                            <Column body={(EmployeeTypeData) => EmployeeTypeData.status === 1 ? "Active" : "Not Active"} header="Status"></Column>
                            <Column body={ActionBtn} header="Action"></Column>
                        </DataTable>
                    </Panel>
                </div>
            </div>

            <Dialog header="Add Employee Type" draggable={false} position='top' visible={visible} onHide={() => { if (!visible) return; setVisible(false); }}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <form onSubmit={AddEmployeeType} id='form_reset'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    <span className='text-danger'>*</span>Employee Type Name
                                </label>
                                <InputText onChange={handleinput} className={`p-inputtext-sm w-100 ${DataEmployee.error.employee_type ? 'p-invalid' : ''}`}name='employee_type' />
                                <small className='text-danger'>{DataEmployee.error.employee_type}</small>
                            </div>
                            <div className="mt-2">
                                <Button loading={btndis} className='p-button-sm p-button-info w-100' label='Register Data' />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>

        </div>
    )
}

export default EmployeeType