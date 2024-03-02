import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import React from 'react'

function Payslip() {
    return (
        <div className='container-fluid'>
            <Panel header="Payslip Record">
                <DataTable paginator paginatorLeft rows={10} emptyMessage="No Payslip Record">

                </DataTable>
            </Panel>
        </div>
    )
}

export default Payslip