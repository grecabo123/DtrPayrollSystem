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
import moment from 'moment'
import axios from 'axios'


function CreateSchedule() {

    const [CreateData, setData] = useState(false)
    const [checked, setChecked] = useState(false);
    const [PickDataStatus, setPickDataStatus] = useState({ sunday: 0 })
    const [PickDataMonday, setPickDataMonday] = useState({ monday: 0 })
    const [PickDataTuesday, setPickDataTuesday] = useState({ tuesday: 0 })
    const [PickDataWed, setPPickDataWed] = useState({ wednesday: 0 })
    const [PickDataThu, setPickDataThu] = useState({ thursday: 0 })
    const [PickDataFri, setPickDataFri] = useState({ friday: 0 })
    const [PickDataSat, setPickDataSat] = useState({ saturday: 0 })

    const [ScheduleData, setScheduleData] = useState({
        monday_start: "",
        monday_end: "",

        tuesday_start: "",
        tuesday_end: "",

        wednesday_start: "",
        wednesday_end: "",

        thursday_start: "",
        thursday_end: "",

        friday_start: "",
        friday_end: "",

        saturday_start: "",
        saturday_end: "",
        
        sunday_start: "",
        sunday_end: "",

        schedule_name: "",

    })

    const handleinput = (e) => {
        setScheduleData({...ScheduleData, [e.target.name] : e.target.value})
    }

    const CreateModal = () => {
        setData(true)
    }


    const drop_down_pick = [
        { label: "Rest Day", value: 1 },
        { label: "Create Schedule", value: 2 },
    ]


    const CreateScheduleData = (e) => {
        e.preventDefault();

        const data = {
            monday_start: PickDataMonday.monday === 0 ? "Rest Day" : PickDataMonday.monday === 1 ? "Rest Day" : moment(ScheduleData.monday_start).format('hh:mm a'),
            monday_end: PickDataMonday.monday === 0 ? "Rest Day" : PickDataMonday.monday === 1 ? "Rest Day" : moment(ScheduleData.monday_end).format('hh:mm a'),

            tuesday_start: PickDataTuesday.tuesday === 0 ? "Rest Day" : PickDataTuesday.tuesday === 1 ? "Rest Day" : moment(ScheduleData.tuesday_start).format('hh:mm a'),
            tuesday_end: PickDataTuesday.tuesday === 0 ? "Rest Day" : PickDataTuesday.tuesday === 1 ? "Rest Day" : moment(ScheduleData.tuesday_end).format('hh:mm a'),

            wednesday_start: PickDataWed.wednesday === 0 ? "Rest Day" : PickDataWed.wednesday === 1 ? "Rest Day" : moment(ScheduleData.wednesday_start).format('hh:mm a'),
            wednesday_end: PickDataWed.wednesday === 0 ? "Rest Day" : PickDataWed.wednesday === 1 ? "Rest Day" : moment(ScheduleData.wednesday_end).format('hh:mm a'),

            thursday_start: PickDataThu.thursday === 0 ? "Rest Day" : PickDataThu.thursday === 1 ? "Rest Day" : moment(ScheduleData.thursday_start).format('hh:mm a'),
            thursday_end: PickDataThu.thursday === 0 ? "Rest Day" : PickDataThu.thursday === 1 ? "Rest Day" : moment(ScheduleData.thursday_end).format('hh:mm a'),

            friday_start: PickDataFri.friday === 0 ? "Rest Day" : PickDataFri.friday === 1 ? "Rest Day" : moment(ScheduleData.friday_start).format('hh:mm a'),
            friday_end: PickDataFri.friday === 0 ? "Rest Day" : PickDataFri.friday === 1 ? "Rest Day" : moment(ScheduleData.friday_end).format('hh:mm a'),

            saturday_start: PickDataSat.saturday === 0 ? "Rest Day" : PickDataSat.saturday === 1 ? "Rest Day" : moment(ScheduleData.saturday_start).format('hh:mm a'),
            saturday_end: PickDataSat.saturday === 0 ? "Rest Day" : PickDataSat.saturday === 1 ? "Rest Day" : moment(ScheduleData.saturday_end).format('hh:mm a'),

            sunday_start: PickDataStatus.sunday === 0 ? "Rest Day" : PickDataStatus.sunday === 1 ? "Rest Day" : moment(ScheduleData.sunday_start).format('hh:mm a'),
            sunday_end: PickDataSat.saturday === 0 ? "Rest Day" : PickDataSat.saturday === 1 ? "Rest Day" : moment(ScheduleData.sunday_end).format('hh:mm a'),
            
            schedule_name: ScheduleData.schedule_name,
        }

        axios.post(`/api/CreateSchedule`,data).then(res => {
            if(res.data.status === 200) {
                
            }
        }).catch((error) => {
            if(error.response.status === 500){

            }
            else if(error.response.status === 404) {

            }
        })

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
                    header="Create Schedule"
                    style={{ width: '50vw' }}
                    breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                    blockScroll
                >
                    <form onSubmit={CreateScheduleData}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="form-label">
                                        Schedule Name
                                    </label>
                                    <InputText onChange={handleinput} name='schedule_name' className='w-100 p-inputtext-sm' placeholder='Schedule Name' />
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
                                                <Dropdown value={PickDataStatus.sunday}  className='w-100 p-inputtext-sm' onChange={(e) => setPickDataStatus({ sunday: e.value })} options={drop_down_pick} placeholder='Choose' />
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
                                                                <Calendar onChange={handleinput} value={ScheduleData.sunday_start} name='sunday_start' placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar onChange={handleinput} value={ScheduleData.sunday_end} placeholder='End Time' name='sunday_end' className='w-100' timeOnly showIcon hourFormat='12' />
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
                                                <Dropdown value={PickDataMonday.monday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataMonday({ monday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataMonday.monday === 0 ?
                                                    ""
                                                    :
                                                    PickDataMonday.monday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar value={ScheduleData.monday_start} name='monday_start' onChange={handleinput} placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar value={ScheduleData.monday_end} name='monday_end' onChange={handleinput} placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
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
                                                <Dropdown value={PickDataTuesday.tuesday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataTuesday({ tuesday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataTuesday.tuesday === 0 ?
                                                    ""
                                                    :
                                                    PickDataTuesday.tuesday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar value={ScheduleData.tuesday_start} name='tuesday_start' onChange={handleinput} placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar value={ScheduleData.tuesday_end} name='tuesday_end' onChange={handleinput} placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
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
                                                <Dropdown value={PickDataWed.wednesday} className='w-100 p-inputtext-sm' onChange={(e) => setPPickDataWed({ wednesday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataWed.wednesday === 0 ?
                                                    ""
                                                    :
                                                    PickDataWed.wednesday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar value={ScheduleData.wednesday_start} name='wednesday_start' onChange={handleinput} placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar value={ScheduleData.wednesday_end} name='wednesday_end' onChange={handleinput} placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
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
                                                <Dropdown value={PickDataThu.thursday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataThu({ thursday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataThu.thursday === 0 ?
                                                    ""
                                                    :
                                                    PickDataThu.thursday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar value={ScheduleData.thursday_start} name='thursday_start' onChange={handleinput}  placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar  value={ScheduleData.thursday_end} name='thursday_end' onChange={handleinput} placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
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
                                                <Dropdown value={PickDataFri.friday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataFri({ friday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataFri.friday === 0 ?
                                                    ""
                                                    :
                                                    PickDataFri.friday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar value={ScheduleData.friday_start} name='friday_start' onChange={handleinput} placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar value={ScheduleData.friday_end} name='friday_end' onChange={handleinput} placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
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
                                                <Dropdown value={PickDataSat.saturday} className='w-100 p-inputtext-sm' onChange={(e) => setPickDataSat({ saturday: e.value })} options={drop_down_pick} placeholder='Choose' />
                                            </div>
                                            {
                                                PickDataSat.saturday === 0 ?
                                                    ""
                                                    :
                                                    PickDataSat.saturday === 1 ?
                                                        ""
                                                        :
                                                        <React.Fragment>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar value={ScheduleData.saturday_start} name='saturday_start' onChange={handleinput} placeholder='Start Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                            <div className="col-lg-6 mb-2">
                                                                <Calendar value={ScheduleData.saturday_end} name='saturday_end' onChange={handleinput} placeholder='End Time' className='w-100' timeOnly showIcon hourFormat='12' />
                                                            </div>
                                                        </React.Fragment>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <Button className='w-100 p-button-sm' label='Create Schedule' />
                        </div>
                    </form>

                </Dialog>
            </Panel>
        </div>
    )
}

export default CreateSchedule