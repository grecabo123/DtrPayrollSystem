import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React from 'react'

function DTRData() {
    return (
        <div className='container-fluid'>
            <Panel header="DTR Record">
                <DataTable paginator paginatorLeft rows={10}>
                    <Column header="#"></Column>
                    <Column header="Time In"></Column>
                    <Column header="Lunch Break In"></Column>
                    <Column header="Lunch Break Out"></Column>
                    <Column header="Time out"></Column>
                </DataTable>
            </Panel>
        </div>
    )
}

export default DTRData