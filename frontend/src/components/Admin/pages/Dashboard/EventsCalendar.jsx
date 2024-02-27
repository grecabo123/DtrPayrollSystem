import { Panel } from 'primereact/panel'
import React, { useCallback, useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios';
import swal from 'sweetalert';



function EventsCalendar() {
    
    const [Details, setDetails] = useState([])
    const [loading, setloading] = useState(true);
    useEffect(() => {
        axios.get(`/api/AllEvent`).then(res => {
            if(res.data.status === 200) {
                setDetails(res.data.data)
            }   
            setloading(false);
        }).catch((error) => {
            if(error.response.status === 500){
                swal("Warning",error.response.statusText,'warning');
            }
        })
    },[]);

    const [Accounts, setAccount] = useState([]);
    const [myEvents, setEvents] = useState({
        title: "",
        description: "",
    })
    const [visible, setVisible] = useState(false)
    const [ViewVisible, setViewVisible] = useState(false)
    const [loadingdata, setloadingdata]  = useState(false)
    const [startData, setstartData] = useState()
    const [endData, setendData] = useState()


    useEffect(() => {
        
    },[]);

    const localizer = momentLocalizer(moment)
    const onHide = () => {
        setViewVisible(false)
        setVisible(false)
    }

    const events = Details.map((data) => {
        return (
            { id: data.id, title: data.event_title, start: data.date_event, end: data.date_event, text: data.description }
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
                <Calendar
                    localizer={localizer}
                     events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onSelectSlot={handleSelectSlot}
                     onSelectEvent={handleSelectEvent}
                    selectable
                    enableAutoScroll
                />
        </div>
    )
}

export default EventsCalendar