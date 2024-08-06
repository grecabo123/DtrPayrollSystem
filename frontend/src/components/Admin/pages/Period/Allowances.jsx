import axios from 'axios';
import moment from 'moment';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert';

function Allowances() {

    const [loading, setLoading] = useState(true);
    const [AllowanceData, setTime] = useState([])
    const [visibleallowance, setVisible] = useState(false);
    const [TimeDetailsModal, setTimeDetailsModal] = useState(false)
    const [TimeDetails, setTimeDetails] = useState({
        indicator: "",
        allowances_name: "",
        id: "",
    });
    const [Allowances, setAllowances] = useState({
        name_allowance: "",
        error: [],
    });
    const toast = useRef();


    useEffect(() => {
        FetchTime();
        return () => {
            setLoading(true)
        }
    }, []);

    const handleinput = (e) => {
        setAllowances({ ...Allowances, [e.target.name]: e.target.value });

    }


    const handleUpdate = (e) => {
        setTimeDetails({ ...TimeDetails, [e.target.name]: e.target.value });
    }

    const FetchTime = () => {
        axios.get(`/api/AllowanceData`).then(res => {
            if (res.data.status === 200) {
                setTime(res.data.data);
            }
            setLoading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const ActionButton = (AllowanceData) => {
        return (
            <>
                <Button data-indicator={1} onClick={DisplayModal}
                    className='p-button-success p-button-sm m-2'
                    label='Edit'
                    icon={PrimeIcons.PENCIL}
                    data-allowances_name={AllowanceData.allowances_name}
                    data-id={AllowanceData.id}
                />
                <Button data-indicator={2} onClick={DisplayModal}
                    className='p-button-danger p-button-sm m-2'
                    label='Delete'
                    data-allowances_name={AllowanceData.allowances_name}
                    data-id={AllowanceData.id}

                    icon={PrimeIcons.TRASH}
                />
            </>
        )
    }
    const TimeFormat = (AllowanceData) => {
        return (
            <>
                <span>{moment(AllowanceData.TimeFormat).format('MMM DD YYYY')}</span>
            </>
        )
    }

    const onHide = () => {
        setVisible(false);
        setTimeDetailsModal(false)
    }

    const DisplayModal = (e) => {
        setTimeDetailsModal(true)
        setTimeDetails({
            indicator: e.currentTarget.getAttribute('data-indicator'),
            allowances_name: e.currentTarget.getAttribute('data-allowances_name'),
            id: e.currentTarget.getAttribute('data-id'),
        });
    }

    const AddTime = () => {
        setVisible(true)
    }

    const RegisterTime = (e) => {
        e.preventDefault();

        const data = {
            name_allowance: Allowances.name_allowance,
            user_fk: localStorage.getItem('auth_id'),
        };

        axios.post(`/api/AddAllowances`, data).then(res => {
            if (res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Added Time Period",
                    detail: "Successfully"
                });
                setVisible(false);
                FetchTime();
                document.getElementById('form').reset();
            }
            else {
                setAllowances({ ...Allowances, error: res.data.error });
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const UpdateTime = (e) => {
        e.preventDefault();

        const data = {
            allowances_name: TimeDetails.allowances_name,
            user_fk: localStorage.getItem('auth_id'),
            id: TimeDetails.id
        };

        TimeDetails.indicator == 1 ?
        axios.put(`/api/UpdateAllowanceData`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Time Period Update",
                    detail: "Successfully",
                });
                FetchTime();
                document.getElementById('form').reset();
                setTimeDetailsModal(false)
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
        :
        axios.delete(`/api/RemoveAllowanceData/${data.id}`,).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Time Period Removed",
                    detail: "Successfully",
                });
                FetchTime();
                document.getElementById('form').reset();
                setTimeDetailsModal(false)
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    return (
        <div>
            <Toast ref={toast} />
            <div className="d-flex justify-content-end mb-3">
                <Button className='p-button-sm p-button-info' onClick={AddTime} icon={PrimeIcons.PLUS} label='Add Allowances' />
            </div>
            <DataTable loading={loading} 
                size='small'
                selectionMode={'single'}
            value={AllowanceData} header="Allowances" paginator paginatorLeft rows={10}>
                <Column header="#" body={(data,options) => options.rowIndex + 1}></Column>
                <Column field='allowances_name' header="Allowance Name"></Column>
                <Column field='created_at' body={TimeFormat} header="Created"></Column>
                <Column field='id' body={ActionButton} header="Actions"></Column>
            </DataTable>

            <Dialog header="Add Allowances" onHide={onHide} visible={visibleallowance} draggable={false} position='top' 
            style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
                <form onSubmit={RegisterTime} id='form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Allowance
                                </label>
                                <InputText className='w-100 p-inputtext-sm' name='name_allowance' onChange={handleinput} />
                                <span className='text-danger'>{Allowances.error.name_allowance}</span>
                            </div>
                            <div className="mt-3">
                                <Button className='w-100 p-button-sm p-button-info' label='Add Allowance' icon={PrimeIcons.PLUS} />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>


            <Dialog onHide={onHide}  visible={TimeDetailsModal} header={TimeDetails.indicator == 1 ? "Edit Allowance Details" : "Remove Allowance"} draggable={false} position='top' style={{width: "50vw"}}>
                <form onSubmit={UpdateTime} id='form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Allowance Name
                                </label>
                                <InputText onChange={handleUpdate} className='w-100 p-inputtext-sm' name='allowances_name' value={TimeDetails.allowances_name} />
                            </div>
                            <div className="mt-3">
                                <Button className={TimeDetails.indicator == 1 ? "w-100 p-button-sm p-button-success" : "w-100 p-button-sm p-button-danger"} 
                                    label={TimeDetails.indicator == 1 ? "Update" : "Remove Time Period"}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>

        </div>
    )
}

export default Allowances