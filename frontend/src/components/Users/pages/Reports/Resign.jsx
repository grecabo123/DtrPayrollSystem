import { Panel } from 'primereact/panel'
import React, { useRef, useState } from 'react'
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import axios from 'axios';
import swal from 'sweetalert';
import { Toast } from 'primereact/toast';


function Resign() {

    const [text, setText] = useState();
    const [btnloading, setLoadingbtn] = useState(false);
    const [Data, setData] = useState({
        email: "",
        subject: "",
        error: [],
    });
    const toast = useRef();

    const handleinput = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
    }

    const SendEmail = (e) => {
        e.preventDefault();

        setLoadingbtn(true)
        const data = {
            email: Data.email,
            subject: Data.subject,
            text_: text,
            user_fk: localStorage.getItem('auth_id'),
        };

        axios.post(`/api/SendEmail`,data).then(res => {
            if(res.data.status === 200) {
                toast.current.show({severity: "success", summary: "Sent Email to"+''+data.email , detail: "Succesfully"});
                document.getElementById('form').reset();
                setText("")
        setLoadingbtn(false)

            }
            else if(res.data.status === 504) {
                swal("Warning",res.data.error,'warning');
        setLoadingbtn(false)

            }
        }).catch((error) => {
            if(error.response.status === 500) {
                swal("Warning",error.response.statusText,'warning')
        setLoadingbtn(false)

            }
        })
    }

    return (
        <div className='container-fluid'>
            <Toast ref={toast} />
        
            <Panel header="Resignation Request">
                <form onSubmit={SendEmail} id='form'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    To
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='email' />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <label htmlFor="" className="form-label">
                                    Subject
                                </label>
                                <InputText className='w-100 p-inputtext-sm' onChange={handleinput} name='subject' />
                            </div>
                            <div className="col-lg-12 mb-2">
                                <Editor className='p-editor-toolbar' style={{ height: '320px' }} value={text} onTextChange={(e) => setText(e.htmlValue)} />
                            </div>
                            <div className="mt-3">
                                <Button loading={btnloading} className='p-button-sm p-button-info' icon={PrimeIcons.SEND} label={!btnloading ? "Send Email" : "Sending Email.."} />
                            </div>
                        </div>
                    </div>
                </form>
            </Panel>
        </div>
    )
}

export default Resign