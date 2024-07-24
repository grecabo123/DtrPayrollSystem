import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React from 'react'

function AccomplishmentTask() {
    return (
        <div className='container'>
            <div className="row">
                <Panel header="Accomplishment Task">
                    <DataTable paginator paginatorLeft rows={10}>
                        
                    </DataTable>
                </Panel>
            </div>
        </div>
    )
}

export default AccomplishmentTask