import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useRef, useState } from 'react'
import CoreValues from './CoreValues';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import swal from 'sweetalert';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

function Evaluation() {

    const [visible, setVisible] = useState(false)
    const [addcore, setAdd] = useState({
        core: "",
        desc: "",
        error: [],
    });
    const [details, setDetails] = useState({
        indicator: "",
        corename: "",
        description: "",
        id: "",
    });
    const toast = useRef(null);
    const [coredata, setCoreData] = useState([]);
    const [loading, setloading] = useState(true);
    const [visibledetails, setVisibleDetails] = useState(false);
    useEffect(() => {
        FetchCore();
        return () => {
            setloading(false)
        }
    },[]);

    
    const FetchCore = () => {
        axios.get(`/api/CoreData`).then(res => {
            if(res.data.status === 200) {
                setCoreData(res.data.data);
            }
            else{

            }
            setloading(false)
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    const handleinput = (e) => {
        e.persist();
        setAdd({...addcore, [e.target.name] : e.target.value});
    }

    const handleupdate = (e) => {
        e.persist();
        setDetails({...details, [e.target.name] : e.target.value});
    }

    const AddCore = (e) => {
        e.preventDefault();
        const data = {
            core: addcore.core,
            description: addcore.desc,
            user_fk: localStorage.getItem('auth_id'),
        };
        axios.post(`/api/AddCore`,data).then(res => {
            if(res.data.status === 200) {
                setVisible(false)
                toast.current.show({
                    severity: "success",
                    summary: "Added Core Values",
                    detail: "Successfully"
                });
                FetchCore();
                document.getElementById('form').reset();
            }
            else{
                setAdd({...addcore, error: res.data.error});
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    }

    const ActionButton = (coredata) => {
        return (
            <>
                <Button 
                data-id={coredata.id} 
                className='p-button-success p-button-sm m-1' 
                data-indicator={1}
                data-core={coredata.CoreName} 
                data-desc={coredata.description} 
                onClick={Details} 
                label='Edit' 
                icon={PrimeIcons.PENCIL}  />
                <Button data-id={coredata.id} 
                className='p-button-danger p-button-sm m-1' 
                data-indicator={2}
                data-core={coredata.CoreName} 
                data-desc={coredata.description} 
                onClick={Details} label='Remove' icon={PrimeIcons.TRASH}  />
            </>
        )
    }

    const Details = (e) => {
        setVisibleDetails(true)
        setDetails({
            indicator: e.currentTarget.getAttribute('data-indicator'),
            corename: e.currentTarget.getAttribute('data-core'),
            description: e.currentTarget.getAttribute('data-desc'),
            id: e.currentTarget.getAttribute('data-id'),
        })
    }

    const formUpdate = (e) => {
        e.preventDefault();

        const data = details;

        details.indicator == 1 ?

        axios.put(`/api/UpdateCore`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Core Values Has Been Updates",
                    detail: "Successfully",
                })
                FetchCore();
                setVisibleDetails(false)
                document.getElementById('form').reset();
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })

        : 
        axios.delete(`/api/RemoveCore/${details.id}`).then(res => {
            if(res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Core Values Removed",
                    detail: "Successfully",
                })
                FetchCore();
                setVisibleDetails(false)
                document.getElementById('form').reset();
            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning')
            }
        })
    }

    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
            <div className="d-flex justify-content-end">
                <Button className='p-button-sm p-button-info' label='Add Core' onClick={(e) => setVisible(true)} icon={PrimeIcons.PLUS} />
            </div>
            <DataTable value={coredata} loading={loading} header="Core And Values" paginator paginatorLeft rows={10}>
                <Column field='CoreName' header="Core"></Column>
                <Column field='description' header="Description"></Column>
                <Column field='id' body={ActionButton} header="Action"></Column>
            </DataTable>
            
            <Dialog header="Add Core Values" onHide={() => setVisible(false)} visible={visible} position='top' draggable={false} 
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                >
                <form onSubmit={AddCore} id='form'>
                    <div className="row">
                        <div className="col-lg-12 mb-2">
                            <label htmlFor="" className="form-label">
                                Core Name
                            </label>
                            <InputText className='w-100 p-inputtext-sm' name='core' onChange={handleinput} placeholder='' />
                        </div>
                        <div className="col-lg-12 mb-2">
                            <label htmlFor="" className="form-label">
                                Description
                            </label>
                            <InputTextarea rows={5} cols={5} style={{ resize: "none" }} className='w-100' placeholder='Description...' name='desc' onChange={handleinput} />
                        </div>
                        <div className="mt-3">
                            <Button className='p-button-sm' label='Register Core' />
                        </div>
                    </div>
                </form>
            </Dialog>

            <Dialog header={details.indicator == 1 ? "Edit Core Values" : "Remove Core Values"} position='top' visible={visibledetails}  draggable={false}
                onHide={() => setVisibleDetails(false)}

                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
                <form onSubmit={formUpdate} id='form'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 mb-2">
                            <label htmlFor="" className="form-label">
                                Core Name
                            </label>
                            <InputText className='w-100 p-inputtext-sm'   name='corename' onChange={handleupdate}
                                value={details.corename}
                            />
                        </div>
                        <div className="col-lg-12 mb-2">
                            <label htmlFor="" className="form-label">
                                Description
                            </label>
                            <InputTextarea className='w-100' value={details.description} rows={5} cols={5} name='description' onChange={handleupdate} />
                        </div>
                        <div className="mt-3">
                            <Button  className={details.indicator == 1 ? 'w-100 p-button-sm p-button-success' : 'w-100 p-button-sm p-button-danger'} 
                                label={details.indicator == 1 ? "Update Core" : "Remove Core"}
                            />
                        </div>
                    </div>
                </div>
                </form>

            </Dialog>
        </div>
    )
}

export default Evaluation