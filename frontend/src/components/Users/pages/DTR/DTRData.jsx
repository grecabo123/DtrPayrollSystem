import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React from 'react'

function DTRData() {
    return (
        <div className='container-fluid'>
            <Panel header="DTR Record">
                <DataTable paginator paginatorLeft rows={10}>

                </DataTable>
            </Panel>
        </div>
    )
}

export default DTRData