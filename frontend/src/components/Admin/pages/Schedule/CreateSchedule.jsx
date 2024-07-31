import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import React, { useState } from 'react'
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown'


function CreateSchedule() {

    const [CreateData, setData] = useState(false)
    const [checked, setChecked] = useState(false);
    const [PickDataStatus, setPickDataStatus] = useState({
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
    })

    const CreateModal = () => {
        setData(true)
    }


    const drop_down_pick = [
        { label: "Rest Day", value: 1 },
        { label: "Create Schedule", value: 2 },
    ]

    console.log(PickDataStatus);

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
                    header="Create Schedule"
                    style={{ width: '50vw' }}
                    breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                    blockScroll
                >
                    <form>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        Schedule Name
                                    </label>
                                    <InputText className='w-100 p-inputtext-sm' placeholder='Schedule Name' />
                                </div>
                                <Divider>
                                    <small>Time Schedule</small>
                                </Divider>
                                <div className="row">
                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <label htmlFor="" className="form-label">
                                                Sunday
                                            </label>
                                            <div className="col-lg-12 mb-2">
                                                <Dropdown value={PickDataStatus.sunday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataStatus({ sunday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataStatus.sunday === 0 ?
                                                    ""
                                                    :
                                                    PickDataStatus.sunday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                        </React.Fragment>
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <label htmlFor="" className="form-label">
                                                Monday
                                            </label>
                                            <div className="col-lg-12 mb-2">
                                                <Dropdown value={PickDataStatus.monday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataStatus({ monday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataStatus.monday === 0 ?
                                                    ""
                                                    :
                                                    PickDataStatus.monday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                        </React.Fragment>
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <label htmlFor="" className="form-label">
                                                Tuesday
                                            </label>
                                            <div className="col-lg-12 mb-2">
                                                <Dropdown value={PickDataStatus.tuesday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataStatus({ tuesday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataStatus.tuesday === 0 ?
                                                    ""
                                                    :
                                                    PickDataStatus.tuesday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                        </React.Fragment>
                                            }
                                        </div>
                                    </div>


                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <label htmlFor="" className="form-label">
                                                Wednesday
                                            </label>
                                            <div className="col-lg-12 mb-2">
                                                <Dropdown value={PickDataStatus.wednesday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataStatus({ wednesday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataStatus.wednesday === 0 ?
                                                    ""
                                                    :
                                                    PickDataStatus.wednesday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                        </React.Fragment>
                                            }
                                        </div>
                                    </div>


                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <label htmlFor="" className="form-label">
                                                Thursday
                                            </label>
                                            <div className="col-lg-12 mb-2">
                                                <Dropdown value={PickDataStatus.thursday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataStatus({ thursday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataStatus.thursday === 0 ?
                                                    ""
                                                    :
                                                    PickDataStatus.thursday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                        </React.Fragment>
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <label htmlFor="" className="form-label">
                                                Friday
                                            </label>
                                            <div className="col-lg-12 mb-2">
                                                <Dropdown value={PickDataStatus.friday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataStatus({ friday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataStatus.friday === 0 ?
                                                    ""
                                                    :
                                                    PickDataStatus.friday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                        </React.Fragment>
                                            }
                                        </div>
                                    </div>


                                    <div className="col-lg-12 mb-2">
                                        <div className="row">
                                            <label htmlFor="" className="form-label">
                                                Saturday
                                            </label>
                                            <div className="col-lg-12 mb-2">
                                                <Dropdown value={PickDataStatus.saturday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataStatus({ saturday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataStatus.saturday === 0 ?
                                                    ""
                                                    :
                                                    PickDataStatus.saturday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                        </React.Fragment>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </Dialog>
            </Panel>
        </div>
    )
}

export default CreateSchedule