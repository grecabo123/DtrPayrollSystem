import React, { useEffect, useRef, useState } from 'react'
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import AdminRoutes from '../../routes/AdminRoutes'
import { FcCalendar, FcSurvey, FcOpenedFolder, FcHome, FcSms, FcPositiveDynamic, FcManager, FcHighPriority, FcCheckmark, FcFolder, FcFeedback, FcBiohazard, FcAssistant, FcBarChart, FcFactory, FcLineChart, FcInfo, FcDeployment, FcCollaboration, FcSettings, FcPlanner, FcSportsMode, FcFile, FcRight, FcComments, FcPlus } from 'react-icons/fc'
import { FaArchive, FaBars, FaBox, FaBuilding, FaCalculator, FaCalendar, FaCalendarCheck, FaCalendarPlus, FaCaretDown, FaCaretRight, FaChartLine, FaClock, FaCog, FaCogs, FaDatabase, FaDeskpro, FaDesktop, FaDollarSign, FaEnvelope, FaFolder, FaFolderOpen, FaHeart, FaHome, FaMoneyBill, FaPen, FaPenAlt, FaPiggyBank, FaStore, FaUserAlt, FaUserCog, FaUsers } from 'react-icons/fa'
import axios from 'axios'
import swal from 'sweetalert'
import { Menubar } from 'primereact/menubar'
import { PrimeIcons } from 'primereact/api'
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import { Skeleton } from 'primereact/skeleton'
import { Image } from 'primereact/image'

import { SiWebtrees } from "react-icons/si";

function Admin() {
    const menu = useRef(null);
    const [loading, setLoading] = useState(true)
    const [Details, setDetails] = useState([]);
    useEffect(() => {
        axios.get(`/api/CompanyDetails`).then(res => {
            if (res.data.status === 200) {
                setDetails(res.data.data)
            }
            else {

            }
            setLoading(false)
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning')
            }
        })
    }, [])

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
        {
            label: 'Settings', icon: 'pi pi-fw pi-cog', command: () => {
                history.push(`/admin/settings/config`)
            }
        },
        {
            label: 'My Account', icon: 'pi pi-fw pi-user', command: () => {
                history.push(`admin/myaccount`)
            }
        },
        { label: <span className='text-danger fw-bold' onClick={Logout}>Logout</span>, icon: 'pi pi-fw pi-power-off' },
    ];


    const history = useHistory();




    return (
        <>
            {
                loading ?
                    <Skeleton className='w-100' />
                    :
                    <React.Fragment>
                        <div className="wrapper">
                            <aside id="sidebar" className="js-sidebar">
                                <div className="h-100">
                                    <div className="sidebar-logo d-flex justify-content-center align-items-center">
                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/${Details.company_logo}`} alt="" width={100} />
                                    </div>
                                    <div className="mt-0">
                                        <h5 className='text-center text-light'>SUPER ADMIN </h5>
                                    </div>
                                    <ul className="sidebar-nav">
                                        <li className="sidebar-header">
                                            Pages
                                        </li>
                                        <li className="sidebar-item">
                                            <a href="/admin" className="sidebar-link">
                                                <FcHome size={20} className=' align-middle' />
                                                <span>Dashboard</span>
                                            </a>
                                        </li>

                                        <li className="sidebar-item">
                                            <a href="#" className="sidebar-link collapsed" data-bs-target="#posts" data-bs-toggle="collapse"
                                                aria-expanded="false"><FaUsers size={20} />
                                                <span>Accounts</span>
                                            </a>
                                            <ul id="posts" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                                <li className="sidebar-item">
                                                    <Link to="/admin/employee/add" className="sidebar-link"><span className='child'>Register Employee</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/employee/list" className="sidebar-link"><span className='child'>List of Employee</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/registered/business" className="sidebar-link"><span className='child'> Lock Accounts</span></Link>
                                                </li>
                                            </ul>
                                        </li>


                                        <li className="sidebar-item">
                                            <a href="#" className="sidebar-link collapsed" data-bs-target="#calendar" data-bs-toggle="collapse"
                                                aria-expanded="false"><FcCalendar size={20} />
                                                <span>Calendar</span>
                                            </a>
                                            <ul id="calendar" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                                <li className="sidebar-item">
                                                    <Link to="/admin/calendar/create" className="sidebar-link"><span className='child'>Create Schedule</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/calendar/schedule" className="sidebar-link"><span className='child'>List of Schedule</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/calendar/days" className="sidebar-link"><span className='child'> Number of Duty</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/calendar/salary" className="sidebar-link"><span className='child'> Salary Schedule</span></Link>
                                                </li>

                                            </ul>
                                        </li>



                                        <li className="sidebar-item">
                                            <a href="#" className="sidebar-link collapsed" data-bs-target="#contrinution" data-bs-toggle="collapse"
                                                aria-expanded="false"><FaPiggyBank size={20} />
                                                <span>Contribution</span>
                                            </a>
                                            <ul id="contrinution" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                                <li className="sidebar-item">
                                                    <Link to="/admin/contribution/sss" className="sidebar-link"><span className='child'>SSS</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/contribution/pagibig" className="sidebar-link"><span className='child'>Pagibig</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/contribution/philhealth" className="sidebar-link"><span className='child'>Philhealth</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/contribution/tin" className="sidebar-link"><span className='child'>TIN</span></Link>
                                                </li>
                                            </ul>
                                        </li>




                                        <li className="sidebar-header">
                                            Reports
                                        </li>
                                        <li className="sidebar-item">
                                            <a href="#" className="sidebar-link collapsed" data-bs-target="#report" data-bs-toggle="collapse"
                                                aria-expanded="false"><FaUserCog color='#35A4CC' size={20} />
                                                <span>Employee Data</span>
                                            </a>
                                            <ul id="report" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                                <li className="sidebar-item">
                                                    <Link to="/admin/registered/user" className="sidebar-link"><span className='child'>DTR</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/registered/business" className="sidebar-link"><span className='child'>Payslip</span></Link>
                                                </li>

                                            </ul>
                                        </li>
                                        <li className="sidebar-header">
                                            Settings
                                        </li>

                                        <li className="sidebar-item">
                                            <a href="#" className="sidebar-link collapsed" data-bs-target="#set_contri" data-bs-toggle="collapse"
                                                aria-expanded="false"><FaCog size={20} />
                                                <span>Contribution Settings</span>
                                            </a>
                                            <ul id="set_contri" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                                <li className="sidebar-item">
                                                    <Link to="/admin/registered/user" className="sidebar-link"><span className='child'>Employee List</span></Link>
                                                </li>

                                            </ul>
                                        </li>
                                        <li className="sidebar-item">
                                            <a href="#" className="sidebar-link collapsed" data-bs-target="#calendar_config" data-bs-toggle="collapse"
                                                aria-expanded="false"><FaCogs size={20} />
                                                <span>Calendar Config</span>
                                            </a>
                                            <ul id="calendar_config" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                                <li className="sidebar-item">
                                                    <Link to="/admin/registered/user" className="sidebar-link"><span className='child'>Customer</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/registered/business" className="sidebar-link"><span className='child'>Business</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/registered/business" className="sidebar-link"><span className='child'> Lock Accounts</span></Link>
                                                </li>
                                            </ul>
                                        </li>



                                        <li className="sidebar-item">
                                            <a href="#" className="sidebar-link collapsed" data-bs-target="#AppSetings" data-bs-toggle="collapse"
                                                aria-expanded="false"><SiWebtrees size={20} />
                                                <span>App Config</span>
                                            </a>
                                            <ul id="AppSetings" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                                <li className="sidebar-item">
                                                    <Link to="/admin/settings/config" className="sidebar-link"><span className='child'>App Settings</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    <Link to="/admin/registered/business" className="sidebar-link"><span className='child'>Account Access</span></Link>
                                                </li>
                                                <li className="sidebar-item">
                                                    {/* <Link to="/admin/registered/business" className="sidebar-link"><span className='child'> </span></Link> */}
                                                </li>
                                            </ul>
                                        </li>





                                        <li className="sidebar-header">
                                            Logs History
                                        </li>

                                        <li className="sidebar-item">
                                            <a href="/admin" className="sidebar-link">
                                                <FaDesktop size={20} className=' align-middle' />
                                                <span>Activity Logs</span>
                                            </a>
                                        </li>


                                    </ul>


                                </div>
                            </aside>
                            <div className="main">
                                <div className="content px-1">
                                    <nav className="navbar navbar-expand p-2">
                                        <div className="container-fluid">
                                            <div className="navbar-collapse navbar">
                                                <span className='d-md-block d-none'></span>
                                                <FaBars size={25} className=' d-block d-xl-none d-md-none' style={{ cursor: "pointer" }} onClick={() => setVisible(true)} />
                                                <ul className="navbar-nav">
                                                    <li className="nav-item dropdown">
                                                        <Menu model={items_list} popup ref={menu} id="popup_menu_left" />
                                                    </li>
                                                </ul>
                                                <Avatar className='text-dark fw-bold ml-3' onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup shape='square' label='A' size='large' />
                                            </div>
                                        </div>
                                    </nav>

                                    <div className=" wrapper d-flex flex-column min-vh-100">
                                        <div className="">
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
                                                <Redirect from='/admin' to="/admin/dashboard" />
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
            }
        </>
    )
}

export default Admin