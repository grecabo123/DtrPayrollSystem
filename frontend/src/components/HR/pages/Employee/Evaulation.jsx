import axios from 'axios';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel'
import { RadioButton } from 'primereact/radiobutton';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import swal from 'sweetalert';

function Evaulation() {

    const [Eval, setEval] = useState([]);
    const [loading, setloading] = useState(true)
    useEffect(() => {
        axios.get(`/api/EvaluationForm`).then(res => {
            if (res.data.status === 200) {
                setEval(res.data.data);
            }
            setloading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })
    }, []);

    const [rate_num, setRate] = useState([]);

    const history = useHistory();

    const RateNum = [
        { label: "Excellent", value: 4 },
        { label: "Meet Expectations", value: 3 },
        { label: "Need Improvement", value: 2 },
        { label: "Unacceptable", value: 1 },
    ]

    const Return = () => {
        history.push(`/hr/employee/list`)
    }

    return (
        <div className='containet-fluid'>
            <div className="d-flex justify-content-end mb-2">
                <Button className='p-button-sm p-button-info' label='Return Page' onClick={Return} />
            </div>

            <div className="m-3">

                <Panel header="Evaluation Form">
                    {
                        loading ? <Skeleton />
                            :
                            <>
                                <ScrollPanel className='m-3' style={{ width: '100%', height: '600px' }}>
                                    <div className="">
                                        {
                                            Eval.map((data) => {
                                                return (
                                                    <>
                                                        <div>
                                                            <div className="mb-2">
                                                                <span>{data.id} .<b>{data.CoreName}</b></span>
                                                            </div>
                                                            <div>
                                                                <span>{data.description}</span>
                                                            </div>
                                                            {
                                                                RateNum.map((item) => (
                                                                    <div key={data.value}>
                                                                        <RadioButton value={item.value} onChange={(e) => setRate(e.value)} checked={rate_num === item.value} className='m-1' />
                                                                        <label htmlFor="" className='mx-2'>{item.label}</label>
                                                                    </div>
                                                                ))
                                                            }
                                                            <div className="mt-3">
                                                                <div className="col-lg-12 mb-2">
                                                                    <label htmlFor="" className="form-label">
                                                                        Comment
                                                                    </label>
                                                                    <InputTextarea className='w-100' rows={2} style={{ resize: "none" }} cols={3} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </ScrollPanel>
                            </>
                    }
                </Panel>
            </div>
        </div>
    )
}

export default Evaulation