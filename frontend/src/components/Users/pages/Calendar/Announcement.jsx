import moment from 'moment';
import { Panel } from 'primereact/panel';
import React, { useCallback } from 'react'
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'


function Announcement() {

    
    const localizer = momentLocalizer(moment)
    const [Accounts, setAccount] = useState([]);
    const handleSelectSlot = useCallback(({ start, end }) => {
        setVisible(true);
        setstartData(moment(start).format('MMM DD YYYY'));
        setendData(moment(end).format('MMM DD YYYY'));
    }, [])

    const handleSelectEvent = useCallback((event) => {
        // setViewVisible(true);
        // setDetails(event)
        // setTimeout(() => {
        //     setloadingdata(false)
        // }, 2000);
    }, [])

    const events = Accounts.map((data) => {
        return (
            { id: data.id, title: data.title, start: data.date_annoucment, end: data.date_annoucment, text: data.description }
        )
    });



    return (
        <div>
           <Panel header="Announcement">
           <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700 }}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
                enableAutoScroll
            />
           </Panel>
        </div>
    )
}

export default Announcement