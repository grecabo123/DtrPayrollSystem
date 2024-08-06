import axios from 'axios';
import moment from 'moment';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

function Logs() {

    const [loading, setLoading] = useState(true);
    const [LogsData, setData] = useState([]);

    useEffect(() => {
        axios.get(`/api/Logs/${localStorage.getItem('auth_id')}`).then(res => {
            if (res.data.status === 200) {
                setData(res.data.data);
            }
            setLoading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, []);

    const DateFormat = (LogsData) => {
        return (
            <>
                <span>{moment(LogsData.created_at).format('MMM DD YYYY hh:mm a')}</span>
            </>
        )
    }

    return (
        <div className='container-fluid'>
            <Panel header="Activity Logs">
                <DataTable value={LogsData} size='small' selectionMode={'single'} loading={loading} paginator paginatorLeft rows={10}>
                    <Column field='description' header="Description"></Column>
                    <Column field='created_at' body={DateFormat} header="DateTime"></Column>
                </DataTable>
            </Panel>
        </div>
    )
}

export default Logs