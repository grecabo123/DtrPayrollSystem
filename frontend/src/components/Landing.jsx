import React from 'react'
import {Banner, Footer, Navigation} from '../utils/template'


function Landing() {
    return (
        <div className='d-flex flex-column min-vh-100'>
            <Navigation/>
            <Banner></Banner>
            <Footer></Footer>
        </div>
    )
}

export default Landing