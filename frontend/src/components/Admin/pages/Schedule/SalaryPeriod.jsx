import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import swal from 'sweetalert'
import { Toast } from 'primereact/toast'
import _ from 'lodash'

function SalaryPeriod() {

    const [visible, setVisible] = useState(false);
    const [fromdata, setData] = useState();
    const [todata, setDatato] = useState();
    const toast = useRef();
    const [SalaryData, setSalary] = useState([]);
    const [loading, setloading] = useState(true);
    const [DetailInfo, setInfo] = useState({
        from: "",
        to: "",
        indicator: "",
        id: "",
    })
    const [DetailsVisible, setDetailsVisible] = useState(false);
    const HideModal = (e) => {
        setVisible(false)
        setDetailsVisible(false)
    }
    

    useEffect(() => {
        FetchSalary();
        return () => {
            setloading(true)
        }
    },[])

    const FetchSalary = () => {
        axios.get(`/api/FetchSalary`).then(res => {
            if(res.data.status === 200) {
                setSalary(res.data.data);
            }  
            setloading(false)
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    const CreateSalary = (e) => {
        e.preventDefault();

        const data = {
            user_fk: localStorage.getItem('auth_id'),
            from: moment(fromdata).format('MMM DD YYYY'),
            to: moment(todata).format('MMM DD YYYY'),
            text_sal: moment(todata).format('MMM Do')+' '+'Salary Period',
        };

        axios.post(`/api/CreateSalary`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: "success", summary: "Added Salary Period", detail: "Successfully"});
                document.getElementById('form').reset();
                setVisible(false);
                FetchSalary();
                setData("")
                setDatato("")
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    const ActionButton = (SalaryData) => {
        return (
            <>
                <Button className='p-button-sm p-button-info m-2' label='Details' 
                    data-indicator={1}
                    data-from={SalaryData.from_date}
                    data-to={SalaryData.end_date}
                    data-id={SalaryData.id}
                    onClick={DetailsData}
                />
                <Button className='p-button-sm p-button-danger m-2' label='Remove'
                    data-indicator={2}
                    data-from={SalaryData.from_date}
                    data-to={SalaryData.end_date}
                    data-id={SalaryData.id}
                    onClick={DetailsData}

                icon={PrimeIcons.TRASH} />
            </>
        )
    }

    const handleUpdate = (e) => {
        setInfo({...DetailInfo, [e.target.name] : e.target.value});
    }

    const UpdateSalary = (e) => {
        e.preventDefault();

        const data  = {
            user_fk: localStorage.getItem('auth_id'),
            id: DetailInfo.id,
            from: moment(DetailInfo.from).format('MM DD YYYY'),
            to: moment(DetailInfo.to).format('MM DD YYYY'),
            salary_text: moment(DetailInfo.to).format('MMM Do')+' '+'Salary Period',
        };

        DetailInfo.indicator == 1 ?
        axios.put(`/api/SalaryUpdate`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: 'success', summary: "Salary Period Update", detail: "Successfully"});
                FetchSalary();
                setDetailsVisible(false)
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
        :
        axios.delete(`/api/SalaryRemove/${DetailInfo.id}`).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: "success", summary: "Remove Salary", detail: "Successfully"});
                FetchSalary();
                setDetailsVisible(false)
            }
        }).catch((error) => {
            if(error.response.status === 500) {

            }
        })
    }

    const DetailsData = (e) => {
        setDetailsVisible(true);
        setInfo({
            id: e.currentTarget.getAttribute('data-id'),
            from: e.currentTarget.getAttribute('data-from'),
            to: e.currentTarget.getAttribute('data-to'),
            indicator: e.currentTarget.getAttribute('data-indicator'),
        })
    }

    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
            <Panel header="Salary Period">
                <div className="mb-3 d-flex justify-content-end">
                    <Button className='p-button-info p-button-sm' onClick={(e) => setVisible(true)} label='Create Salary' icon={PrimeIcons.PLUS} />
                </div>

                <DataTable value={SalaryData} loading={loading} paginator
                    selectionMode={'single'}
                    size='small'
                    paginatorLeft rows={10}>
                    <Column field='salary_period' header="Salary Period"></Column>
                    <Column field='from_date' body={(SalaryData) => <span>{moment(SalaryData.from_date).format('MMMM DD YYYY')}</span>} header="From Date"></Column>
                    <Column field='end_date' body={(SalaryData) => <span>{moment(SalaryData.end_date).format('MMMM DD YYYY')}</span>} header="End Date"></Column>
                    <Column field='id' body={ActionButton} header="Actions"></Column>
                </DataTable>


                <Dialog onHide={HideModal} header="Create Salary Period" visible={visible} position='top' draggable={false} style={{ width: "50vw" }}>
                    <form onSubmit={CreateSalary} id='form'>
                        <div className="container">
                            <div className="row">
                                
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        From
                                    </label>
                                    <Calendar disabledDays={[0]} value={fromdata} onChange={(e) => setData(e.value)} className='w-100' showIcon />
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        To
                                    </label>
                                    <Calendar disabledDays={[0]} value={todata} onChange={(e) => setDatato(e.value)} className='w-100' showIcon />
                                </div>
                                <div className="mt-3">
                                    <Button className='w-100 p-button-info ' label='Create Period' />
                                </div>
                            </div>
                        </div>
                    </form>
                </Dialog>


                <Dialog onHide={HideModal} header={DetailInfo.indicator == 1 ? "Details Salary Period" : "Remove Salary Period"} visible={DetailsVisible} position='top' draggable={false} style={{ width: "50vw" }}>
                    <form onSubmit={UpdateSalary} id='form'>
                        <div className="container">
                            <div className="row">     
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        From
                                    </label>
                                    <Calendar disabledDays={[0]} value={DetailInfo.from ? moment(DetailInfo.from).toDate() : null} onChange={handleUpdate} name='from' className='w-100' showIcon />
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        To
                                    </label>
                                    {/* <Calendar value={Detaild.date_ ? moment(Detaild.date_).toDate() : null} onChange={handleUpdate} name='date_' className='w-100 p-inputtext-sm' showButtonBar showIcon /> */}
                                    <Calendar disabledDays={[0]} value={DetailInfo.to ? moment(DetailInfo.to).toDate() : null} onChange={handleUpdate} name='to' className='w-100' showIcon />
                                </div>
                                <div className="mt-3">
                                    <Button className={DetailInfo.indicator == 1 ? "p-button-success w-100" : "p-button-danger  w-100"} label={DetailInfo.indicator == 1 ? "Update Salary Period" : "Delete Salary Period"} />
                                </div>
                            </div>
                        </div>
                    </form>
                </Dialog>

            </Panel>
        </div>
    )
}

export default SalaryPeriod