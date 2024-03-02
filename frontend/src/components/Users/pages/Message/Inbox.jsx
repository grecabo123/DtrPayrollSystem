import axios from 'axios';
import { useScroll } from 'framer-motion';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

function Inbox() {

    const [loading, setloading] = useState(true);
    const [InboxData, setInbox] = useState([]);

    useEffect(() => {
        axios.get(`/api/FetchMessage/${localStorage.getItem('auth_id')}`).then(res => {
            if(res.data.status === 200) {
                setInbox(res.data.inbox);
            }
            setloading(false);
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning');
            }
        })
    },[]);

    return (
        <div className='container-fluid'>
            <Panel header="Inbox">
                <DataTable loading={loading} paginator paginatorLeft rows={10}>
                    <Column></Column>
                </DataTable>
            </Panel>
        </div>
    )
}

export default Inbox