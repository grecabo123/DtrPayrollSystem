import React from 'react'
import { motion } from "framer-motion";
import { Card } from 'primereact/card';
import { FaUsers } from 'react-icons/fa';

function Dashboard() {
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
                        <Card subTitle="All Users">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers /></span>
                                <span>32</span>
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
                            delay: 0.6,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Departments">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers /></span>
                                <span>32</span>
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
                            delay: 1.0,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Active">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers /></span>
                                <span>32</span>
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
                            delay: 1.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <Card subTitle="Deactivate">
                            <div className="d-flex justify-content-between">
                                <span><FaUsers /></span>
                                <span>32</span>
                            </div>
                        </Card>
                    </motion.div>
                </div>
                <div className="mt-2">
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard