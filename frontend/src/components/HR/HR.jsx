import React, { useRef } from 'react'
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import AdminRoutes from '../../routes/AdminRoutes'
import { FcCalendar, FcSurvey, FcOpenedFolder, FcHome, FcSms, FcPositiveDynamic, FcManager, FcHighPriority, FcCheckmark, FcFolder, FcFeedback, FcBiohazard, FcAssistant, FcBarChart, FcFactory, FcLineChart, FcInfo, FcDeployment, FcCollaboration, FcSettings, FcPlanner, FcSportsMode, FcFile, FcRight, FcComments } from 'react-icons/fc'
import { FaArchive, FaBars, FaBox, FaBuilding, FaCalculator, FaCalendar, FaCalendarCheck, FaCalendarPlus, FaCaretDown, FaCaretRight, FaChartLine, FaClock, FaCogs, FaDatabase, FaDeskpro, FaDesktop, FaDollarSign, FaEnvelope, FaFolder, FaFolderOpen, FaHeart, FaHome, FaMoneyBill, FaPen, FaPenAlt, FaStore, FaUserAlt, FaUsers } from 'react-icons/fa'
import axios from 'axios'
import swal from 'sweetalert'
import { Menubar } from 'primereact/menubar'
import { PrimeIcons } from 'primereact/api'
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'

function HR() {

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
        { label: 'Settings', icon: 'pi pi-fw pi-cog', command: () => {
            history.push(`/admin/settings/config`)
        } },
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
                    <h5 className='text-center'>ADMINISTRATOR </h5>
                </div>
                <ul class="sidebar-nav" data-coreui="navigation" data-simplebar="">
                    <li class="nav-item"><a class="nav-link fs-5">
                    </a></li>

                    <li class="nav-title">Pages</li>
                    <li class="nav-item"><a class="nav-link" href="/admin">
                        <FcHome className='nav-icon' /> Dashboard</a></li>

                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        <FcManager className='nav-icon' /> Employee</a>
                    </li>
                    <div class="collapse" id='collapseOne'>
                        <li class="nav-item"><Link class="nav-link" to="/admin/employee"><FaUsers className='nav-icon' /> Add Employee</Link></li>
                    </div>
                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#stores">
                        <FaStore className='nav-icon' />Department</a>
                    </li>
                    <div class="collapse" id='stores'>
                        <li class="nav-item"><Link class="nav-link" to="/admin/department"><FcFactory className='nav-icon' /> Create Department</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/store"><FcCalendar className='nav-icon' /> Schedule Department</Link></li>
                    </div>

                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#product">
                        <FcDeployment className='nav-icon' />Employee Data</a>
                    </li>
                    <div class="collapse" id='product'>
                        <li class="nav-item"><Link class="nav-link" to="/admin/product"><FcOpenedFolder className='nav-icon' />DTR</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/product"><FcOpenedFolder className='nav-icon' />Schedule</Link></li>
                    </div>

                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#schedule">
                        <FcSettings className='nav-icon' />Calendar Config</a>
                    </li>
                    <div class="collapse" id='schedule'>
                        <li class="nav-item"><Link class="nav-link" to="/admin/calendar/create"><FaPen className='nav-icon' />Create Schedule</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/calendar/schedule"><FcCalendar className='nav-icon' />Schedule</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/calendar/days"><FcSportsMode className='nav-icon' />Number of Duty</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/calendar/salary"><FcPlanner className='nav-icon' />Salary Schedule</Link></li>
                    </div>

                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#message">
                        <FcFolder className='nav-icon' />Message</a>
                    </li>
                    <div class="collapse" id='message'>
                        <li class="nav-item"><Link class="nav-link" to="/admin/message/inbox"><FcComments className='nav-icon' />Inbox</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/message/sent"><FcRight className='nav-icon' />Sent Items</Link></li>
                    </div>
                    <li class="nav-title">Request</li>
                    <li class="nav-group"><a class="nav-link nav-group-toggle" data-bs-toggle="collapse" data-bs-target="#forms">
                        <FcFolder className='nav-icon' />Forms</a>
                    </li>
                    <div class="collapse" id='forms'>
                        <li class="nav-item"><Link class="nav-link" to="/admin/calendar/create"><span className='nav-icon' />Sick Report</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/calendar/schedule"><span className='nav-icon' />Leave Report</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/calendar/days"><span className='nav-icon' />Resignation Report</Link></li>
                    </div>

                   


                    <li class="nav-title">Reports</li>
                    <li class="nav-item"><Link class="nav-link" to="/admin/distribute"><FcCollaboration className='nav-icon' />PaySlip</Link></li>


                    {/* History */}
                    <li class="nav-title">History</li>
                    <li class="nav-item"><Link class="nav-link" to="/admin/logs">
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
                            AdminRoutes.map((routes, id) => {
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
                        <Redirect from='/hr' to="/hr/dashboard" />
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default HR