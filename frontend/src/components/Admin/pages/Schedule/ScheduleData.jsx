import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'

function ScheduleData() {

    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        FetchDataSchedule();
        return () => {
            setLoading(true);
        }
    },[]);

    const FetchDataSchedule = () => {
        setTimeout(() => {
            setLoading(false);
        },1500);
    }

    const Hide = () => {
        setVisible(false)
    }

    return (
        <div className='container-fluid'>
            <div className="d-flex justify-content-end mb-3">
                <Button className='p-button-sm p-button-info'
                    label='Add Schedule'
                    icon={PrimeIcons.PLUS}
                    onClick={(e) => setVisible(true)}
                />
            </div>
            <Panel header="Schedule Data">
                <DataTable loading={loading} paginator paginatorLeft rows={10}>
                    <Column header="Schedule"></Column>
                </DataTable>
            </Panel>

            <Dialog onHide={Hide} draggable={false} header="Add Schedule" position='top'
                visible={visible}
                style={{ width: "50vw" }}
            >

            </Dialog>
        </div>
    )
}

export default ScheduleData