import axios from 'axios';
import { Divider } from 'primereact/divider';
import { InputSwitch } from 'primereact/inputswitch';
import { Skeleton } from 'primereact/skeleton';
import React, { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import { Toast } from 'primereact/toast';

import { Checkbox } from 'primereact/checkbox';


function AccountControls(props) {

    const [loading, setLoading] = useState(true);
    const [access, setAccess] = useState([]);
    const [lock, setLock] = useState(false);
    const [assign, setAssign] = useState(false);
    const [monitor, setMonitor] = useState(false);
    const [announce, setAnnouncement] = useState(false);
    const [meeting, setMeeting] = useState(false);

    const toast = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`/api/UpdateAccess/${props.data}`).then(res => {
            if (res.data.status === 200) {
                setAccess(res.data.data);
            }
            setLoading(false);
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        });
    };

    const changeControl = (e) => {

        const data = {
            user_fk: access.id,
            [e.target.name]:e.target.name == "monitor" ? (access.task_monitor == 0 ? 0 : 1) : (access.task_access == 0 ? 0 : 1),

        };
        console.log(data);
        axios.put(`/api/EditAccess`, data).then(res => {
            if (res.data.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Account Updated",
                    detail: "Successfully",
                });
                fetchData();
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        });
    };




    return (
        <div>
            <Toast ref={toast} />
            {loading ? <Skeleton /> :
                <ul className="list-group">
                    <Divider>
                        <span>User Control</span>
                    </Divider>


                    <form>
                    <li className="list-group-item border-0 text-secondary d-flex justify-content-between align-items-center">
                        <span>Create & Assign Task </span>
                        <Checkbox checked={access.task_access == 0 ? false : true} name='task'  />
                    </li>
                    <li className="list-group-item border-0 text-secondary d-flex justify-content-between align-items-center">
                        <span>Create & Assign Task </span>
                        <Checkbox checked={access.task_access == 0 ? false : true} name='task'  />
                    </li>
                    </form>

                    {/* <li className="list-group-item border-0 text-secondary d-flex justify-content-between align-items-center">
                        <span>Create & Assign Task </span>
                        <Checkbox checked={access.task_access == 0 ? false : true} name='task' onChange={changeControl} />
                    </li>
                    <li className="list-group-item border-0 text-secondary d-flex justify-content-between align-items-center">
                        <span>Task Monitor </span>
                        <Checkbox checked={access.task_monitor == 0 ? false : true} value={access.task_monitor == 0 ? false : true} name='monitor' onChange={changeControl} />
                    </li> */}
                    {/* <li className="list-group-item border-0 text-secondary d-flex justify-content-between align-items-center">
                        <span>Lock Account </span>
                        <InputSwitch checked={access.status == 0 ? false : true} name='lock' onChange={changeControl} />
                    </li>
                    <Divider>
                        <span>Calendar</span>
                    </Divider>
                    <li className="list-group-item border-0 text-secondary d-flex justify-content-between align-items-center">
                        <span>Create Announcement  </span>
                        <InputSwitch checked={announce} name='announce' onChange={changeControl} />
                    </li>
                    <li className="list-group-item border-0 text-secondary d-flex justify-content-between align-items-center">
                        <span>Create Meeting  </span>
                        <InputSwitch checked={meeting} name='meeting' onChange={changeControl} />
                    </li> */}
                </ul>
            }
        </div>
    );
}

export default AccountControls;
