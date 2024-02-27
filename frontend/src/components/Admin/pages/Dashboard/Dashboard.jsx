import { Card } from 'primereact/card'
import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { motion } from "framer-motion";
import { DataTable } from 'primereact/datatable';
import BarChartData from './BarChartData';
import { Panel } from 'primereact/panel';


function Dashboard() {
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-lg-3 col-sm-12 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="All Users">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers size={20} /></span>
                                <span>321</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                <div className="col-lg-3 col-sm-12 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.6,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Department">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers size={20} /></span>
                                <span>321</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                <div className="col-lg-3 col-sm-12 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.8,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Active Users">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers size={20} /></span>
                                <span>321</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                <div className="col-lg-3 col-sm-12 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.0,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Not Active Users">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers size={20} /></span>
                                <span>321</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                <div className="col-lg-12 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <DataTable header="List of Employee" paginator paginatorLeft rows={10}>

                        </DataTable>

                    </motion.div>
                </div>
                <div className="col-lg-12 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Panel header="Weather Forecast">

                        </Panel>

                    </motion.div>
                </div>

                <div className="mb-3 col-lg-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <BarChartData />
                    </motion.div>
                </div>
                <div className="mb-3 col-lg-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <BarChartData />
                    </motion.div>
                </div>
                <div className="col-lg-4 mb-3">
                    <Panel header="File Reports">

                    </Panel>
                </div>
                <div className="col-lg-8 mb-3">
                    <Panel header="Activity">

                    </Panel>
                </div>
            </div>
        </div>
    )
}

export default Dashboard