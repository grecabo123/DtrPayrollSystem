import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Panel } from 'primereact/panel'
import React, { useState } from 'react'

function CreateSchedule() {

    const [CreateData, setData] = useState(false)

    const CreateModal = () => {
        setData(true)
    }

    return (
        <div className='container-fluid'>
            <Panel header="Create Schedule">
                <div className="d-flex justify-content-end">
                    <Button className='p-button-sm p-button-info' label='Create Schedule' onClick={CreateModal} />
                </div>
                <DataTable paginator paginatorLeft rows={10} >
                    
                </DataTable>


                <Dialog visible={CreateData} position='top' draggable={false}
                    onHide={(e) => setData(false)}
                    header="Add Schedule"
                    style={{width: '50vw'}}
                    breakpoints={{ '960px' : '75vw', '641px' : '100vw' }}
                >

                </Dialog>
            </Panel>
        </div>
    )
}

export default CreateSchedule