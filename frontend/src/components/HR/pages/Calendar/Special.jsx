import axios from 'axios'
import moment from 'moment'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert'

function Special() {

    const [visible, setVisible] = useState(false);
    const [Data, setData] = useState({
        holiday: "",
    });
    const [loading, setloading] = useState(true);
    const [HolidayData, setHolidayData] = useState([]);
    const toast = useRef();
    const [ratedata, setratedata] = useState();
    const [holidate, setHolidate] = useState();
    const [DetailsVisible, setDetailsVisible] = useState(false);
    const [Detaild, setDetails] = useState({
        name: "",
        rate: "",
        id: "",
        date_: "",
        indicator: "",
        user_fk: "",
    });

    useEffect(() => {

        FetchHoliday();

        return () => {
            setloading(true);
        }
    }, [])

    const FetchHoliday = () => {
        axios.get(`/api/SpecialHoliday`).then(res => {
            if (res.data.status === 200) {
                setHolidayData(res.data.data)
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
        setData({ ...Data, [e.target.name]: e.target.value });
    }

    const AddHoliday = (e) => {
        e.preventDefault();

        const data = {
            user_fk: localStorage.getItem('auth_id'),
            holiday: Data.holiday,
            rate: ratedata,
            date_: moment(holidate).format('MMMM DD YYYY'),
            type: 2,
        };
        axios.post(`/api/AddHoliday`, data).then(res => {
            if (res.data.status === 200) {
                toast.current.show({ severity: "success", summary: "Added Holiday", detail: "Successfully" });
                setVisible(false);
                FetchHoliday();
                document.getElementById('form').reset();
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const rate_format = (HolidayData) => {
        return (
            <>
                <span>{HolidayData.rate_day}%</span>
            </>
        )
    }

    const ActionButton = (HolidayData) => {
        return (
            <>
                <Button className='p-button-success p-button-sm m-2'
                    data-name={HolidayData.holiday_name}
                    data-rate={HolidayData.rate_day}
                    data-date_={HolidayData.holiday_date}
                    data-id={HolidayData.id}
                    data-indicator={1}
                    label='Edit' onClick={Display} icon={PrimeIcons.PENCIL} />
                <Button className='p-button-danger p-button-sm m-2' label='Remove'
                    data-name={HolidayData.holiday_name}
                    data-rate={HolidayData.rate_day}
                    data-date_={HolidayData.holiday_date}
                    data-id={HolidayData.id}
                    data-indicator={2}

                    onClick={Display} icon={PrimeIcons.TRASH} />
            </>
        )
    }


    const onHide = () =>{
        setVisible(false)
        setDetailsVisible(false)
    }

    const Display = (e) => {
        setDetailsVisible(true)
        setDetails({
            id: e.currentTarget.getAttribute('data-id'),
            name: e.currentTarget.getAttribute('data-name'),
            rate: e.currentTarget.getAttribute('data-rate'),
            date_: e.currentTarget.getAttribute('data-date_'),
            indicator: e.currentTarget.getAttribute('data-indicator'),
            user_fk: localStorage.getItem('auth_id')
        });
    }

    const handleUpdate = (e) => {
        setDetails({...Detaild, [e.target.name] : e.target.value});
    }

    const UpdateHoliday = (e) => {
        e.preventDefault();
        const data = {
            name: Detaild.name,
            rate: Detaild.rate,
            id: Detaild.id,
            new_date: moment(Detaild.date_).format('MMMM DD YYYY'),
        };
        Detaild.indicator == 1 ?
        axios.put(`/api/UpdateHoliday`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({ severity: "success", summary: "Updated Holiday Data", detail: "Successfully" });
                setDetailsVisible(false);
                FetchHoliday();
                document.getElementById('form').reset();
            }
        }).catch((error) => {
            swal("Warning",error.response.statusText,'warning');
        })
        :
        axios.delete(`/api/RemoveHoliday/${Detaild.id}`).then(res => {
            if(res.data.status === 200) {
                toast.current.show({ severity: "success", summary: "Removed Holiday Data", detail: "Successfully" });
                setDetailsVisible(false);
                FetchHoliday();
                document.getElementById('form').reset();
            }
        }).catch((error) => {
            swal("Warning",error.response.statusText,'warning');
        })
    }


    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
            <div className="d-flex justify-content-end mb-2">
                <Button className='p-button-sm p-button-info' onClick={(e) => setVisible(true)} icon={PrimeIcons.PLUS} label='Register Holiday' />
            </div>
            <Panel header="Special Holiday">
                <DataTable value={HolidayData}
                    rows={10}
                    paginator
                    paginatorLeft
                    loading={loading}
                >

                    <Column field='holiday_name' header="Holiday Name"></Column>
                    <Column field='rate_day' body={rate_format} header="Holiday Rate"></Column>
                    <Column field='holiday_date' header="Holiday Date"></Column>
                    <Column field='id' body={ActionButton} header="Action"></Column>

                </DataTable>
            </Panel>

            <Dialog header="Add Legal Holiday" onHide={onHide} visible={visible} draggable={false} position='top' style={{ width: '50vw' }} >
                <form onSubmit={AddHoliday} id='form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Holiday Name
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='holiday' />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Rate
                                </label>
                                <InputNumber value={ratedata} onValueChange={(e) => setratedata(e.value)} className='w-100 p-inputtext-sm' suffix='%' />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Date
                                </label>
                                <Calendar value={holidate} onChange={(e) => setHolidate(e.value)} className='w-100 p-inputtext-sm' showButtonBar showIcon />
                            </div>
                            <div className="mt-3">
                                <Button className='w-100' label='Add Legal Holiday' />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>   

            <Dialog onHide={onHide} header={Detaild.indicator == 1 ? "Details Legal Holiday" : "Remove Legal Holiday"} visible={DetailsVisible} draggable={false} position='top' style={{ width: '50vw' }} >
            <form onSubmit={UpdateHoliday} id='form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Holiday Name
                                </label>
                                <InputText value={Detaild.name} className='w-100 p-inputtext-sm' onChange={handleUpdate} name='name' />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Rate
                                </label>
                                <InputNumber value={Detaild.rate} onValueChange={handleUpdate} className='w-100 p-inputtext-sm' suffix='%' name='rate' />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Date
                                </label>
                                <Calendar value={Detaild.date_ ? moment(Detaild.date_).toDate() : null} onChange={handleUpdate} name='date_' className='w-100 p-inputtext-sm' showButtonBar showIcon />
                            </div>
                            <div className="mt-3">
                                <Button className={Detaild.indicator == 1 ? "p-button-success w-100" : "p-button-danger w-100"} label={Detaild.indicator == 1 ? "Update Holiday" : "Delete Holiday"} />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default Special