import React from 'react'
import img1 from '../assets/icon/monitor.svg'

function Banner() {
    return (
        <>
            <section id="hero" class="d-flex align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
                            data-aos="fade-up" data-aos-delay="200">
                            <h1>Creating Efficiency, Empowering Payrolls: DTR Payroll System</h1>
                            <span className='text-light mb-5'>Empower Your Bid, Elevate Your Win</span>
                            <div class="d-flex justify-content-center justify-content-lg-start">

                            </div>
                        </div>
                        <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
                            <img src={img1} class="img-fluid animated" alt width={"60%"} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner