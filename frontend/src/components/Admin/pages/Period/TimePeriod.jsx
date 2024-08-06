import axios from 'axios';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert';

function TimePeriod() {

    const [loading, setLoading] = useState(true);
    const [TimeData, setTime] = useState([])
    const [visible, setVisible] = useState(false);
    const [TimeDetailsModal, setTimeDetailsModal] = useState(false)
    const [TimeDetails, setTimeDetails] = useState({
        indicator: "",
        time_name: "",
        time_num: "",
        id: "",
    });
    const [TimeRegister, setTimeRegister] = useState({
        period_name: "",
        period_time: "",
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
        setTimeRegister({ ...TimeRegister, [e.target.name]: e.target.value });

    }


    const handleUpdate = (e) => {
        setTimeDetails({ ...TimeDetails, [e.target.name]: e.target.value });
    }

    const FetchTime = () => {
        axios.get(`/api/TimePeriodData`).then(res => {
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

    const ActionButton = (TimeData) => {
        return (
            <>
                <Button data-indicator={1} onClick={DisplayModal}
                    className='p-button-success p-button-sm m-1'
                    label='Edit'
                    icon={PrimeIcons.PENCIL}
                    data-time_name={TimeData.time_period_name}
                    data-time_nums={TimeData.time_mins}
                    data-id={TimeData.id}
                />
                <Button data-indicator={2} onClick={DisplayModal}
                    className='p-button-danger p-button-sm m-1'
                    label='Delete'
                    data-time_name={TimeData.time_period_name}
                    data-time_nums={TimeData.time_mins}
                    data-id={TimeData.id}

                    icon={PrimeIcons.TRASH}
                />
            </>
        )
    }
    const TimeFormat = (TimeData) => {
        return (
            <>
                <span>{TimeData.time_mins} {TimeData.time_mins > 1 ? "Mins" : "Min"}</span>
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
            time_name: e.currentTarget.getAttribute('data-time_name'),
            time_num: e.currentTarget.getAttribute('data-time_nums'),
            id: e.currentTarget.getAttribute('data-id'),
        
        });
    }

    const AddTime = () => {
        setVisible(true)
    }

    const RegisterTime = (e) => {
        e.preventDefault();

        const data = {
            time_name: TimeRegister.period_name,
            time_num: TimeRegister.period_time,
            user_fk: localStorage.getItem('auth_id'),
        };

        axios.post(`/api/AddTimePeriod`, data).then(res => {
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
                setTimeRegister({ ...TimeRegister, error: res.data.error });
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
            time_name: TimeDetails.time_name,
            time_num: TimeDetails.time_num,
            user_fk: localStorage.getItem('auth_id'),
            id: TimeDetails.id
        };

        TimeDetails.indicator == 1 ?
        axios.put(`/api/UpdateTimeData`,data).then(res => {
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
        axios.delete(`/api/RemoveTimeData/${data.id}`,).then(res => {
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
                <Button className='p-button-sm p-button-info' onClick={AddTime} icon={PrimeIcons.PLUS} label='Add Time Period' />
            </div>
            <DataTable loading={loading} 
                size='small'
                selectionMode={'single'}
            value={TimeData} header="Time Period" paginator paginatorLeft rows={10}>
                <Column header="#" body={(data,options) => options.rowIndex + 1}></Column>
                <Column field='time_period_name' header="Period Name"></Column>
                <Column field='time_mins' body={TimeFormat} header="Period Time"></Column>
                <Column field='id' body={ActionButton} header="Actions"></Column>
            </DataTable>

            <Dialog header="Add Time Period" onHide={onHide} visible={visible} draggable={false} position='top' style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <form onSubmit={RegisterTime} id='form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Time Period Name
                                </label>
                                <InputText className='w-100 p-inputtext-sm' name='period_name' onChange={handleinput} />
                                <span className='text-danger'>{TimeRegister.error.period_name}</span>
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Time Period
                                </label>
                                <InputText keyfilter={'pint'} className='w-100 p-inputtext-sm' name='period_time' onChange={handleinput} />
                                <span className='text-danger'>{TimeRegister.error.period_time}</span>
                            </div>
                            <div className="mt-3">
                                <Button className='w-100 p-button-sm p-button-info' label='Add Time Period' icon={PrimeIcons.PLUS} />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>


            <Dialog onHide={onHide}  visible={TimeDetailsModal} header={TimeDetails.indicator == 1 ? "Edit Time Period Details" : "Remove Time Period"} draggable={false} position='top' style={{width: "50vw"}}>
                <form onSubmit={UpdateTime} id='form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Time Period Name
                                </label>
                                <InputText onChange={handleUpdate} className='w-100 p-inputtext-sm' name='time_name' value={TimeDetails.time_name} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Time Period
                                </label>
                                <InputText keyfilter={'pint'} onChange={handleUpdate} className='w-100 p-inputtext-sm' name='time_num' value={TimeDetails.time_num} />
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

export default TimePeriod