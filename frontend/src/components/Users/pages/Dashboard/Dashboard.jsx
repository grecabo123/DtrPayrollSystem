import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Card } from 'primereact/card';
import { FaCheck, FaClock, FaTimes } from 'react-icons/fa';
import { FcVoicePresentation } from 'react-icons/fc';
import Announcement from '../Calendar/Announcement';
import { DataTable } from 'primereact/datatable';
import { Panel } from 'primereact/panel';
import { Column } from 'primereact/column';
import { Knob } from 'primereact/knob';
import Performance from '../Rate/Performance';
import AbsentPresent from '../Rate/AbsentPresent';



function Dashboard() {

    const [value, setValue] = useState(40)
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-lg-3 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Total Render Time">
                            <div className="d-flex justify-content-between">
                                <span><FaClock className='text-primary' /></span>
                                <span>42</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                <div className="col-lg-3 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Overall Present">
                            <div className="d-flex justify-content-between">
                                <span><FaCheck className='text-success' /></span>
                                <span>42</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                <div className="col-lg-3 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Overall Absent">
                            <div className="d-flex justify-content-between">
                                <span><FaTimes className='text-danger' /></span>
                                <span>42</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                <div className="col-lg-3 mb-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Meeting Pending">
                            <div className="d-flex justify-content-between">
                                <span><FcVoicePresentation size={25} className='text-primary' /></span>
                                <span>42</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                <div className="mt-3">
                    <div className="row">
                        <div className="col-lg-12 mb-2">
                            <Panel header='Task Status'>
                                <DataTable paginator paginatorLeft rows={10}>
                                    <Column></Column>
                                </DataTable>
                            </Panel>
                        </div>
                        <div className="">
                            <Panel header="Performance Rate">
                                <div className="row">
                                    <div className="col-lg-4 mb-3">
                                        <Performance />
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <Performance />
                                    </div>
                                    <div className="col-lg-4 mb-3 text-center">
                                        <AbsentPresent />
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="col-lg-6 mb-2">
                            <Panel header='Feedback'>
                                <DataTable paginator paginatorLeft rows={10}>
                                    <Column></Column>
                                </DataTable>
                            </Panel>
                        </div>
                    </div>
                </div>



                <div className="mt-3">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >

                        <Announcement />
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard