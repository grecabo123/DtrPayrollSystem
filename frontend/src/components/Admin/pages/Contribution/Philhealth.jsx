import axios from 'axios'
import moment from 'moment'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert'

function Philhealth() {

    const toast = useRef();
    const [loading, setLoading] = useState(true)
    const [Data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [PremiumData, setPremium] = useState();
    const [ERdata, setERdata] = useState();
    const [totalData, settotaldata] = useState();
    const [rangefromData, setrangefromData] = useState();
    const [rangetoData, setrangetoData] = useState();
    const [btnloading, setbtnloading] = useState(false)
    const [DetailsVisible, setDetailsVisible] = useState(false);
    const [DetailsData, setDetails] = useState({
        from: "",
        to: "",
        er: "",
        ee: "",
        indicator: "",
        id: "",
        user_fk: "",
    })
    useEffect(() => {
        FetchContribution();
        return () => {
            setLoading(true)
        }
    }, [])


    const FetchContribution = () => {
        axios.get(`/api/PhilhealthContribution`).then(res => {
            if (res.data.status === 200) {
                setData(res.data.data);
            }
            setLoading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const HideModal = () => {
        setVisible(false)
        setDetailsVisible(false)
    }

    const Philhealth = (e) => {
        e.preventDefault();
        setbtnloading(true)
        const data = {
            user_fk: localStorage.getItem('auth_id'),
            eedata: PremiumData,
            rangefrom: rangefromData,
            rangeto: rangetoData,
        };

        axios.post(`/api/PhilhealthRegister`, data).then(res => {
            if (res.data.status === 200) {
                toast.current.show({ severity: "success", summary: "SSS Contribution Added", detail: "Successfully" });
                document.getElementById('form').reset();
                setVisible(false)
                FetchContribution();
                setbtnloading(false)
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                setbtnloading(false)

                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }

    const RangeCompensation = (Data) => {
        return (
            <span>₱{Data.from.toFixed(2)}  - ₱{Data.to.toFixed(2)}</span>
        )
    };

    const ERFormat = (Data) => {
        return (
            <span>{Data.premium_rate}%</span>
        )
    }
    const Action = (Data) => {
        return (
            <>
                <Button className='p-button-sm p-button-success m-2' icon={PrimeIcons.PENCIL}
                    data-indicator={1}
                    data-from={Data.from}
                    data-to={Data.to}
                    data-ee={Data.premium_rate}
                    data-id={Data.id}
                    label='Edit' onClick={Display} />
                <Button className='p-button-sm p-button-danger m-2'
                    data-indicator={2}
                    data-from={Data.from}
                    data-to={Data.to}
                    data-ee={Data.premium_rate}
                    data-id={Data.id}
                    icon={PrimeIcons.TRASH} onClick={Display} label='Remove' />
            </>
        )
    }

    const Display = (e) => {
        setDetailsVisible(true)
        setDetails({
            from: e.currentTarget.getAttribute('data-from'),
            to: e.currentTarget.getAttribute('data-to'),
            ee: e.currentTarget.getAttribute('data-ee'),
            id: e.currentTarget.getAttribute('data-id'),
            indicator: e.currentTarget.getAttribute('data-indicator'),
            user_fk: localStorage.getItem('auth_id'),
        })
    }

    const handleinput = (e) => {
        setDetails({ ...DetailsData, [e.target.name]: e.target.value });
    }

    const UpdateContribution = (e) => {
        e.preventDefault();

        const data = DetailsData;

        DetailsData.indicator == 1 ?
            axios.put(`/api/PhilhealthContributionUpdate`, data).then(res => {
                if (res.data.status === 200) {
                    toast.current.show({ severity: "success", summary: "Philhealth Contribution", detail: "Updated" });
                    setDetailsVisible(false)
                    FetchContribution();
                    document.getElementById('form').reset();
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                }
            })
            :
            axios.delete(`/api/PhilhealthContributionRemove/${DetailsData.id}`).then(res => {
                if (res.data.status === 200) {
                    toast.current.show({ severity: "success", summary: "Philhealth Contribution", detail: "Deleted" });
                    FetchContribution();
                    setDetailsVisible(false)
                    document.getElementById('form').reset();
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning');
                }
            })

    }

    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
            <div className="mb-3 d-flex justify-content-end">
                <Button onClick={(e) => setVisible(true)} className='p-button-sm p-button-info' label='Add Contribution' icon={PrimeIcons.PLUS} />
            </div>
            <Panel header={`Philhealth` + ' ' + moment().format('YYYY') + ' ' + 'Contribution'}>
                <DataTable value={Data} 
                    size='small'
                    selectionMode={'single'}
                loading={loading} paginator paginatorLeft rows={10}>
                    <Column field='from' body={RangeCompensation} header="Monthly Basic Salary"></Column>
                    <Column field='premium_rate' body={ERFormat} header="Premium Rate"></Column>
                    <Column field='Action' body={Action} header="Action"></Column>
                </DataTable>
            </Panel>

            <Dialog header="Philhealth Contribution" visible={visible} position='top' draggable={false} onHide={HideModal} style={{ width: '50vw' }} >
                <form onSubmit={Philhealth} id='form'>
                    <div className="container">
                        <div className="row">
                            <label className="form-label">
                                Montly Basic Salary
                            </label>
                            <div className="col-lg-6 mb-2">
                                <InputNumber value={rangefromData} onValueChange={(e) => setrangefromData(e.value)} className='w-100 p-inputtext-sm' minFractionDigits={2} prefix='₱' />
                            </div>
                            <div className="col-lg-6 mb-2">
                                <label className="form-label">
                                </label>
                                <InputNumber value={rangetoData} className='w-100 p-inputtext-sm' onValueChange={(e) => setrangetoData(e.value)} minFractionDigits={2} prefix='₱' />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label className="form-label">
                                    Premium Rate
                                </label>
                                <InputNumber value={PremiumData} onValueChange={(e) => setPremium(e.value)} className='p-inputtext-sm w-100' suffix="%" />
                            </div>
                            <div className="mt-3">
                                <Button className='p-button-info p-button-sm' label='Add Data' loading={btnloading} />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>


            <Dialog header={DetailsData.indicator == 1 ? "Philhealth Contribution Details" : "Philhealth Contribution Remove"} visible={DetailsVisible} position='top' draggable={false} onHide={HideModal} style={{ width: '50vw' }} >
                <form onSubmit={UpdateContribution}>
                    <div className="container">
                        <div className="row">
                            <label className="form-label">
                                Range of Compensation
                            </label>
                            <div className="col-lg-6 mb-2">
                                <InputNumber value={DetailsData.from} onValueChange={handleinput} name='from' className='w-100 p-inputtext-sm' minFractionDigits={2} prefix='₱' />
                            </div>
                            <div className="col-lg-6 mb-2">
                                <label className="form-label">
                                </label>
                                <InputNumber value={DetailsData.to} onValueChange={handleinput} name='to' className='w-100 p-inputtext-sm' minFractionDigits={2} prefix='₱' />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label className="form-label">
                                    Premium Rate
                                </label>
                                <InputNumber value={DetailsData.ee} className='p-inputtext-sm w-100' onValueChange={handleinput} name='ee' suffix="%" minFractionDigits={2} />
                            </div>     
                            <div className="mt-3">
                                <Button className={ DetailsData.indicator == 1 ? `p-button-info p-button-sm` : `p-button-danger p-button-sm`} label={DetailsData.indicator == 1 ? "Update" : "Remove"} />
                            </div>
                        </div>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default Philhealth