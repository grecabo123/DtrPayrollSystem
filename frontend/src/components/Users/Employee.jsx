import React, { useRef } from 'react'
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { FcCalendar, FcSurvey, FcOpenedFolder, FcHome, FcSms, FcPositiveDynamic, FcManager, FcHighPriority, FcCheckmark, FcFolder, FcFeedback, FcBiohazard, FcAssistant, FcBarChart, FcFactory, FcLineChart, FcInfo, FcDeployment, FcCollaboration, FcSettings, FcPlanner, FcSportsMode, FcFile } from 'react-icons/fc'
import { FaArchive, FaBars, FaBox, FaBuilding, FaCalculator, FaCalendar, FaCalendarCheck, FaCalendarPlus, FaCaretDown, FaCaretRight, FaChartLine, FaClock, FaCogs, FaDatabase, FaDeskpro, FaDesktop, FaDollarSign, FaEnvelope, FaFolder, FaFolderOpen, FaHeart, FaHome, FaMoneyBill, FaPen, FaPenAlt, FaStore, FaUserAlt, FaUsers } from 'react-icons/fa'
import axios from 'axios'
import swal from 'sweetalert'
import { Menubar } from 'primereact/menubar'
import { PrimeIcons } from 'primereact/api'
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import EmployeeRoutes from '../../routes/EmployeeRoutes'

function Employee() {

    const menu = useRef(null);

    const Logout = () => {
        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_id');
                localStorage.removeItem('auth_name');
                swal('Success', res.data.message, 'success');
                history.push('/login');
            }
        });
    }

    const items = [
        {
            label: 'Instruction',
            icon: 'pi pi-home',
            command: () => {
                history.push(`/admin`);
            }
        },
        {
            label: 'Holidays',
            items: [
                {
                    label: 'Legal Holiday',
                    icon: 'pi pi-bolt',
                    command: () => {
                        history.push(`/admin/holiday/legal`);
                    }
                },
                {
                    label: 'Special Holiday',
                    icon: 'pi pi-server',
                    command: () => {
                        history.push(`/admin/holiday/special`);
                    }
                },

            ]
        },
        {
            label: 'Contribution',
            items: [
                {
                    label: 'SSS',
                    command: () => {
                        history.push(`/admin/contribution/sss`)
                    }
                },
                {
                    label: 'Pag-Ibig',
                    command: () => {
                        history.push(`/admin/contribution/pagibig`)
                    }
                },
                {
                    label: 'Philhealth',
                    command: () => {
                        history.push(`/admin/contribution/philhealth`)
                    }
                },
                {
                    label: 'TIN',
                    command: () => {
                        history.push(`/admin/contribution/tin`)
                    }
                }
            ]
        },
        {
            label: 'Announcement',
            icon: PrimeIcons.CALENDAR,
            command: () => {
                history.push(`/admin/calendar/announcements`)
            }
        }
    ];

    let items_list = [
        { label: 'Settings', icon: 'pi pi-fw pi-cog', url: '/admin/myaccount' },
        { label: 'My Account', icon: 'pi pi-fw pi-user', command: () => {
            history.push(`admin/myaccount`)
        } },
        { label: <span className='text-danger fw-bold' onClick={Logout}>Logout</span>, icon: 'pi pi-fw pi-power-off' },
    ];


    const history = useHistory();

    return (
        <>
            <div class="sidebar sidebar-dark sidebar-fixed" id="sidebar">
                <div class="sidebar-brand d-none d-md-flex">
                    <h5 className='text-center'>Employee </h5>
                </div>
                <ul class="sidebar-nav" data-coreui="navigation" data-simplebar="">
                    <li class="nav-item"><a class="nav-link fs-5">
                    </a></li>

                    <li class="nav-title">Pages</li>
                    <li class="nav-item"><a class="nav-link" href="/employee">
                        <FcHome className='nav-icon' /> Dashboard</a></li>

                    <div class="collapse" id='stores'>
                        <li class="nav-item"><Link class="nav-link" to="/employee/department"><FcFactory className='nav-icon' /> Create Department</Link></li>
                    </div>

                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#product">
                        <FcDeployment className='nav-icon' />Employee Data</a>
                    </li>
                    <div class="collapse" id='product'>
                        <li class="nav-item"><Link class="nav-link" to="/employee/product"><FcOpenedFolder className='nav-icon' />DTR</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/employee/product"><FcOpenedFolder className='nav-icon' />Schedule</Link></li>
                    </div>

                    <li class="nav-title">Request</li>
                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#forms">
                        <FcFolder className='nav-icon' />Forms</a>
                    </li>
                    <div class="collapse" id='forms'>
                        <li class="nav-item"><Link class="nav-link" to="/employee/calendar/create"><span className='nav-icon' />Sick Report</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/employee/calendar/schedule"><span className='nav-icon' />Leave Report</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/employee/calendar/days"><span className='nav-icon' />Resignation Report</Link></li>
                    </div>


                    <li class="nav-title">Reports</li>
                    <li class="nav-item"><Link class="nav-link" to="/employee/distribute"><FcCollaboration className='nav-icon' />PaySlip</Link></li>


                    {/* History */}
                    <li class="nav-title">History</li>
                    <li class="nav-item"><Link class="nav-link" to="/employee/logs">
                        <FaDesktop className='nav-icon' /> Activity Logs</Link></li>


                </ul>
            </div>
            <div className=" wrapper d-flex flex-column min-vh-100">
            
                {/* <Menu model={items_list} id="popup_menu" popup ref={menu} /> */}
                <Menu model={items_list} popup ref={menu} id="popup_menu_left" />
                <Menubar model={items} end={
                    <>
                        <Avatar className='text-dark fw-bold' onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup shape='square' label='A' size='large' />
                    </>
                } />
                <div className="mt-5">
                    <Switch>
                        {
                            EmployeeRoutes.map((routes, id) => {
                                return (
                                    routes.component && (
                                        <Route
                                            key={id}
                                            path={routes.path}
                                            exact={routes.exact}
                                            name={routes.name}
                                            render={(props) => <routes.component {...props} />}
                                        />
                                    )
                                )
                            })
                        }
                        <Redirect from='/employee' to="/employee/dashboard" />
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default Employee