import axios from 'axios';
import { useScroll } from 'framer-motion';
import moment from 'moment';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

function Inbox() {

    const [loading, setloading] = useState(true);
    const [InboxData, setInbox] = useState([]);
    const [selectrow, setSelectChanged] = useState([])

    useEffect(() => {
        axios.get(`/api/FetchMessage/${localStorage.getItem('auth_id')}`).then(res => {
            if (res.data.status === 200) {
                setInbox(res.data.inbox);
            }
            setloading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, []);

    const message = (InboxData) => {
        const text_ = `${InboxData.text.substring(0, 90)}...`;
        return (
            <>
          
                {InboxData.text.substring(0, 90).replace(/<[^>]*>/g, '')}
            </>
        )
    }
    const formatdate = (InboxData) => {
        return (
            <>
                <span>{moment(InboxData.created_at).format('MMM DD YYYY hh:mm a')}</span>
            </>
        )
    }


    return (
        <div className='container-fluid'>
            <Panel header="Inbox">
                <DataTable value={InboxData} loading={loading} selectionMode={'single'}
                 onSelectionChange={(e) => setSelectChanged(e.value)} dataKey='id'
                 paginator paginatorLeft rows={10}>
                    <Column field='subject' header="Subject"></Column>
                    <Column field='text' body={message} header="Message"></Column>
                    <Column field='created_at' body={formatdate} header="DateTime"></Column>
                </DataTable>
            </Panel>

        </div>
    )
}

export default Inbox