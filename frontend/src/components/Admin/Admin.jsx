import React from 'react'
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import AdminRoutes from '../../routes/AdminRoutes'
import { FcCalendar, FcSurvey, FcOpenedFolder, FcHome, FcSms, FcPositiveDynamic, FcManager, FcHighPriority, FcCheckmark, FcFolder, FcFeedback, FcBiohazard, FcAssistant, FcBarChart, FcFactory, FcLineChart, FcInfo, FcDeployment, FcCollaboration } from 'react-icons/fc'
import { FaArchive, FaBars, FaBox, FaBuilding, FaCalculator, FaCalendar, FaCalendarCheck, FaCalendarPlus, FaCaretDown, FaCaretRight, FaChartLine, FaClock, FaCogs, FaDatabase, FaDeskpro, FaDesktop, FaDollarSign, FaEnvelope, FaFolder, FaFolderOpen, FaHeart, FaHome, FaMoneyBill, FaPen, FaPenAlt, FaStore, FaUserAlt, FaUsers } from 'react-icons/fa'
import { HiOutlineX } from "react-icons/hi";
import { BiLogOut } from 'react-icons/bi'
import axios from 'axios'
import swal from 'sweetalert'
import { Menubar } from 'primereact/menubar'

function Admin() {

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Contribution',
            items: [
                {
                    label: 'SSS',
                    icon: 'pi pi-bolt'
                },
                {
                    label: 'Pag-Ibig',
                    icon: 'pi pi-server'
                },
                {
                    label: 'Philhealth',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'TIN',
                    icon: 'pi pi-palette',
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];


    const history = useHistory();

    const Logout = () => {
        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_id');
                localStorage.removeItem('auth_name');
                swal('Success', res.data.message, 'success');
                history.push('/');
            }
        });
    }


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
                        <li class="nav-item"><Link class="nav-link" to="/admin/store"><FcFactory className='nav-icon' /> Create Department</Link></li>                       
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
                        <FcCalendar className='nav-icon' />Schedule Data</a>
                    </li>
                    <div class="collapse" id='schedule'>
                        <li class="nav-item"><Link class="nav-link" to="/admin/product"><FcOpenedFolder className='nav-icon' />Create Schedule</Link></li>
                        <li class="nav-item"><Link class="nav-link" to="/admin/product"><FcOpenedFolder className='nav-icon' />Schedule</Link></li>
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
                <Menubar model={items} />
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
                        <Redirect from='/admin' to="/admin/dashboard" />
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default Admin