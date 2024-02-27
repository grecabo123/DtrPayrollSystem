import { Panel } from 'primereact/panel'
import React, { useCallback, useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'


function Announcements() {

    const [Accounts, setAccount] = useState([]);
    const [loading, setloading] = useState(true);
    const [myEvents, setEvents] = useState({
        title: "",
        description: "",
    })
    const [visible, setVisible] = useState(false)
    const [ViewVisible, setViewVisible] = useState(false)
    const [loadingdata, setloadingdata]  = useState(false)
    const [startData, setstartData] = useState()
    const [endData, setendData] = useState()
    const [Details, setDetails] = useState([])


    useEffect(() => {
        
    },[]);

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
        },2000);
    }, [])
    const handleinput = (e) => {
        e.persist();
        setEvents({ ...myEvents, [e.target.name]: e.target.value });
    }

    const PostAnnoucment = (e) => {
        e.preventDefault();
    }


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
                    <form onSubmit={PostAnnoucment} id='reset_form'>
                        <div className="row">
                            <div className="col-lg-6 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Title
                                </label>
                                
                                <InputText className='w-100' onChange={handleinput} name='title' />
                            </div>

                            <div className="col-lg-6 col-sm-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Date:
                                </label>
                                <InputText className='w-100' value={startData} disabled readOnly />
                            </div>
                            <div className="col-lg-12 mb-2">
                                
                                <InputTextarea className='w-100' name='description' onChange={handleinput} style={{ resize: "none" }} rows={5} cols={5} />
                            </div>
                            <div className="mt-3">
                                
                                <Button className='p-button-sm p-button-info' label='Create' />
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