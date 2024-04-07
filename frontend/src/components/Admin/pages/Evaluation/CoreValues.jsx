import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import React from 'react'

function CoreValues() {
    return (
        <div className=''>
            <div className="d-flex justify-content-end">
                <Button className='p-button-sm' label='Add Description' icon={PrimeIcons.PLUS} />
            </div>
            <DataTable header="Description" rows={10} paginator paginatorLeft >

            </DataTable>
        </div>
    )
}

export default CoreValues