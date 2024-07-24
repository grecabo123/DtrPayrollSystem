import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React from 'react'

function NewTask() {
    return (
        <div className='container'>
            <div className="row">
                <Panel header="New Task">
                    <DataTable paginator paginatorLeft rows={10}>
                        
                    </DataTable>
                </Panel>
            </div>
        </div>
    )
}

export default NewTask