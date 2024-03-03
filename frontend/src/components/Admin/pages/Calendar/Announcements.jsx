import { Panel } from 'primereact/panel'
import React, { useCallback, useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'
import axios from 'axios'


function Announcements() {

    const [Accounts, setAccount] = useState([]);
    const [loading, setloading] = useState(true);
    const [myEvents, setEvents] = useState({
        title: "",
        description: "",
    })
    const [Departments, setDepartment] = useState([]);
    const [pick, setpick] = useState(null)
    const [visible, setVisible] = useState(false)
    const [ViewVisible, setViewVisible] = useState(false)
    const [loadingdata, setloadingdata] = useState(false)
    const [startData, setstartData] = useState()
    const [endData, setendData] = useState()
    const [Details, setDetails] = useState([])
    const [AddressData, setAddress] = useState([])
    const [Departmentpick, setDepartmentPick] = useState([])


    useEffect(() => {
        axios.get(`/api/FetchData`).then(res => {
            if (res.data.status === 200) {
                setDepartment(res.data.data);
            }
            setloading()
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, []);

    const localizer = momentLocalizer(moment)
    const onHide = () => {
        setViewVisible(false)
        setVisible(false)
    }

    const events = Accounts.map((data) => {
        return (
            { id: data.id, title: data.title, start: data.date_annoucment, end: data.date_annoucment, text: data.description }
        )
    });

    const list_department = Departments.map((data) => {
        return (
            { label: data.department, value: data.id }
        )
    })

    const handleSelectSlot = useCallback(({ start, end }) => {
        setVisible(true);
        setstartData(moment(start).format('MMM DD YYYY'));
        setendData(moment(end).format('MMM DD YYYY'));
    }, [])

    const handleSelectEvent = useCallback((event) => {
        setViewVisible(true);
        setDetails(event)
        setTimeout(() => {
            setloadingdata(false)
        }, 2000);
    }, [])
    const handleinput = (e) => {
        e.persist();
        setEvents({ ...myEvents, [e.target.name]: e.target.value });
    }

    const PostAnnoucment = (e) => {
        e.preventDefault();
    }

    const list_pick = [
        { label: "Memo", value: 1 },
        { label: "Meeting", value: 2 },
    ]

    const address_to = [
        { label: "All Users", value: 1 },
        { label: "Department", value: 2 },
        { label: "Specific Person", value: 3 },
    ]


    console.log(startData + '' + endData);


    return (
        <div className='container-fluid'>
            <Panel header="Announement">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 800 }}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    selectable
                    enableAutoScroll
                />
            </Panel>

            <Dialog position='top' draggable={false} header="Create Annoucement" visible={visible} onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>
                <div className="container">
                    <form>
                        <div className="row">
                            <div className="col-lg-12 mb-1">
                                <label htmlFor="" className="form-label">
                                    Type of Announcement
                                </label>
                                <Dropdown value={pick} onChange={(e) => setpick(e.value)} options={list_pick} className='mb-4 w-100 p-inputtext-sm' placeholder='Choose Announcement' />
                            </div>
                            <div className="col-lg-12 mb-1">
                                <label htmlFor="" className="form-label">
                                    Address To
                                </label>
                                <Dropdown value={AddressData} options={address_to} onChange={(e) => setAddress(e.value)} className='w-100 p-inputtext-sm' placeholder='Choose to Address' />
                            </div>
                            {
                                pick == 1 ?
                                    <>
                                        {
                                            AddressData == 1 ? "" : AddressData == 2 ?
                                                <div className="col-lg-12 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        Department
                                                    </label>
                                                    <MultiSelect value={Departmentpick} onChange={(e) => setDepartmentPick(e.value)} display='chip' className='w-100 p-inputtext-sm' filter options={list_department} placeholder='List of Department' />
                                                </div>
                                                : <div className="col-lg-12 mb-2">
                                                    <label htmlFor="" className="form-label">
                                                        List of Employee
                                                    </label>
                                                    <MultiSelect display='chip' className='w-100 p-inputtext-sm' filter placeholder='List of Employee' />
                                                </div>
                                        }
                                        <div className="col-lg-6 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Title
                                            </label>
                                            <InputText className='w-100' name='title' />
                                        </div>
                                        <div className="col-lg-6 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Date
                                            </label>
                                            <InputText className='w-100' name='title' value={startData} readOnly />
                                        </div>
                                        <div className="col-lg-12 mb-2">
                                            <label htmlFor="" className="form-label">
                                                Message
                                            </label>
                                            <InputTextarea className='w-100' rows={5} cols={5} style={{ resize: "none" }} />
                                        </div>

                                    </>
                                    :
                                    pick == 2 ?
                                        <>
                                            {
                                                AddressData == 1 ? "" : AddressData == 2 ?
                                                    <div className="col-lg-12 mb-2">
                                                        <label htmlFor="" className="form-label">
                                                            Department
                                                        </label>
                                                        <Dropdown className='w-100 p-inputtext-sm' filter placeholder='Choose Department' />
                                                    </div>
                                                    : <div className="col-lg-12 mb-2">
                                                        <MultiSelect className='w-100 p-inputtext-sm' filter />
                                                    </div>
                                            }
                                            <div className="col-lg-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Title
                                                </label>
                                                <InputText className='w-100 p-inputtext-sm' />
                                            </div>
                                            <div className="col-lg-12 mb-2">
                                                <label htmlFor="" className="form-label">
                                                    Meeting Link
                                                </label>
                                                <InputText placeholder='' className='w-100 p-inputtext-sm' />
                                            </div>
                                        </>
                                        :
                                        ""
                            }
                            <div className="">
                                <Button className='w-100 p-button-info' label='Post Annoucement' />
                            </div>
                        </div>
                    </form>
                </div>


            </Dialog>

            <Dialog header="Annoucement Details" visible={ViewVisible} draggable={false} position='top' onHide={onHide} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }}>

            </Dialog>
        </div>
    )
}

export default Announcements