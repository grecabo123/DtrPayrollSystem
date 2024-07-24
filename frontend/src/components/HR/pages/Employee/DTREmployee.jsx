import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React from 'react'

function DTREmployee() {
    return (
        <div className='container'>
            <div className="row">
                <Panel header="DTR Employee">
                    <DataTable paginator paginatorLeft rows={10}>
                        <Column header="#"></Column>
                        <Column header="Employee ID"></Column>
                        <Column header="Name"></Column>
                        <Column header="Department"></Column>
                        <Column header="Postition"></Column>
                        <Column header="Actions"></Column>
                    </DataTable>    
                </Panel>
            </div>
        </div>
    )
}

export default DTREmployee