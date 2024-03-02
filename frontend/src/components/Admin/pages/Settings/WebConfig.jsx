import { Panel } from 'primereact/panel'
import React, { useEffect, useRef, useState } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { ColorPicker } from 'primereact/colorpicker';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';
import swal from 'sweetalert';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import TimePeriod from '../Period/TimePeriod';
import Allowances from '../Period/Allowances';



function WebConfig() {

    const [color, setColor] = useState()
    const [Infomation, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [CompanyDetails, setDetails] = useState({
        company_name: "",
        company_code: "",
        company_tagline: "",
    });
    const toast = useRef();

    useEffect(() => {
        FetchData();
        return () => {
            setLoading(true)
        }
    }, []);

    const handleInput = (e) => {
        e.persist();
        setDetails({ ...CompanyDetails, [e.target.name]: e.target.value });
    };
    const handleUpdate = (e) => {
        e.persist();
        setInfo({...Infomation, [e.target.name] : e.target.value});
    }

    const FetchData = () => {
        axios.get(`/api/CompanyInfo`).then(res => {
            if (res.data.status === 200) {
                setInfo(res.data.data);
            }
            setLoading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }




    const ApplyChanges = (e) => {
        e.preventDefault();

        const data = {
            company_name: CompanyDetails.company_name,
            company_code: CompanyDetails.company_code,
            company_tagline: CompanyDetails.company_tagline,
            user_fk: localStorage.getItem('auth_id'),
        };

        const data_new = Infomation;

        {
            Infomation == null ?
            axios.post(`/api/RegisterCompanyInfo`, data).then(res => {
                if (res.data.status === 200) {
                    toast.current.show({ severity: "success", summary: "Apply Changes", detail: "Successfully" });
                    FetchData();
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning')
                }
            })

            :
            axios.put(`/api/UpdateInfo`,data_new).then(res => {
                if(res.data.status === 200) {
                    toast.current.show({ severity: "success", summary: "Apply Changes", detail: "Successfully" });
                    FetchData();
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    swal("Warning", error.response.statusText, 'warning')
                }
            })
        }

    }

    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
            <Panel header="System Configuration">
                <TabView>
                    <TabPanel header="Configuration">
                        {
                            loading ? <Skeleton />
                                :
                                <form onSubmit={ApplyChanges}>
                                    <Divider>
                                        <span className='p-tag'>Company Details</span>
                                    </Divider>
                                    {
                                        Infomation == null ?
                                            <div className="row">
                                                <div className="col-lg-6 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Company Name
                                                    </label>
                                                    <InputText onChange={handleInput} name='company_name' className='w-100 p-inputtext-sm' />
                                                </div>
                                                <div className="col-lg-6 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Company ID Code
                                                    </label>
                                                    <InputText onChange={handleInput} name='company_code' className='w-100 p-inputtext-sm' />
                                                </div>
                                                <div className="col-lg-6 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Company Logo
                                                    </label>
                                                    <InputText type='file' className='w-100 p-inputtext-sm' />
                                                </div>
                                                <div className="col-lg-6 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Company Color Code
                                                    </label>
                                                    <ColorPicker className='w-100' value={color} onChange={(e) => setColor(e.value)} />
                                                </div>
                                                <div className="col-lg-12 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Tagline
                                                    </label>
                                                    <InputTextarea className='w-100' onChange={handleInput} name='company_tagline' rows={5} cols={5} style={{ resize: "none" }} />
                                                </div>
                                            </div>
                                            :
                                            <div className="row">
                                                <div className="col-lg-6 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Company Name
                                                    </label>
                                                    <InputText onChange={handleUpdate} name='company_name' value={Infomation.company_name} className='w-100 p-inputtext-sm' />
                                                </div>
                                                <div className="col-lg-6 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Company ID Code
                                                    </label>
                                                    <InputText onChange={handleUpdate} value={Infomation.company_code} name='company_code' className='w-100 p-inputtext-sm' />
                                                </div>
                                                <div className="col-lg-6 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Company Logo
                                                    </label>
                                                    <InputText type='file' className='w-100 p-inputtext-sm' />
                                                </div>
                                                <div className="col-lg-6 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Company Color Code
                                                    </label>
                                                    <ColorPicker className='w-100' value={color} onChange={(e) => setColor(e.value)} />
                                                </div>
                                                <div className="col-lg-12 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Tagline
                                                    </label>
                                                    <InputTextarea value={Infomation.company_tagline} className='w-100' onChange={handleUpdate} name='company_tagline' rows={5} cols={5} style={{ resize: "none" }} />
                                                </div>
                                            </div>
                                    }
                                    <div className="mt-3">
                                        <Button className='p-button-success p-button-sm' label='Apply Changes' />
                                    </div>
                                </form>
                        }
                    </TabPanel>
                    <TabPanel header="Notification">
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </TabPanel>
                    <TabPanel header="Allowanes & Time Period">
                      <div className="row">
                        <div className="col-lg-12 mb-2">
                        <Allowances />
                        </div>
                        <div className="col-lg-12 mb-2">
                       <TimePeriod />

                        </div>
                      </div>
                    </TabPanel>
                </TabView>
            </Panel>
        </div>
    )
}

export default WebConfig