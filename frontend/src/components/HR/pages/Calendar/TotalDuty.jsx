import axios from 'axios';
import moment from 'moment';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel'
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert';

function TotalDuty() {

    const [visible, setVisible] = useState(false)
    const [btnloading, setbtnloading] = useState(false)
    const [num, setnum] = useState();
    const [loading, setloading] = useState(true);
    const [numdata, setnumdata] = useState([]);
    const [ModalDisplay, setEditModal] = useState(false);
    const [Countdays, setCount] = useState({
        overall: "",
        saturday: "",
        friday: "",
    })
    const [daysDetails, setDetails] = useState({
        id: "",
        days: "",
        user_fk: "",
    });
    const currentYear = moment().year();
    const daysInYear = moment(`${currentYear}-12-31`).dayOfYear();
    const sundays = Math.floor(daysInYear / 7);
    const daysWithoutSunday = daysInYear - sundays;
    const daysWithoutSaturdaySunday = daysInYear - (2 * sundays);
    
    const toast = useRef();
    useEffect(() => {
        FetchData();

        return () => {
            setloading(true)
        }
    }, []);



    const FetchData = () => {
        axios.get(`/api/Days`).then(res => {
            if (res.data.status === 200) {
                setnumdata(res.data.data);
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const AddDays = (e) => {
        e.preventDefault();
        setbtnloading(true)
        const data = {
            user_fk: localStorage.getItem('auth_id'),
            days: num,
        };
        axios.post(`/api/AddDays`, data).then(res => {
            if (res.data.status === 200) {
                toast.current.show({ severity: "success", summary: "Data Registered", detail: "Successfully" });
                document.getElementById('form').reset();
                FetchData();
                setVisible(false);
                setbtnloading(false);
            }
            else if(res.data.status === 204){
                setbtnloading(false)
                swal("Warning","Cannot be Add", 'warning');
            }
        }).catch((error) => {
            if (error.response.status === 500) {

                swal("Warning", error.response.statusText, 'warning');
                setbtnloading(false);
            }
        })
    }

    const date_format = (numdata) => {
        return (
            <>
                <span>{moment(numdata.created_at).format('MMM DD YYYY')}</span>
            </>
        )
    }

    const HideModal = () => {
        setEditModal(false);
        setVisible(false)
    }

    const handleupdate = (e) => {
        e.persist();
        setDetails({ ...daysDetails, [e.target.name]: e.target.value });
    }

    const ActionButton = (numdata) => {
        return (
            <>
                <Button className='p-button-sm p-button-success' label='Edit'
                    data-id={numdata.id}
                    data-days={numdata.days}
                    data-user_fk={localStorage.getItem('auth_id')}
                    icon={PrimeIcons.PLUS}
                    onClick={EditModal}
                />
            </>
        )
    }

    const UpdateDays = (e) => {
        e.preventDefault();

        const data = daysDetails;

        axios.put(`/api/UpdateDays`, data).then(res => {
            if (res.data.status === 200) {
                toast.current.show({ severity: 'success', summary: "Days has been updated", detail: "Successfully" });
                setEditModal(false)
                FetchData();
                document.getElementById('form').reset();
            }
        }).catch((error) => {
            if (error.response.status === 500) {

            }
        })
    }

    const EditModal = (e) => {
        setEditModal(true)
        setDetails({
            id: e.currentTarget.getAttribute('data-id'),
            days: e.currentTarget.getAttribute('data-days'),
            user_fk: localStorage.getItem('auth_id'),
        });
    }




    return (
        <div className='container-fluid'>
            <Panel header="Number of Duties">
                <Toast ref={toast} />
                <div className="d-flex justify-content-end">
                    <Button className='p-button-sm p-button-info' label='Reguster' icon={PrimeIcons.CALENDAR}
                        onClick={(e) => setVisible(true)}
                    />
                </div>
                <DataTable loading={loading} value={numdata} paginator paginatorLeft rows={10}>
                    <Column field='days' header="Total"></Column>
                    <Column field='id' body={ActionButton} header="Actions"></Column>
                    <Column field='created_at' body={date_format} header="Created"></Column>
                </DataTable>

                <div className="mt-3">
                    <h6> Number of Days in {moment().format('YYYY')}</h6>
                    <li>
                        <span>Total Days:  {daysInYear}</span>
                    </li>
                    <li>
                        <span>Without Sunday & Saturday:  {daysWithoutSaturdaySunday}</span>
                    </li>
                    <li>

                        <span>Without Sunday:  {daysWithoutSunday}</span>
                    </li>
                </div>
            </Panel>

            <Dialog header="Add Days" visible={visible} onHide={HideModal} position='top' draggable={false} style={{ width: "50vw" }} >
                <form onSubmit={AddDays} id='form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Number of Days
                                </label>
                                <InputText value={num} onChange={(e) => setnum(e.target.value)} className='w-100 p-inputtext-sm' keyfilter={'pint'} name='days' />
                            </div>
                        </div>
                        <div className="mt-3">
                            <Button className='w-100' label='Register' loading={btnloading} />
                        </div>
                    </div>
                </form>
            </Dialog>

            <Dialog onHide={HideModal} header="Edit Number of Days" visible={ModalDisplay} position='top' draggable={false} style={{ width: '50vw' }}>
                <form onSubmit={UpdateDays} id='form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-labe">
                                    Number of Days
                                </label>
                                <InputText value={daysDetails.days} onChange={handleupdate} className='w-100 p-inputtext-sm' keyfilter={'pint'} name='days' />
                            </div>
                            <div className="mt-3">
                                <Button className='w-100 p-button-success' label='Update' />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default TotalDuty