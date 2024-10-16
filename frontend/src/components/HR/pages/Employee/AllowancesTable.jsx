import axios from 'axios';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert';

function AllowancesTable(props) {

    const [loading, setLoading] = useState(true);
    const [AllowancesData, setAllowance] = useState([]);
    const [visible, setVisible] = useState(false);
    const [pickallowance, setPickAllowance] = useState([]);
    const [amount, setAmount] = useState("")
    const [Data, setData] = useState([])
    const [AllowanceAmt, setAmt] = useState(null)
    const toast = useRef();
    const [AllowanceDetailsData, setAllowanceDetails] = useState({
        indicator: "",
        id: "",
        amount_update: "",
        allowances_name: "",
        user_fk: "",
    });
    const [detailsview, setDetailsView] = useState(false);

    useEffect(() => {
        FetchAllowance();
        axios.get(`/api/AllowanceData`).then(res => {
            if(res.data.status === 200) {
                setAllowance(res.data.data)
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
        return () => {
            setLoading(true)
        }
    },[])

    const FetchAllowance = () => {
        axios.get(`/api/AllowanceEmployee/${props.data.id}`).then(res => {
            if(res.data.status === 200) {
                setData(res.data.data);
                setAmt(res.data.total)
            }
            setLoading(false)
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    const AddAllowance = () => {
        setVisible(true);
    }

    const list_allowance = AllowancesData.map((data) => {
        return (
            {label: data.allowances_name, value: data.id}
        )
    });

    const onHide = () => {
        setVisible(false)
    }

    const Add = (e) => {
        e.preventDefault();

        const data = {
            allowances_id: pickallowance,
            amount: amount,
            user_fk: localStorage.getItem('auth_id'),
            user_id: props.data.id,
            name: props.data.name,
        };

        axios.post(`/api/AddAllowanceEmployee`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Added Allowances",
                    detail: "Successfully",
                });
                document.getElementById('form').reset();
                setVisible(false);
                FetchAllowance();
            }
            else if(res.data.status === 501) {
                swal("Warning","Allowance Already Added",'warning');
                document.getElementById('form').reset();
                setVisible(false);
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }
    const Format = (Data) => {
        return (
            <span>₱{Data.amount.toFixed(2)}</span>
        )
    }

    const ButtonAction = (Data) => {
        return (
            <>
                <Button data-indicator={1} icon={PrimeIcons.PENCIL} data-allowance={Data.allowances_name} data-amount={Data.amount} data-id={Data.id} onClick={AllowanceDetails} className='m-2 p-button-sm p-button-success' label='Edit' />
                <Button data-indicator={2} icon={PrimeIcons.TRASH} data-allowance={Data.allowances_name} data-amount={Data.amount} data-id={Data.id} onClick={AllowanceDetails} className='m-2 p-button-sm p-button-danger' label='Remove' />
            </>
        )
    }

    const AllowanceDetails = (e) => {
        setDetailsView(true)
        setAllowanceDetails({
            id: e.currentTarget.getAttribute('data-id'),
            indicator: e.currentTarget.getAttribute('data-indicator'),
            amount_update: e.currentTarget.getAttribute('data-amount'),
            allowances_name: e.currentTarget.getAttribute('data-allowance'),
            user_fk: localStorage.getItem('auth_id'),
        });
    }

    const handleupdate =  (e) => {
        setAllowanceDetails({...AllowanceDetailsData, [e.target.name] : e.target.value});
    }

    const UpdateAmount = (e) => {
        e.preventDefault();
        const data = AllowanceDetailsData;
        AllowanceDetailsData.indicator == 1 ? 
        axios.put(`/api/UpdateAmount`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Amount Updated",
                    detail: "Successfully",
                });
                FetchAllowance();
                document.getElementById('form').reset();
                setDetailsView(false)
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
        :
        axios.delete(`/api/RemoveAllowance/${AllowanceDetailsData.id}`).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Allowance Removed",
                    detail: "Successfully",
                });
                FetchAllowance();
                document.getElementById('form').reset();
                setDetailsView(false)
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
            <div className="d-flex justify-content-end">
                <Button className='p-button-sm p-button-info' label='Add Allowances' onClick={AddAllowance} />
            </div>
            <DataTable value={Data} loading={loading} header="" paginator paginatorLeft rows={10}>
                <Column field='allowances_name' header="Allowance Name"></Column>
                <Column field='amount' body={Format} header="Amount"></Column>
                <Column field='id' body={ButtonAction} header="Actions"></Column>
            </DataTable>

            Total Allowances: ₱

            <Dialog header="Add Allowance" visible={visible} position='top' onHide={onHide} draggable={false} style={{ width: "50vw" }}>
                <form onSubmit={Add} id='form'>
                    <div className="row">
                        <div className="col-lg-l2 mb-2">
                            <label htmlFor="" className="form-label">
                                Allowance
                            </label>
                            <Dropdown placeholder='Allowance' value={pickallowance} onChange={(e) => setPickAllowance(e.value)} options={list_allowance} filter className='w-100 p-inputtext-sm' name='allowance' />
                        </div>
                        <div className="col-lg-12 mb-2">
                            <label htmlFor="" className="form-label">
                                Amount
                            </label>
                            <InputNumber value={amount} onValueChange={(e) => setAmount(e.value)} className='w-100 p-inputtext-sm' prefix='₱' minFractionDigits={2} />
                        </div>
                        <div className="mt-2">
                            <Button className='w-100 p-button-sm' label='Add Allowance' />
                        </div>
                    </div>
                </form>
            </Dialog>


            <Dialog onHide={() => setDetailsView(false)} header={AllowanceDetailsData.indicator == 1 ? "Details Allowance" : "Remove Allowance"} position='top' draggable={false} style={{ width: "50vw" }} visible={detailsview}>

                <form onSubmit={UpdateAmount} id='form'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Allowance Name
                                </label>
                                <InputText className='w-100 p-inputtext-sm' disabled={true} value={AllowanceDetailsData.allowances_name} />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Amount
                                </label>
                                <InputNumber value={AllowanceDetailsData.amount_update} name='amount_update' onValueChange={handleupdate} className='w-100 p-inputtext-sm'  prefix='₱' minFractionDigits={2}  />
                            </div>
                            <div className="mt-2">
                                <Button 
                                    className={`w-100 p-button-sm ${AllowanceDetailsData.indicator == 1 ? 'p-button-success' : 'p-button-danger'}`}
                                    label={AllowanceDetailsData.indicator == 1 ? "Update Allowance Amount" : "Remove Allowance"}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default AllowancesTable