import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import React, { useState } from 'react'

function SalaryPeriod() {

    const [visible, setVisible] = useState(false);

    const HideModal = (e) => {
        setVisible(false)
    }

    const CreateSalary = (e) => {
        e.preventDefault();
    }

    return (
        <div className='container-fluid'>
            <Panel header="Salary Period">
                <div className="mb-3 d-flex justify-content-end">
                    <Button className='p-button-info p-button-sm' onClick={(e) => setVisible(true)} label='Create Salary' icon={PrimeIcons.PLUS} />
                </div>

                <DataTable paginator paginatorLeft rows={10}>
                    <Column></Column>
                </DataTable>


                <Dialog onHide={HideModal} header="Create Salary Period" visible={visible} position='top' draggable={false} style={{ width: "50vw" }}>
                    <form onSubmit={CreateSalary}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        Salary Period
                                    </label>
                                    <InputText className='w-100 p-inputtext-sm' name='salary' />
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        From
                                    </label>
                                    
                                    <Calendar disabledDays={[0]} className='w-100' showIcon />
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        To
                                    </label>
                                    <Calendar disabledDays={[0]} className='w-100' showIcon />
                                </div>
                                <div className="mt-3">
                                    <Button className='w-100 p-button-info ' label='Create Period' />
                                </div>
                            </div>
                        </div>
                    </form>
                </Dialog>
            </Panel>
        </div>
    )
}

export default SalaryPeriod